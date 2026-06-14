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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/me");
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
      await api.post("/logout");
    } catch {
      // ignore
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

        {/* ================================================================ */}
        {/* TOP CONTACT & SOCIAL INFO BAR — hidden on small screens          */}
        {/* ================================================================ */}
        <div className="hidden md:flex w-full bg-black text-white px-6 md:px-12 py-2 justify-between items-center text-xs font-mono font-bold tracking-tight">

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="mailto:parthokar90@gmail.com" className="flex items-center gap-1.5 hover:text-yellow-300 transition">
              <i className="fas fa-envelope"></i>
              <span>parthokar90@gmail.com</span>
            </Link>
            <span className="text-neutral-500">|</span>
            <Link href="tel:+8801765456090" className="flex items-center gap-1.5 hover:text-yellow-300 transition">
              <i className="fas fa-phone"></i>
              <span>+880 1765-456090</span>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="https://www.linkedin.com/in/partho-kar/"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-blue-400 transition"
            >
              <i className="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/parthokar90"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-gray-300 transition"
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </Link>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MAIN PRIMARY NAVIGATION BAR                                      */}
        {/* ================================================================ */}
        <nav className="border-b-2 border-black py-3 px-4 sm:px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="bg-black text-white px-2 py-1 text-lg sm:text-xl font-black tracking-tighter">DEV</span>
            <span className="text-lg sm:text-xl font-black tracking-tighter uppercase">PREP.</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 font-bold uppercase text-xs tracking-wider">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/categories" className="hover:text-blue-600 transition">Categories</Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="hover:underline text-neutral-900 border-2 border-black bg-yellow-300 px-2.5 py-1.5 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side: auth + mobile menu toggle */}
          <div className="flex items-center gap-3">

            <div className="hidden sm:block min-h-[34px] flex items-center">
              {!checking && (
                isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-red-600 transition duration-100"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="bg-black text-white px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black transition duration-100"
                  >
                    Login
                  </Link>
                )
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden border-2 border-black w-9 h-9 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </nav>

        {/* ================================================================ */}
        {/* MOBILE DROPDOWN MENU                                             */}
        {/* ================================================================ */}
        {menuOpen && (
          <div className="md:hidden border-b-2 border-black bg-white px-4 py-4 flex flex-col gap-3 font-bold uppercase text-xs tracking-wider sticky top-[57px] z-40">
            <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 border-b border-neutral-200">Home</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)} className="py-2 border-b border-neutral-200">Categories</Link>
            {isLoggedIn && (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="py-2 border-b border-neutral-200 text-blue-600">Dashboard</Link>
            )}

            <div className="flex items-center gap-4 pt-2 text-base">
              <Link href="mailto:parthokar90@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></Link>
              <Link href="tel:+8801765456090" aria-label="Phone"><i className="fas fa-phone"></i></Link>
              <Link href="https://www.linkedin.com/in/partho-kar/" target="_blank" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></Link>
              <Link href="https://github.com/parthokar90" target="_blank" aria-label="GitHub"><i className="fab fa-github"></i></Link>
            </div>

            <div className="pt-2">
              {!checking && (
                isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white px-5 py-2.5 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full block text-center bg-black text-white px-5 py-2.5 text-xs font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Login
                  </Link>
                )
              )}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* MAIN CONTENT                                                     */}
        {/* ================================================================ */}
        <main className="flex-grow w-full overflow-x-hidden">{children}</main>

        {/* ================================================================ */}
        {/* FOOTER                                                           */}
        {/* ================================================================ */}
        <footer className="border-t-2 border-black bg-neutral-50 px-4 sm:px-6 md:px-12 pt-10 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-black text-white px-2 py-1 text-lg font-black tracking-tighter">DEV</span>
                <span className="text-lg font-black tracking-tighter uppercase">PREP.</span>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Structured interview preparation for developers — Laravel, databases,
                system design, and beyond. Practice with real, categorized questions.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider mb-3">Quick links</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link href="/" className="hover:text-black transition">Home</Link></li>
                <li><Link href="/categories" className="hover:text-black transition">Categories</Link></li>
                <li><Link href="/login" className="hover:text-black transition">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-wider mb-3">Get in touch</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <i className="fas fa-envelope text-xs"></i>
                  <Link href="mailto:parthokar90@gmail.com" className="hover:text-black transition">parthokar90@gmail.com</Link>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-phone text-xs"></i>
                  <Link href="tel:+8801765456090" className="hover:text-black transition">+880 1765-456090</Link>
                </li>
                <li className="flex items-center gap-3 pt-1 text-base">
                  <Link href="https://www.linkedin.com/in/partho-kar/" target="_blank" className="hover:text-blue-600 transition" aria-label="LinkedIn">
                    <i className="fab fa-linkedin"></i>
                  </Link>
                  <Link href="https://github.com/parthokar90" target="_blank" className="hover:text-neutral-900 transition" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-4 text-center text-[11px] sm:text-xs font-mono text-neutral-500">
            &copy; {new Date().getFullYear()} DevPrep. All rights reserved. Built for Developers.
          </div>
        </footer>
      </body>
    </html>
  );
}