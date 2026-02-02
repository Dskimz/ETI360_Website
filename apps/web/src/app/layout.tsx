import type {Metadata} from 'next'
import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
