import { Footer } from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
