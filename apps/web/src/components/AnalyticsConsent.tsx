"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";

// Google Analytics sets cookies, so it may not load until the visitor has said
// yes (Dan, 2026-09-09). Vercel Analytics is cookieless and stays outside this
// gate, which keeps the page-view baseline independent of anyone's choice.
//
// The notice is a thin beige strip after the footer, in the page flow, so it
// never covers any text (Dan, 2026-10-08). The notice never appears on /unsubscribe: someone who came to opt out should
// not be asked for anything. "Cookie settings" in the footer reopens it through
// the #cookie-settings hash, so a choice can be withdrawn as easily as given.

const STORAGE_KEY = "eti360-analytics-consent";
const REOPEN_HASH = "#cookie-settings";
const CHANGE_EVENT = "eti360-consent-change";

type Choice = "granted" | "denied" | "";

// The stored choice and the URL hash travel as one string so the snapshot stays
// a stable primitive, which is what useSyncExternalStore requires.
function snapshot() {
  let stored = "";
  try {
    stored = window.localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    stored = "";
  }
  const choice = stored === "granted" || stored === "denied" ? stored : "";
  return `${choice}|${window.location.hash}`;
}

function serverSnapshot() {
  return "|";
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("hashchange", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Withdrawing has to actually undo something. Google writes its cookies at the
// registrable domain, so every plausible scope is cleared, not just this host.
function clearMeasurementCookies() {
  const host = window.location.hostname;
  const registrable = host.split(".").slice(-2).join(".");
  const scopes = ["", `; domain=${host}`, `; domain=.${host}`, `; domain=${registrable}`, `; domain=.${registrable}`];
  for (const pair of document.cookie.split(";")) {
    const name = pair.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const scope of scopes) {
      document.cookie = `${name}=; Max-Age=0; path=/${scope}`;
    }
  }
}

// Google's own opt-out switch for one measurement ID. Setting it stops gtag
// sending anything or rewriting its cookies, which is what makes withdrawal
// take effect on the page the visitor is standing on, with no reload.
function setGoogleDisabled(gaId: string, disabled: boolean) {
  (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = disabled;
}

// Nothing at all renders until hydration, so the server HTML and the first
// client render agree and a returning visitor never sees the notice flash.
const subscribeNothing = () => () => {};
const hydratedOnClient = () => true;
const notHydratedOnServer = () => false;

export function AnalyticsConsent({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const hydrated = useSyncExternalStore(subscribeNothing, hydratedOnClient, notHydratedOnServer);
  const state = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const separator = state.indexOf("|");
  const choice = state.slice(0, separator) as Choice;
  const hash = state.slice(separator + 1);


  const decide = useCallback((next: Exclude<Choice, "">) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A browser that blocks storage still gets the choice for this page view.
    }
    if (window.location.hash === REOPEN_HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (next === "denied") {
      setGoogleDisabled(gaId, true);
      clearMeasurementCookies();
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [gaId]);

  // Keeps the page honest on every view: while the answer is no, Google's
  // opt-out switch stays on and any cookie left from an earlier visit goes.
  useEffect(() => {
    setGoogleDisabled(gaId, choice === "denied");
    if (choice === "denied") clearMeasurementCookies();
  }, [choice, gaId]);

  if (!hydrated) return null;

  const onOptOutPage = pathname === "/unsubscribe";
  const showNotice = (choice === "" && !onOptOutPage) || hash === REOPEN_HASH;

  return (
    <>
      {choice === "granted" ? <GoogleAnalytics gaId={gaId} /> : null}
      {showNotice ? (
        <div role="region" aria-label="Analytics cookies" style={shell}>
          <div style={inner}>
            <p style={copy}>
              <strong style={title}>Analytics cookies</strong> Google Analytics shows us which
              pages are read. Declining changes nothing on the site.{" "}
              <a href="/privacy" style={link}>
                Privacy notice
              </a>
            </p>
            <div style={buttons}>
              <button type="button" onClick={() => decide("granted")} style={control}>
                Accept
              </button>
              <button type="button" onClick={() => decide("denied")} style={control}>
                Decline
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const shell: React.CSSProperties = {
  background: "#f5edda",
  borderTop: "1px solid rgba(138, 108, 31, .35)",
};

const inner: React.CSSProperties = {
  maxWidth: "var(--container)",
  margin: "0 auto",
  padding: "8px clamp(16px, 4vw, 32px)",
  display: "flex",
  flexWrap: "wrap",
  gap: "6px 14px",
  alignItems: "center",
  justifyContent: "flex-end",
};

const copy: React.CSSProperties = {
  margin: 0,
  color: "var(--ink)",
  fontFamily: "var(--font-sans)",
  fontSize: "11.5px",
  lineHeight: 1.5,
};

const title: React.CSSProperties = { color: "var(--navy)", fontWeight: 600 };

const link: React.CSSProperties = {
  color: "var(--navy)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  whiteSpace: "nowrap",
};

const buttons: React.CSSProperties = { display: "flex", gap: "6px", flex: "0 0 auto" };

// Both controls carry the same size and weight on purpose: declining has to be
// as easy to find as accepting.
const control: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "11px",
  fontWeight: 600,
  padding: "3px 14px",
  border: "1px solid var(--navy)",
  borderRadius: "3px",
  background: "transparent",
  color: "var(--navy)",
  cursor: "pointer",
  lineHeight: 1.4,
};
