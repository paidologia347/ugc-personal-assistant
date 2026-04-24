import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGC Personal Assistant",
  description:
    "Web assistant for UGC creators — plan, script, and publish content faster.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
