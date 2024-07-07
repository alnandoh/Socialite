import type { Metadata } from "next";
import Provider from "@/libs/utils/Provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { Work_Sans } from "next/font/google";
import "./globals.css";

const work_sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Socialite",
  description:
    "Event management platform build to satisfy the social lifestyles of the masses.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={work_sans.className}>
        <Provider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
