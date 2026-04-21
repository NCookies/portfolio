import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { meta, summaryPlain } from "@/lib/portfolio";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();
const description =
  summaryPlain.slice(0, 155) + (summaryPlain.length > 155 ? "…" : "");
const pageTitle = meta.name?.trim()
  ? `${meta.name.trim()} · ${meta.title}`
  : meta.title;

const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: meta.name?.trim() ? pageTitle : meta.title,
    template: meta.name?.trim() ? `%s · ${meta.name.trim()}` : `%s · ${meta.title}`,
  },
  description,
  applicationName: meta.name?.trim() || meta.title,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: meta.name?.trim() || meta.title,
    title: pageTitle,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${noto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full" suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var k='portfolio-theme',t=localStorage.getItem(k),d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
