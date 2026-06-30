"use client";

import Link from "next/link";

interface NavbarProps {
    isLoggedIn: boolean;
    checking: boolean;
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
}

export default function Navbar({ isLoggedIn, checking, menuOpen, setMenuOpen, handleLogout }: NavbarProps) {
    return (
        <nav className="bg-white border-b border-slate-100 py-3.5 px-4 sm:px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-white/90">
            {/* Premium Tech Brand Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200">
                    <i className="fas fa-code text-white text-xs"></i>
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-800">
                    Dev<span className="text-indigo-600 font-medium">Prep</span>
                </span>
            </Link>

            {/* Center Links - Premium Soft Text */}
            <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-500">
                {!checking && isLoggedIn && (
                    <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
                )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
                <div className="hidden sm:block min-h-[36px] flex items-center">
                    {!checking && (
                        isLoggedIn ? (
                            <div className="flex items-center gap-6 text-[14px] font-medium text-slate-500">
                                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-4 py-1.5 text-xs font-semibold rounded-lg border border-slate-200/60 transition-all cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 text-xs font-semibold rounded-lg shadow-sm shadow-indigo-100 transition-all block text-center"
                            >
                                Sign In
                            </Link>
                        )
                    )}
                </div>

                {/* Minimal Hamburger */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-8 h-8 flex items-center justify-center text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${menuOpen ? "fa-xmark text-lg" : "fa-bars text-base"}`}></i>
                </button>
            </div>
        </nav>
    );
}