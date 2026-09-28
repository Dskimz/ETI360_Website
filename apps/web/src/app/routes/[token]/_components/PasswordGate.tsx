import type { GateView } from "@/content/routes/types";
import { SchoolMark } from "./BrandFrame";
import { ViewField } from "./ViewField";
import s from "./routes.module.css";

export type GateStatus = "wrong" | "wait" | "closed";

/* The password form: the school's logo, the page's name, one field. It posts
   to /routes/{token}/unlock and is given only what it shows (GateView): never
   the password hash or the page's text. No analytics, no tracking of any kind. */
export function PasswordGate({
  gate,
  status,
  waitMinutes,
}: {
  gate: GateView;
  status: GateStatus | null;
  waitMinutes: number;
}) {
  const message =
    status === "wrong"
      ? "That password did not match. Check it and try again."
      : status === "wait"
        ? `Too many attempts. Try again in ${waitMinutes} minutes.`
        : status === "closed"
          ? "This page cannot be opened right now."
          : null;
  return (
    <div className={s.gate}>
      <header className={s.gateHead}>
        <SchoolMark token={gate.token} brand={gate.brand} />
        <p className={s.runningLabel}>Private page</p>
      </header>
      <div className={s.gateBody}>
        <h1 className={s.gateTitle}>{gate.title}</h1>
        <p className={s.gateLede}>This page is private. Enter the password that came with the link.</p>
        <form className={s.gateForm} method="post" action={`/routes/${gate.token}/unlock`}>
          <label className={s.gateLabel} htmlFor="route-password">
            Password
          </label>
          <input
            className={s.gateInput}
            id="route-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            aria-describedby={message ? "route-password-error" : undefined}
            aria-invalid={status === "wrong" || undefined}
          />
          <ViewField />
          {message ? (
            <p id="route-password-error" className={s.gateError} role="alert">
              {message}
            </p>
          ) : null}
          <button className={s.gateButton} type="submit">
            Open the page
          </button>
        </form>
      </div>
      <footer className={s.gateFoot}>
        <p>{gate.notice}</p>
        <p>{gate.preparedBy}</p>
      </footer>
    </div>
  );
}
