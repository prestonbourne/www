import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { cx } from "class-variance-authority";
import { Providers } from "@/components/providers";
import { Footer } from "@/components/footer";
import { Banner } from "@/components/banner";
import { VercelToolbar } from "@vercel/toolbar/next";
import { TableOfContents } from "@/components/posts/table-of-contents";
import { TWEAK_PANE_CONTAINER_ID } from "@/lib/sketches";

const bodyFont = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prestonbourne.dev"),
  title: {
    default: "Preston Bourne | Engineer",
    template: "%s | Preston Bourne",
  },
  description: "Chasing beautiful, performant software.",
  openGraph: {
    siteName: "Preston Bourne | Engineer",
    url: "https://prestonbourne.dev",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shouldInjectToolbar = process.env.NODE_ENV === "development";

  return (
    <html lang="en">
      <body
        className={cx(
          bodyFont.className,
          "selection:bg-foreground-muted/20 selection:text-foreground-highlight",
          "text-foreground overflow-x-hidden text-sm sm:text-base",
          "bg-background",
        )}
      >
        <Banner className="mb-4" />
        <Providers>
          <div className="app-grid mx-auto max-w-7xl px-4 md:px-0">
            <div>{/* site config */}</div>
            <div>
              {children} <Footer className="text-xs md:text-base" />{" "}
            </div>
            <div className="">
            </div>
          </div>
        </Providers>
        {shouldInjectToolbar && <VercelToolbar />}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
