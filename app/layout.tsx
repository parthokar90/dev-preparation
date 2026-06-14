"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import api from "@/services/api/client";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/me"); // HttpOnly cookie automatically যাবে withCredentials দিয়ে
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout"); // ← Laravel session/token destroy + cookie clear করবে
    } catch {
      // ignore error, force redirect anyway
    } finally {
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} bg-white text-black flex flex-col min-h-screen`}>
        <nav className="border-b-2 border-black py-4 px-6 md:px-12 flex justify-between items-center bg-white z-40">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            DEVPREP.
          </Link>

          <div className="flex space-x-6 md:space-x-8 font-bold uppercase text-xs tracking-wider">
            {isLoggedIn && <Link href="/dashboard" className="hover:underline text-blue-600">Dashboard</Link>}
          </div>

          <div className="flex items-center gap-4">
            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-4 mr-2 text-base">
              <Link href="https://www.linkedin.com/in/partho-kar/" target="_blank" aria-label="LinkedIn" className="hover:text-blue-600 transition">
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link href="https://github.com/parthokar90" target="_blank" aria-label="GitHub" className="hover:text-neutral-600 transition">
                <i className="fab fa-github"></i>
              </Link>
              <Link href="#" aria-label="Email" className="hover:text-red-600 transition">
                <i className="fas fa-envelope"></i> parthokar90@gmail.com
              </Link>
              <Link href="#" aria-label="Phone" className="hover:text-green-600 transition">
                <i className="fas fa-phone"></i> +8801765456090
              </Link>
            </div>

            {!checking && (
              isLoggedIn ? (
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
              )
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