import Link from "next/link";
import type { ReactNode } from "react";
import { CASE_STUDY_HREF, STEP_UI, stepHref, stepOfTotal, STEPS, type Step } from "@/content/case-study";
import { TierChips, TierKey } from "./blocks";
import { StepKeys } from "./StepKeys";
import styles from "../page.module.css";

/* The frame every Case Study page shares (Dan, 2026-09-28: "Have a left nav
   bar with each one and then a arrow at the top that sticks at the stop to
   go between products"):
     the step bar   pinned under the site header: where the reader is, and
                    the previous and next step as real links. Fixed rather
                    than sticky, over a spacer of its own height, so it stays
                    in view to the very end of the footer, which on a phone
                    is taller than the screen;
     the step row   below 1024px, the step list as one scrollable row of
                    buttons under the bar, and under it a closed "What the
                    tiers mean" disclosure;
     the step list  at 1024px and wider, a sticky column on the left: the
                    overview and the four steps, each with its tier chips,
                    the current one marked aria-current="page", and under
                    them what Tier 1, 2 and 3 mean (Dan, 2026-09-28: "we
                    don't explain T1-T3. I think a small explanation on the
                    nav bar will help").
   Every control is a link, so the guide works without JavaScript; StepKeys
   only adds the arrow keys. `current` is the step shown, or null on the
   overview. On a step, a second skip link (after the site's own) passes the
   bar and the step list and lands on the step's h1. */

/** A bar link: its address, its visible name, and the words a screen
    reader hears between "Previous"/"Next" and that name. */
type Target = { href: string; label: string; sr: string };

/** `exit`: the last step's Next, which leaves the guide for Contact. */
function targets(current: Step | null): { prev: Target | null; next: Target; exit: boolean } {
  const i = current ? STEPS.indexOf(current) : -1;
  const prevStep = i > 0 ? STEPS[i - 1] : null;
  const nextStep = STEPS[i + 1] ?? null;
  const prev: Target | null = current
    ? prevStep
      ? { href: stepHref(prevStep), label: prevStep.name, sr: `, step ${prevStep.number}: ` }
      : { href: CASE_STUDY_HREF, label: STEP_UI.overview, sr: ": " }
    : null;
  const next: Target = nextStep
    ? { href: stepHref(nextStep), label: nextStep.name, sr: `, step ${nextStep.number}: ` }
    : { href: "/contact", label: STEP_UI.contact, sr: ": " };
  return { prev, next, exit: nextStep === null };
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d={dir === "prev" ? "M16 10H4M9 4.5 3.5 10 9 15.5" : "M4 10h12M11 4.5l5.5 5.5-5.5 5.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  );
}

function StepBar({ current }: { current: Step | null }) {
  const { prev, next, exit } = targets(current);
  return (
    <nav className={`${styles.bar} ui`} aria-label={STEP_UI.bar}>
      <div className={styles.barInner}>
        {prev ? (
          <Link className={`${styles.barLink} ${styles.barPrev}`} href={prev.href} aria-keyshortcuts="ArrowLeft">
            <span className={styles.barArrow}>
              <Arrow dir="prev" />
            </span>
            <span className={styles.barText}>
              <span className={styles.barDir}>
                {STEP_UI.previous}
                <span className="sr-only">{prev.sr}</span>
              </span>
              <span className={styles.barTarget}>{prev.label}</span>
            </span>
          </Link>
        ) : (
          <span className={styles.barPrev} aria-hidden="true" />
        )}
        <p className={styles.barNow}>
          <span className={styles.barStep}>{current ? stepOfTotal(current) : STEP_UI.label}</span>
          <span className={styles.barSep}>{" · "}</span>
          <span className={styles.barName}>{current ? current.name : STEP_UI.overview}</span>
        </p>
        <Link
          className={`${styles.barLink} ${styles.barNext}${exit ? ` ${styles.barExit}` : ""}`}
          href={next.href}
          aria-keyshortcuts={exit ? undefined : "ArrowRight"}
        >
          <span className={styles.barText}>
            <span className={styles.barDir}>
              {STEP_UI.next}
              <span className="sr-only">{next.sr}</span>
            </span>
            <span className={styles.barTarget}>{next.label}</span>
          </span>
          <span className={styles.barArrow}>
            <Arrow dir="next" />
          </span>
        </Link>
      </div>
      <StepKeys />
    </nav>
  );
}

/** The overview and the four steps, as the left column (`list`) or the
    phone row (`row`). */
function Steps({ current, variant }: { current: Step | null; variant: "list" | "row" }) {
  const list = variant === "list";
  return (
    <nav
      className={`${list ? styles.side : styles.stepRow} ui`}
      aria-label={STEP_UI.steps}
      data-step-row={list ? undefined : ""}
    >
      <ol className={list ? styles.sideList : styles.stepRowList}>
        <li>
          <Link
            className={list ? styles.sideItem : styles.rowItem}
            href={CASE_STUDY_HREF}
            aria-current={current ? undefined : "page"}
          >
            <span className={`${styles.stepNum} ${styles.stepNumOverview}`} aria-hidden="true" />
            <span className={styles.sideBody}>
              <span className={styles.sideName}>{STEP_UI.overview}</span>
            </span>
          </Link>
        </li>
        {STEPS.map((s) => (
          <li key={s.id}>
            <Link
              className={list ? styles.sideItem : styles.rowItem}
              href={stepHref(s)}
              aria-current={current?.id === s.id ? "page" : undefined}
            >
              <span className={styles.stepNum} aria-hidden="true">
                {s.number}
              </span>
              <span className={styles.sideBody}>
                <span className={styles.sideName}>
                  <span className="sr-only">{`Step ${s.number}: `}</span>
                  {s.name}
                </span>
                {list ? (
                  <>
                    {" "}
                    <TierChips step={s} short />
                  </>
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {list ? <TierKey variant="list" /> : null}
    </nav>
  );
}

export function CaseStudyShell({
  current,
  lead,
  children,
}: {
  current: Step | null;
  /** Shown between the bar and the steps: the overview's header. */
  lead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.shell}>
      {current ? (
        <a className="skip-link" href="#step-title">
          {STEP_UI.skip}
        </a>
      ) : null}
      <div className={styles.barSpacer} aria-hidden="true" />
      <StepBar current={current} />
      {lead}
      <Steps current={current} variant="row" />
      <div className={styles.layout}>
        <div className={styles.sideCol}>
          <Steps current={current} variant="list" />
        </div>
        <div className={styles.main}>
          <div className={styles.tierPhone}>
            <TierKey variant="disclosure" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
