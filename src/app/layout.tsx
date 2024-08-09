import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedjat Reader",
  description: "A text reader with interactive background slideshow",
  icons: { shortcut: "wedjat-eye-icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
