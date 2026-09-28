/* Private route pages (/routes/{token}): one page per school's outdoor trip
   set, at an unguessable address, behind a password (Dan, 2026-09-25: "Private
   link. But maybe we need a password. Lets build it like this until we get
   sales."). Access rules for real schools come later.

   This repository is public, so nothing that belongs to one route page lives
   in it: not its address, not its password hash, not its data. Each page is a
   folder in the private store (src/lib/routes/store.ts), named by its token:

     route.json        the page's words, the school's brand, the files it
                       reads and the scrypt hash of its password (RouteConfig)
     *.json            the web bundle (register, geometry, reference line)
     <mark>.png        the school's logo, the one file served without the cookie
     cards/*.pdf       the pocket route cards

   `npm run sync:route-private` writes the folder from V3; the upload script in
   scripts/ mirrors it to the private bucket the deployed site reads. */

export type RouteSetBrand = {
  /** The school's own colors (its style guide), never ETI360's. */
  colors: {
    primary: string;
    accent: string;
    text: string;
    muted: string;
    line: string;
    paper: string;
  };
  /** Google Fonts stylesheet for the school's two faces, loaded the way the
      site loads its own fonts. */
  fontsHref: string;
  displayFont: string;
  bodyFont: string;
  /** The running wordmark (uppercase, display face) and the place beneath it. */
  wordmark: string;
  wordmarkSub: string;
  /** The school's logo in the route's private folder, served at
      /routes/{token}/mark (the password form shows it too). */
  mark: { file: string; width: number; height: number; alt: string };
};

/** scrypt(password, salt, keylen, { N, r, p }), hex. Never the plaintext.
    Made by `node scripts/route-password.mjs`. */
export type GateHash = {
  kdf: "scrypt";
  N: number;
  r: number;
  p: number;
  keylen: number;
  salt: string;
  hash: string;
};

export type CardEdition = {
  slug: "half-letter" | "a5";
  label: string;
  size: string;
  /** Path in the route's private folder. */
  file: string;
  /** Name the browser saves it under. */
  downloadName: string;
};

/** What the page may show and read. Everything here can reach the browser
    once the password has been given; the gate hash never does. */
export type RouteSet = {
  token: string;
  school: string;
  /** Verbatim fictional-school notice (or the school's own notice line). */
  notice: string;
  title: string;
  /** Metadata line under the title. */
  meta: string;
  intro: string;
  purposeLine: string;
  preparedBy: string;
  issued: string;
  /** Map and data credits in the footer. */
  credits: string;
  brand: RouteSetBrand;
  /** Files the page and its data route may serve, in the private folder
      (the register, the geometry files and the reference line). */
  files: {
    register: string;
    trips: string[];
    reference: string;
  };
  cards: CardEdition[];
  cardsNote: string;
  /** Customer-facing wording for each register source id. */
  sourceLabels: Record<string, string>;
};

/** route.json in the private folder: the set plus its password hash. */
export type RouteConfig = RouteSet & { gate: GateHash };

/** The password form's share of the set: nothing it does not show. */
export type GateView = Pick<RouteSet, "token" | "title" | "notice" | "preparedBy" | "brand">;
