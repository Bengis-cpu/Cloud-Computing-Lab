import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLAIM READY — Warranty Claim Checklist",
  description:
    "A free checklist for anyone about to file a warranty claim. A warranty claim is decided on records. Keep yours, and ask for theirs in writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-surface text-on-surface antialiased selection:bg-primary-soft-2 selection:text-primary-ink font-sans">
        {children}
      </body>
    </html>
  );
}
