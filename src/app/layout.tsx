import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@app/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
    "math",
    "symbols",
    "vietnamese",
  ],
});

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
  appleWebApp: {
    title: process.env.APP_NAME,
  },
  metadataBase: new URL(process.env.APP_URL!),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-[family-name:var(--font-roboto)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
