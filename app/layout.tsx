"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode, useEffect, useState, useCallback } from "react";
import api from "@/services/api/client";
import Navbar from "@/components/layout/Navbar";
import MobileMenu from "@/components/layout/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Use useCallback to prevent unnecessary re-renders
  const checkAuth = useCallback(async () => {
    try {
      setChecking(true);
      const response = await api.get("/me");
      // If response is successful, user is definitely logged in
      if (response.status === 200 || response.data) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setChecking(false);
    }
  }, []);

  // Listen for custom login events or initial mount
  useEffect(() => {
    checkAuth();

    // Listen for a custom login success event if triggered from login page
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} bg-neutral-50 text-slate-900 flex flex-col min-h-screen antialiased`}>
        
        {/* Pass the fully synced login states */}
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
          {/* Prevent children from rendering broken states while checking */}
          {children}
        </main>
      </body>
    </html>
  );
}