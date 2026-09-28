import "server-only";

import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import type { RouteBundle } from "@/content/routes/bundle-types";
import type { GateHash, RouteConfig, RouteSet } from "@/content/routes/types";
import { isToken, readStoreFile, storeFileExists } from "./store";

/* The small gate in front of every private route page (/routes/{token}).

   - The route's words, its files and its password hash all come from the
     private store (store.ts); this public repository holds none of them.
   - The password is checked with scrypt (N 2^15, r 8, p 1) against the hash in
     the route's route.json. The plaintext is never stored.
   - A correct password earns an HttpOnly, SameSite=Lax cookie scoped to
     /routes/{token}, valid for 12 hours: `${expiry}.${hmac}`, keyed by
     ROUTES_SESSION_SECRET and bound to the route's hash, so a new password
     signs everyone out. Without that secret a deployed site opens nothing
     (fails closed); a dev server makes a throwaway one per process.
   - Wrong passwords are limited per address and per route (the counters
     below), on top of scrypt's cost; only a few scrypt calls run at once.
   - The page, its data and the card PDFs all check the cookie before reading
     anything else. The one exception is the school's logo
     (/routes/{token}/mark), which the password form shows. */

export const SESSION_HOURS = 12;

export function cookieName(token: string) {
  return `route_${token.replace(/[^a-z0-9]/gi, "_")}`;
}

export function cookiePath(token: string) {
  return `/routes/${token}`;
}

// ── The route's configuration ────────────────────────────────────────────

const isText = (v: unknown): v is string => typeof v === "string" && v.length > 0;

function validGate(g: unknown): g is GateHash {
  const gate = g as GateHash | undefined;
  return (
    !!gate &&
    gate.kdf === "scrypt" &&
    Number.isInteger(gate.N) &&
    gate.N >= 16384 &&
    Number.isInteger(gate.r) &&
    Number.isInteger(gate.p) &&
    Number.isInteger(gate.keylen) &&
    gate.keylen >= 32 &&
    /^[0-9a-f]{32,}$/.test(gate.salt) &&
    /^[0-9a-f]{64,}$/.test(gate.hash)
  );
}

function validConfig(c: unknown, token: string): c is RouteConfig {
  const config = c as RouteConfig | undefined;
  return (
    !!config &&
    config.token === token &&
    ["school", "notice", "title", "meta", "intro", "purposeLine", "preparedBy", "issued", "credits", "cardsNote"].every(
      (key) => isText(config[key as keyof RouteConfig]),
    ) &&
    !!config.brand?.colors &&
    isText(config.brand.mark?.file) &&
    isText(config.files?.register) &&
    isText(config.files?.reference) &&
    Array.isArray(config.files?.trips) &&
    Array.isArray(config.cards) &&
    typeof config.sourceLabels === "object" &&
    validGate(config.gate)
  );
}

/** The route's route.json, or undefined for an unknown token. Server only:
    it carries the gate hash. */
export async function loadRouteConfig(token: string): Promise<RouteConfig | undefined> {
  if (!isToken(token)) return undefined;
  const raw = await readStoreFile(token, "route.json");
  if (!raw) return undefined;
  try {
    const config = JSON.parse(raw.toString("utf8")) as unknown;
    if (validConfig(config, token)) return config;
  } catch {
    // fall through
  }
  console.error("[routes] a route.json failed its checks; the route answers 404");
  return undefined;
}

/** The set without its gate hash: what the page may hand to the browser. */
export function publicSet(config: RouteConfig): RouteSet {
  const { gate: _gate, ...set } = config;
  void _gate;
  return set;
}

// ── The password ─────────────────────────────────────────────────────────

function scryptHex(password: string, gate: GateHash): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(
      password.normalize("NFC"),
      Buffer.from(gate.salt, "hex"),
      gate.keylen,
      { N: gate.N, r: gate.r, p: gate.p, maxmem: 256 * gate.N * gate.r },
      (error, key) => (error ? reject(error) : resolve(key)),
    );
  });
}

// scrypt takes about 32 MB a call at these settings; a handful at once is
// plenty for a password form, and more are turned away rather than queued.
let running = 0;
const MAX_RUNNING = 4;

/** true: the password matches; false: it does not; null: busy, try later. */
export async function passwordMatches(config: RouteConfig, attempt: string): Promise<boolean | null> {
  if (running >= MAX_RUNNING) return null;
  running += 1;
  try {
    const key = await scryptHex(attempt, config.gate);
    const stored = Buffer.from(config.gate.hash, "hex");
    return key.length === stored.length && timingSafeEqual(key, stored);
  } finally {
    running -= 1;
  }
}

// ── Wrong-password limits ────────────────────────────────────────────────

const WINDOW_MS = 15 * 60 * 1000;
export const LIMIT_MINUTES = WINDOW_MS / 60000;
const PER_ADDRESS = 8;
const PER_ROUTE = 60;
const misses = new Map<string, { count: number; resetAt: number }>();

