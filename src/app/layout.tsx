import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { cn, constructMetadata } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = Readonly<{
  children: ReactNode;
}>;

export const metadata = constructMetadata();

const RootLayout = ({ children }: Props) => (
  <html lang="en" className="h-full">
    <body
      className={cn("relative h-full font-sans antialiased", inter.className)}
    >
      <main className="relative flex flex-col m-h-screen">
        <Providers>
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Footer />
        </Providers>
      </main>
      <Toaster position="top-center" richColors />
    </body>
  </html>
);

export default RootLayout;
