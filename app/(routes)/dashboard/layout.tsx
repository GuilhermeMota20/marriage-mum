import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Fernanda & Gilson",
  description: "Um dia mais que especial. Um momento de festejar e adimirar o amor de duas entidades prestes a se unirem por toda a eternidade.",
};

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="w-full h-screen select-none scroll-smooth p-0 bg-white dark:bg-zinc-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
