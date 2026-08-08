import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Pack",
  description:
    "Example work for an example school: the ETI360 document set for Harborview International School, every page shown in full.",
  alternates: { canonical: "/showcase" },
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
