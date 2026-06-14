"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Dynamic runtime layout cookie parser verification 
    const cookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "token";
    const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`));
    setIsLoggedIn(hasToken);
  }, []);

  const handleLogout = () => {
    const cookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || "token";
    // Force wipe cookie domain structure registry
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    window.location.href = "/login";
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        <nav className="border-b-2 border-black py-4 px-6 md:px-12 flex justify-between items-center bg-white z-40">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            DEVPREP.
          </Link>

          <div className="flex space-x-6 md:space-x-8 font-bold uppercase text-xs tracking-wider">
            <Link href="/" className="hover:underline">Home</Link>
            {isLoggedIn && <Link href="/dashboard" className="hover:underline text-blue-600">Dashboard</Link>}
          </div>

          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-black text-white px-5 py-2 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        <div className="flex-grow">{children}</div>

        <footer className="border-t-2 border-black py-6 text-center text-xs font-mono text-neutral-500 bg-neutral-50">
          &copy; {new Date().getFullYear()} DevPrep. All rights reserved. Built for Developers.
        </footer>
      </body>
    </html>
  );
}