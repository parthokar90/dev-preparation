"use client";

import { ReactNode, useEffect, useState, useCallback } from "react";
import api from "@/services/api/client";
import Navbar from "@/components/layout/Navbar";
import MobileMenu from "@/components/layout/MobileMenu";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    try {
      setChecking(true);
      const response = await api.get("/me");
      if (response.status === 200 || response.data) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch {
      setIsLoggedIn(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    const handleLoginSuccess = () => checkAuth();
    window.addEventListener("login-success", handleLoginSuccess);

    return () => {
      window.removeEventListener("login-success", handleLoginSuccess);
    };
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch {
      // Safe fallback
    } finally {
      setIsLoggedIn(false);
      setMenuOpen(false);
      window.location.href = "/login";
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Google Fonts (Inter) - Preloaded to prevent layout shift */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />

        {/* Font Awesome Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

        {/* Official Tailwind CSS CDN Loaded with standard script tag */}
        <script src="https://cdn.tailwindcss.com"></script>

        {/* CRITICAL FIX: Inline styles to hide unstyled content during CDN load and enforce font */}
        <style dangerouslySetInnerHTML={{
          __html: `
          html { 
            visibility: hidden; 
          }
          html.tailwind-loaded { 
            visibility: visible; 
          }
          body {
            font-family: 'Inter', sans-serif !important;
          }
        `}} />

        {/* Inline script to reveal page instantly as soon as Tailwind is parsed */}
        <script dangerouslySetInnerHTML={{
          __html: `
          if (typeof setInterval !== 'undefined') {
            var checkTailwind = setInterval(function() {
              if (window.tailwind) {
                document.documentElement.classList.add('tailwind-loaded');
                clearInterval(checkTailwind);
              }
            }, 10);
            // Fallback to show page anyway if CDN fails
            setTimeout(function() {
              document.documentElement.classList.add('tailwind-loaded');
            }, 1500);
          }
        `}} />
      </head>
      <body className="bg-slate-50/60 text-slate-700 flex flex-col min-h-screen antialiased">

        <Navbar
          isLoggedIn={isLoggedIn}
          checking={checking}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          handleLogout={handleLogout}
        />

        {menuOpen && (
          <MobileMenu
            isLoggedIn={isLoggedIn}
            checking={checking}
            setMenuOpen={setMenuOpen}
            handleLogout={handleLogout}
          />
        )}

        <main className="flex-grow w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}