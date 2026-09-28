import type { Metadata } from "next";

const DESCRIPTION = "Start a conversation about your school's trips.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
