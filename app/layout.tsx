import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevPrep - Interview Preparation",
  description: "Curated interview questions and answers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        
        <nav className="border-b border-black py-4 px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter">DEVPREP.</Link>
          <div className="flex space-x-6 md:space-x-8 font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/categories" className="hover:underline">Category</Link>
          </div>
          <div>
            <Link href="/login" className="bg-black text-white px-5 py-2 text-sm font-medium hover:bg-neutral-800 transition">
              Login
            </Link>
          </div>
        </nav>

        <div className="flex-grow">
          {children}
        </div>

        <footer className="border-t border-black py-6 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} DevPrep. All rights reserved. Built for Developers.
        </footer>

      </body>
    </html>
  );
}