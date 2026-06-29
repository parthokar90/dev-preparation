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
        <nav className="border-b border-slate-900 py-4 px-4 sm:px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50">
            {/* Clean Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
                <span className="text-xl font-black tracking-tight text-indigo-600">
                    DEV
                </span>
                <span className="text-xl font-medium tracking-tight text-slate-900">
                    PREP.
                </span>
            </Link>

            {/* Desktop Links - Minimalist Typography */}
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                {!checking && isLoggedIn && (
                    <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                        Dashboard
                    </Link>
                )}
            </div>

            {/* Action Buttons - Pure Outlined Minimalism */}
            <div className="flex items-center gap-3">
                <div className="hidden sm:block min-h-[38px] flex items-center">
                    {!checking && (
                        isLoggedIn ? (
                            <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
                                <Link href="/dashboard" className="hover:text-slate-900 transition-colors">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="border border-slate-900 text-slate-900 px-4 py-1.5 text-xs font-semibold rounded hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="border border-slate-900 text-slate-900 px-4 py-1.5 text-xs font-semibold rounded hover:bg-slate-50 transition-colors block text-center"
                            >
                                Login
                            </Link>
                        )
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden w-8 h-8 flex items-center justify-center text-slate-900 rounded hover:bg-slate-50 transition-colors"
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${menuOpen ? "fa-xmark text-lg" : "fa-bars text-base"}`}></i>
                </button>
            </div>
        </nav>
    );
}