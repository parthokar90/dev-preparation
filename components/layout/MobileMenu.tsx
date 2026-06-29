"use client";

import Link from "next/link";

interface MobileMenuProps {
    isLoggedIn: boolean;
    checking: boolean;
    setMenuOpen: (open: boolean) => void;
    handleLogout: () => void;
}

export default function MobileMenu({ isLoggedIn, checking, setMenuOpen, handleLogout }: MobileMenuProps) {
    return (
        <div className="md:hidden border-b border-slate-900 bg-white px-5 py-6 flex flex-col gap-4 font-medium text-sm text-slate-600 sticky top-[65px] z-40 shadow-sm animate-in fade-in duration-150">
            {/* Navigation Links */}
            <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 hover:text-slate-900 transition-colors">Home</Link>
            <Link href="/categories" onClick={() => setMenuOpen(false)} className="py-2 hover:text-slate-900 transition-colors">Categories</Link>
            {!checking && isLoggedIn && (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="py-2 text-indigo-600">Dashboard</Link>
            )}

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-2 text-base text-slate-400">
                <Link href="mailto:parthokar90@gmail.com" className="hover:text-slate-900 transition-colors"><i className="fas fa-envelope"></i></Link>
                <Link href="tel:+8801765456090" className="hover:text-slate-900 transition-colors"><i className="fas fa-phone"></i></Link>
                <Link href="https://www.linkedin.com/in/partho-kar/" target="_blank" className="hover:text-slate-900 transition-colors"><i className="fab fa-linkedin"></i></Link>
                <Link href="https://github.com/parthokar90" target="_blank" className="hover:text-slate-900 transition-colors"><i className="fab fa-github"></i></Link>
            </div>

            {/* Auth Action Footer */}
            <div className="pt-2">
                {!checking && (
                    isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="w-full border border-slate-900 text-slate-900 py-2 text-xs font-semibold rounded hover:bg-slate-50 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="w-full block text-center border border-slate-900 text-slate-900 py-2 text-xs font-semibold rounded hover:bg-slate-50 transition-colors"
                        >
                            Login
                        </Link>
                    )
                )}
            </div>
        </div>
    );
}