"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();

    const navLinks = [
        { href: "/venues", label: "Cari Lapangan" },
        { href: "/joinan", label: "Main Bareng" },
        { href: "/about", label: "Tentang Kami" },
    ];

    const getDashboardLink = () => {
        if (!user) return "/dashboard";
        if (user.role === "ADMIN") return "/admin";
        if (user.role === "PENGELOLA") return "/pengelola";
        return "/dashboard";
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">K</span>
                        </div>
                        <span className="text-xl font-bold text-white">
                            kumpul<span className="text-emerald-400">main</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-slate-300 hover:text-white transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link href="/notifications" className="relative p-2 text-slate-400 hover:text-white transition-colors">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                                </Link>
                                <Link href={getDashboardLink()}>
                                    <Button variant="secondary" size="sm">
                                        <User className="h-4 w-4 mr-2" />
                                        {user?.name?.split(" ")[0]}
                                    </Button>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Masuk</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Daftar Gratis</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-slate-400"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-slate-800"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2 text-slate-300 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-slate-800 space-y-3">
                                {isAuthenticated ? (
                                    <>
                                        <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full" variant="secondary">Dashboard</Button>
                                        </Link>
                                        <Button className="w-full" variant="outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                                            Keluar
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full" variant="outline">Masuk</Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full">Daftar Gratis</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
