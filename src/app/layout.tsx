import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { NavigationWrapper } from "@/components/layout/NavigationWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Asnari | Branding & Websites",
  description: "Building digital experiences from concept to deployment",
  icons: {
    icon: [
      { url: '/assets/website-logo.png', media: '(prefers-color-scheme: dark)' },
      { url: '/assets/logo.webp', media: '(prefers-color-scheme: light)' },
    ],
    shortcut: '/assets/website-logo.png',
    apple: '/assets/website-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/website-logo.png" type="image/png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/assets/logo.webp" type="image/webp" media="(prefers-color-scheme: light)" />
        <link rel="shortcut icon" href="/assets/website-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/website-logo.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${inter.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <NavigationProvider>
          <CustomCursor />
          <Header />
          <main>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
          </main>
        </NavigationProvider>
      </body>
    </html>
  );
}