function counter(key: string, now: number) {
  const entry = misses.get(key);
  if (!entry || entry.resetAt <= now) return { count: 0, resetAt: now + WINDOW_MS };
  return entry;
}

/** The visitor's address as the platform reports it (Vercel sets
    x-forwarded-for itself and overwrites what a client sends). */
export function clientAddress(headers: Headers) {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
}

/** Whether this address, or this route as a whole, has used up its wrong
    guesses for the window. Counted per instance: a limit, not a guarantee. */
export function tooManyMisses(token: string, address: string, now = Date.now()) {
  return (
    counter(`a:${token}:${address}`, now).count >= PER_ADDRESS || counter(`r:${token}`, now).count >= PER_ROUTE
  );
}

export function noteMiss(token: string, address: string, now = Date.now()) {
  for (const key of [`a:${token}:${address}`, `r:${token}`]) {
    const entry = counter(key, now);
    misses.set(key, { count: entry.count + 1, resetAt: entry.resetAt });
  }
  if (misses.size > 5000) {
    for (const [key, entry] of misses) if (entry.resetAt <= now) misses.delete(key);
  }
}

export function clearMisses(token: string, address: string) {
  misses.delete(`a:${token}:${address}`);
}

// ── The session cookie ───────────────────────────────────────────────────

const devSecret = globalThis as typeof globalThis & { __routesDevSecret?: string };

/** The cookie key, or null when a deployed site has none (then nothing opens). */
function sessionSecret(): string | null {
  const configured = process.env.ROUTES_SESSION_SECRET;
  if (configured && configured.length >= 32) return configured;
  if (process.env.NODE_ENV === "production") return null;
  if (!devSecret.__routesDevSecret) {
    devSecret.__routesDevSecret = randomBytes(32).toString("hex");
    console.warn("[routes] ROUTES_SESSION_SECRET is not set: using a throwaway key for this dev server");
  }
  return devSecret.__routesDevSecret;
}

/** Whether the gate can issue sessions at all. */
export function gateOpen() {
  return sessionSecret() !== null;
}

function signature(secret: string, config: RouteConfig, expires: number) {
  const bound = createHash("sha256").update(config.gate.hash).digest("hex");
  return createHmac("sha256", secret).update(`route-session:${config.token}:${expires}:${bound}`).digest("hex");
}

export function newSessionValue(config: RouteConfig, now = Date.now()) {
  const secret = sessionSecret();
  if (!secret) return null;
  const expires = now + SESSION_HOURS * 3600 * 1000;
  return `${expires}.${signature(secret, config, expires)}`;
}

export function hasAccess(config: RouteConfig, value: string | undefined, now = Date.now()) {
  const secret = sessionSecret();
  if (!secret || !value) return false;
  const [rawExpires, mac] = value.split(".");
  const expires = Number(rawExpires);
  if (!Number.isFinite(expires) || expires <= now || expires > now + SESSION_HOURS * 3600 * 1000 || !mac) {
    return false;
  }
  const expected = Buffer.from(signature(secret, config, expires), "hex");
  const given = Buffer.from(mac, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// ── The route's files ────────────────────────────────────────────────────

function listed(set: RouteSet, name: string) {
  return [
    set.files.register,
    set.files.reference,
    ...set.files.trips,
    ...set.cards.map((c) => c.file),
    set.brand.mark.file,
  ].includes(name);
}

/** A file the route set lists (the bundle, the cards, the mark), or null. */
export async function readPrivateFile(set: RouteSet, name: string) {
  return listed(set, name) ? readStoreFile(set.token, name) : null;
}

/** Whether a listed file is there (the card PDFs), without reading it. */
export async function privateFileExists(set: RouteSet, name: string) {
  return listed(set, name) ? storeFileExists(set.token, name) : false;
}

async function readJson<T>(set: RouteSet, name: string): Promise<T> {
  const buffer = await readPrivateFile(set, name);
  if (!buffer) throw new Error("A private route file is missing (run npm run sync:route-private)");
  return JSON.parse(buffer.toString("utf8")) as T;
}

export async function loadBundle(set: RouteSet): Promise<RouteBundle> {
  const registerBuffer = await readPrivateFile(set, set.files.register);
  if (!registerBuffer) throw new Error("A private route file is missing (run npm run sync:route-private)");
  const [reference, ...trips] = await Promise.all([
    readJson<RouteBundle["reference"]>(set, set.files.reference),
    ...set.files.trips.map((name) => readJson<RouteBundle["trips"][number]>(set, name)),
  ]);
  // Every geometry file names the register it was built with. A mismatch means
  // the copy is half refreshed; say so in the server log rather than fail.
  const registerSha = createHash("sha256").update(registerBuffer).digest("hex");
  for (const file of [reference, ...trips]) {
    if (file.register_sha256 !== registerSha) {
      console.error("[routes] a geometry file does not match its register; run npm run sync:route-private");
    }
  }
  const register = JSON.parse(registerBuffer.toString("utf8")) as RouteBundle["register"];
  return { register, reference, trips };
}
