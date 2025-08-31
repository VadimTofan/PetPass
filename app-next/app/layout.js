import "./globals.css";

import { Inter } from "next/font/google";

import Providers from "@/app/providers";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PetPass - Everything Your Pet Needs",
  description: "Pet expert advice, and caring services for your beloved companions.",
  icons: {
    icon: '/icons/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
