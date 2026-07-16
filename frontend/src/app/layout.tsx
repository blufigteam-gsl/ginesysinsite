import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-heading",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

import { client, urlFor } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(`
    *[_type == "siteSettings"][0]{
      title,
      description,
      favicon,
      ogImage
    }
  `);

  const title = siteSettings?.title || "Ginesys";
  const description = siteSettings?.description || "Ginesys Website";
  const faviconUrl = siteSettings?.favicon ? urlFor(siteSettings.favicon).url() : undefined;
  const ogImageUrl = siteSettings?.ogImage ? urlFor(siteSettings.ogImage).url() : undefined;

  return {
    title,
    description,
    icons: faviconUrl ? {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    } : undefined,
    openGraph: ogImageUrl ? {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ]
    } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}