import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { SITE_URL, serializeJsonLd } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "USA Sevens Stats | USA Rugby Men's & Women's Sevens Hub",
    template: "%s | USA Sevens Stats",
  },
  description:
    "The independent statistical record and biographical database for USA Rugby Men's and Women's National Sevens players, Olympic squads, and collegiate pipelines.",
  keywords: [
    "USA Rugby Sevens",
    "USA Sevens Stats",
    "Men's Eagles Sevens",
    "Women's Eagles Sevens",
    "Perry Baker",
    "Alev Kelter",
    "Rugby Sevens Olympians",
    "World Rugby SVNS",
  ],
  authors: [{ name: "USA Sevens Stats Editorial" }],
  creator: "USA Sevens Stats",
  publisher: "USA Sevens Stats",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "USA Sevens Stats",
    title: "USA Sevens Stats | National Sevens Players Hub",
    description:
      "Profiles, caps, Olympic rosters, and collegiate pathways for USA men's and women's rugby sevens stars.",
  },
  twitter: {
    card: "summary_large_image",
    title: "USA Sevens Stats | USA Rugby Sevens Database",
    description:
      "Profiles, caps, Olympic rosters, and collegiate pathways for USA men's and women's rugby sevens stars.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "USA Sevens Stats",
                  url: SITE_URL,
                  logo: `${SITE_URL}/icon`,
                },
                {
                  "@type": "WebSite",
                  name: "USA Sevens Stats",
                  url: SITE_URL,
                  publisher: { "@type": "Organization", name: "USA Sevens Stats" },
                },
              ],
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
