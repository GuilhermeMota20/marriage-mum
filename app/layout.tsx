import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "./providers/modalProvider";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fernanda & Gilson",
  description: "Um dia mais que especial. Um momento de festejar e adimirar o amor de duas entidades prestes a se unirem por toda a eternidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[#49516F] bg-[#94A89C] lg:p-8 h-full w-full scroll-smooth`}
      >
        {children}

        <Toaster />
        <ModalProvider />
      </body>
    </html>
  );
}
