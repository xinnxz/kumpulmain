"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, ChevronDown, Bell, LogOut, Settings, Calendar, MapPin, Users, Trophy, Building2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, isAuthenticated, logout } = useAuthStore();

    // Core navigation links
    const navLinks = [
        { href: "/venues", label: "Cari Venue", icon: MapPin },
        { href: "/joinan", label: "Main Bareng", icon: Users },
        { href: "/competitions", label: "Kompetisi", icon: Trophy },
        { href: "/partner", label: "Partner Venue", icon: Building2 },
        { href: "/about", label: "Tentang", icon: HelpCircle },
    ];

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getDashboardLink = () => {
        if (!user) return "/dashboard";
        if (user.role === "ADMIN") return "/admin";
        if (user.role === "PENGELOLA") return "/pengelola";
        return "/dashboard";
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        window.location.href = "/";
    };

    const isActive = (href: string) => pathname === href;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/98 backdrop-blur-lg shadow-lg shadow-[#344D7A]/5 border-b border-[#E4E8ED]"
                : "bg-white/95 backdrop-blur-md border-b border-transparent"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 py-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
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
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm group ${isActive(link.href)
                                        ? "text-[#344D7A] bg-[#F5B800]/10"
                                        : "text-[#5A6A7E] hover:text-[#344D7A] hover:bg-[#F7F8FA]"
                                    }`}
                            >
                                <span className="flex items-center space-x-2">
                                    <link.icon className={`h-4 w-4 transition-colors ${isActive(link.href) ? "text-[#F5B800]" : "text-[#8A95A5] group-hover:text-[#F5B800]"
                                        }`} />
                                    <span>{link.label}</span>
                                </span>

                                {/* Active indicator - elegant underline */}
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-[13px] left-4 right-4 h-0.5 bg-gradient-to-r from-[#F5B800] to-[#FFD740] rounded-full"
                                    />
                                )}

                                {/* Hover indicator */}
                                <span className={`absolute -bottom-[13px] left-4 right-4 h-0.5 bg-[#F5B800]/0 rounded-full transition-all duration-300 ${!isActive(link.href) ? "group-hover:bg-[#F5B800]/30" : ""
                                    }`} />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                {/* Notifications */}
                                <Link
                                    href="/notifications"
                                    className="relative p-2.5 rounded-xl text-[#5A6A7E] hover:text-[#344D7A] hover:bg-[#F7F8FA] transition-all"
                                >
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F5B800] rounded-full ring-2 ring-white" />
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${userMenuOpen
                                                ? "bg-[#344D7A]/5 text-[#344D7A]"
                                                : "hover:bg-[#F7F8FA] text-[#5A6A7E] hover:text-[#344D7A]"
                                            }`}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center ring-2 ring-[#F5B800]/20">
                                            <span className="text-[#344D7A] font-bold text-sm">
                                                {user?.name?.charAt(0)}
                                            </span>
                                        </div>
                                        <span className="hidden xl:inline">{user?.name?.split(" ")[0]}</span>
                                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {userMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-[#344D7A]/10 border border-[#E4E8ED] py-2 z-50"
                                            >
                                                {/* User Info */}
                                                <div className="px-4 py-3 border-b border-[#E4E8ED]">
                                                    <p className="text-sm font-semibold text-[#1A2744]">{user?.name}</p>
                                                    <p className="text-xs text-[#5A6A7E]">{user?.email}</p>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-2">
                                                    <Link
                                                        href={getDashboardLink()}
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center space-x-3 px-4 py-2.5 text-[#5A6A7E] hover:bg-[#F7F8FA] hover:text-[#344D7A] transition-colors group"
                                                    >
                                                        <Calendar className="h-4 w-4 group-hover:text-[#F5B800] transition-colors" />
                                                        <span className="text-sm">Dashboard</span>
                                                    </Link>
                                                    <Link
                                                        href="/bookings"
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center space-x-3 px-4 py-2.5 text-[#5A6A7E] hover:bg-[#F7F8FA] hover:text-[#344D7A] transition-colors group"
                                                    >
                                                        <MapPin className="h-4 w-4 group-hover:text-[#F5B800] transition-colors" />
                                                        <span className="text-sm">Booking Saya</span>
                                                    </Link>
                                                    <Link
                                                        href="/settings"
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className="flex items-center space-x-3 px-4 py-2.5 text-[#5A6A7E] hover:bg-[#F7F8FA] hover:text-[#344D7A] transition-colors group"
                                                    >
                                                        <Settings className="h-4 w-4 group-hover:text-[#F5B800] transition-colors" />
                                                        <span className="text-sm">Pengaturan</span>
                                                    </Link>
                                                </div>

                                                {/* Logout */}
                                                <div className="border-t border-[#E4E8ED] pt-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center space-x-3 px-4 py-2.5 text-red-500 hover:bg-red-50 w-full transition-colors group"
                                                    >
                                                        <LogOut className="h-4 w-4" />
                                                        <span className="text-sm font-medium">Keluar</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-[#5A6A7E] hover:text-[#344D7A] hover:bg-[#F7F8FA]">
                                        Masuk
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="accent" className="shadow-lg shadow-[#F5B800]/20 hover:shadow-xl hover:shadow-[#F5B800]/30 transition-shadow">
                                        Daftar Gratis
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2.5 text-[#5A6A7E] rounded-xl hover:bg-[#F7F8FA] transition-colors"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Click outside to close user menu */}
            {userMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-[#E4E8ED] shadow-xl"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center space-x-3 py-3 px-4 rounded-xl font-medium transition-all ${isActive(link.href)
                                            ? "bg-[#F5B800]/10 text-[#344D7A]"
                                            : "text-[#5A6A7E] hover:bg-[#F7F8FA] hover:text-[#344D7A]"
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <link.icon className={`h-5 w-5 ${isActive(link.href) ? "text-[#F5B800]" : "text-[#8A95A5]"}`} />
                                    <span>{link.label}</span>
                                </Link>
                            ))}

                            <div className="pt-4 border-t border-[#E4E8ED] space-y-2">
                                {isAuthenticated ? (
                                    <>
                                        <Link href={getDashboardLink()} onClick={() => setMobileMenuOpen(false)}>
                                            <Button className="w-full justify-start" variant="secondary">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Button
                                            className="w-full justify-start text-red-500 hover:bg-red-50"
                                            variant="ghost"
                                            onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                                        >
                                            <LogOut className="h-4 w-4 mr-2" />
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
