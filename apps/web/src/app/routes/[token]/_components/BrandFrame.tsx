import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { RouteSetBrand } from "@/content/routes/types";
import s from "./routes.module.css";

/* The school's page surface: its colors as CSS variables, its two faces loaded
   from Google Fonts the way the site loads its own, white paper edge to edge.
   Nothing of ETI360's identity is used here. */
export function BrandFrame({ brand, children }: { brand: RouteSetBrand; children: ReactNode }) {
  const vars = {
    "--school-primary": brand.colors.primary,
    "--school-accent": brand.colors.accent,
    "--school-text": brand.colors.text,
    "--school-muted": brand.colors.muted,
    "--school-line": brand.colors.line,
    "--school-paper": brand.colors.paper,
    "--school-display": brand.displayFont,
    "--school-body": brand.bodyFont,
  } as CSSProperties;
  return (
    <div className={s.root} style={vars}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={brand.fontsHref} precedence="default" />
      {children}
    </div>
  );
}

/** The school's logo, as its documents' covers carry it. */
export function SchoolMark({ token, brand, className }: { token: string; brand: RouteSetBrand; className?: string }) {
  const { mark } = brand;
  return (
    <Image
      className={className ?? s.mark}
      src={`/routes/${token}/mark`}
      width={mark.width}
      height={mark.height}
      alt={mark.alt}
      unoptimized
      priority
    />
  );
}
