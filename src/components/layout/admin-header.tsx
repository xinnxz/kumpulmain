"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, LogOut, Users, Building2, Calendar, CreditCard, BarChart3, Settings, LayoutDashboard, Clock, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAdminTheme, adminThemeStyles, AdminThemeProvider } from "@/contexts/admin-theme";

function AdminHeaderContent() {
    const router = useRouter();
    const pathname = usePathname();
    const { isDark, toggleTheme } = useAdminTheme();
    const [currentTime, setCurrentTime] = useState(new Date());

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
        { icon: Users, label: "Pengguna", href: "/admin/users" },
        { icon: Building2, label: "Venue", href: "/admin/venues" },
        { icon: Calendar, label: "Booking", href: "/admin/bookings" },
        { icon: CreditCard, label: "Pembayaran", href: "/admin/payments" },
        { icon: BarChart3, label: "Analitik", href: "/admin/analytics" },
    ];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
    };

    return (
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? "bg-[#1A2744]/90 border-white/10" : "bg-white/90 border-[#E4E8ED] shadow-sm"}`}>
            <div className="max-w-[1600px] mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center shadow-lg shadow-[#344D7A]/30">
                            <Image src="/logo.png" alt="KumpulMain" width={32} height={32} className="object-contain" />
                        </motion.div>
                        <div>
                            <h1 className={`text-lg font-bold ${isDark ? "text-white" : "text-[#1A2744]"}`}>Pusat Kontrol</h1>
                            <p className={`text-xs ${isDark ? "text-white/50" : "text-[#5A6A7E]"}`}>KumpulMain.id Admin</p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? isDark
                                            ? "bg-[#F5B800]/10 text-[#F5B800] border border-[#F5B800]/30"
                                            : "bg-[#F5B800]/10 text-[#1A2744] border border-[#F5B800]/50"
                                        : isDark
                                            ? "text-white/60 hover:text-white hover:bg-white/5"
                                            : "text-[#5A6A7E] hover:text-[#1A2744] hover:bg-[#F7F8FA]"}`}>
                                    <item.icon className="w-4 h-4" />{item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-white/5 border border-white/10" : "bg-[#F7F8FA] border border-[#E4E8ED]"}`}>
                            <Clock className={`w-4 h-4 ${isDark ? "text-[#F5B800]" : "text-[#344D7A]"}`} />
                            <span className={`text-sm font-mono ${isDark ? "text-white" : "text-[#1A2744]"}`}>
                                {currentTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                            </span>
                        </div>

                        <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} title={isDark ? "Mode Terang" : "Mode Gelap"}
                            className={`p-2 rounded-xl transition-colors ${isDark ? "bg-white/5 border border-white/10 hover:bg-white/10 text-[#F5B800]" : "bg-[#F7F8FA] border border-[#E4E8ED] hover:bg-[#E4E8ED] text-[#344D7A]"}`}>
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>

                        <button className={`relative p-2 rounded-xl transition-colors ${isDark ? "bg-white/5 border border-white/10 hover:bg-white/10" : "bg-[#F7F8FA] border border-[#E4E8ED] hover:bg-[#E4E8ED]"}`}>
                            <Bell className={`w-5 h-5 ${isDark ? "text-white/70" : "text-[#5A6A7E]"}`} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5B800] text-[#1A2744] text-xs rounded-full flex items-center justify-center font-bold">5</span>
                        </button>

                        <div className={`w-px h-8 ${isDark ? "bg-white/10" : "bg-[#E4E8ED]"}`} />

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center ring-2 ring-[#F5B800]/30">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div className="hidden sm:block">
                                <p className={`text-sm font-medium ${isDark ? "text-white" : "text-[#1A2744]"}`}>Admin</p>
                                <p className={`text-xs ${isDark ? "text-white/50" : "text-[#5A6A7E]"}`}>Super Admin</p>
                            </div>
                        </div>

                        <button onClick={handleLogout} title="Keluar"
                            className={`p-2 rounded-xl transition-colors ${isDark ? "text-white/50 hover:text-red-400 hover:bg-red-500/10" : "text-[#8A95A5] hover:text-red-500 hover:bg-red-50"}`}>
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function AdminHeader() { return <AdminHeaderContent />; }

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { isDark } = useAdminTheme();
    return (
        <main className={`min-h-screen relative overflow-hidden ${isDark ? "bg-gradient-to-br from-[#0F1419] via-[#1A2744] to-[#1F2D47]" : "bg-gradient-to-br from-[#F7F8FA] via-white to-[#F0F4FF]"}`}>
            <div className={`fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDark ? "bg-[#344D7A]/30" : "bg-[#344D7A]/10"}`} />
            <div className={`fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none ${isDark ? "bg-[#F5B800]/10" : "bg-[#F5B800]/5"}`} />
            <AdminHeader />
            <div className="relative z-10">{children}</div>
        </main>
    );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminThemeProvider><AdminLayoutContent>{children}</AdminLayoutContent></AdminThemeProvider>;
}

export { useAdminTheme, adminThemeStyles } from "@/contexts/admin-theme";
