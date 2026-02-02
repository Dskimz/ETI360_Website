import type {Metadata} from 'next'
import './globals.css'
import {SiteHeader} from '@/components/SiteHeader'

export const metadata: Metadata = {
  title: 'ETI360',
  description: 'ETI360 marketing website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
