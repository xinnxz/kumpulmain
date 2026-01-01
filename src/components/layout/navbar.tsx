"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();

    const navLinks = [
        { href: "/venues", label: "Cari Venue" },
        { href: "/joinan", label: "Main Bareng" },
    ];

    const getDashboardLink = () => {
        if (!user) return "/dashboard";
        if (user.role === "ADMIN") return "/admin";
        if (user.role === "PENGELOLA") return "/pengelola";
        return "/dashboard";
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-[#A30D2D] flex items-center justify-center">
                            <span className="text-lg font-bold text-white">K</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            Kumpul<span className="text-[#A30D2D]">Main</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-600 hover:text-[#A30D2D] transition-colors font-medium text-sm"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                <Link href={getDashboardLink()}>
                                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User className="h-4 w-4 text-gray-600" />
                                        </div>
                                        <span>{user?.name?.split(" ")[0]}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Masuk</Button>
                                </Link>
                                <Link href="/register">
                                    <Button>Daftar</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-600"
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
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-3 px-4 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-gray-100 space-y-2">
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
                                            <Button className="w-full">Daftar</Button>
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
