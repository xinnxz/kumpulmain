"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();

    const navLinks = [
        { href: "/venues", label: "Cari Venue" },
        { href: "/joinan", label: "Main Bareng" },
        { href: "/about", label: "Tentang" },
    ];

    const getDashboardLink = () => {
        if (!user) return "/dashboard";
        if (user.role === "ADMIN") return "/admin";
        if (user.role === "PENGELOLA") return "/pengelola";
        return "/dashboard";
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E8ED]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 py-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo.png"
                                alt="KumpulMain"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold">
                            <span className="text-[#344D7A]">Kumpul</span>
                            <span className="text-[#F5B800]">Main</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[#5A6A7E] hover:text-[#344D7A] transition-colors font-medium text-sm relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F5B800] transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                <Link href="/notifications" className="relative p-2 text-[#5A6A7E] hover:text-[#344D7A] transition-colors">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#F5B800] rounded-full" />
                                </Link>
                                <Link href={getDashboardLink()}>
                                    <button className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-[#F7F8FA] text-[#344D7A] text-sm font-medium transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center">
                                            <span className="text-[#344D7A] font-bold text-sm">
                                                {user?.name?.charAt(0)}
                                            </span>
                                        </div>
                                        <span>{user?.name?.split(" ")[0]}</span>
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Masuk</Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="accent">Daftar Gratis</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[#5A6A7E] rounded-lg hover:bg-[#F7F8FA]"
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
                        className="md:hidden bg-white border-t border-[#E4E8ED]"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-3 px-4 rounded-xl text-[#344D7A] hover:bg-[#F7F8FA] font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-[#E4E8ED] space-y-2">
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
                                            <Button className="w-full" variant="accent">Daftar Gratis</Button>
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
