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
    const { isDark, toggleTheme, t } = useAdminTheme();
    const [currentTime, setCurrentTime] = useState(new Date());

    const menuItems = [
        { icon: LayoutDashboard, label: t("menu.dashboard"), href: "/admin/dashboard" },
        { icon: Users, label: t("menu.users"), href: "/admin/users" },
        { icon: Building2, label: t("menu.venues"), href: "/admin/venues" },
        { icon: Calendar, label: t("menu.bookings"), href: "/admin/bookings" },
        { icon: CreditCard, label: t("menu.payments"), href: "/admin/payments" },
        { icon: BarChart3, label: t("menu.analytics"), href: "/admin/analytics" },
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
        <header className={`sticky top-0 z-50 backdrop-blur-xl border-b ${isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-slate-200/80 shadow-sm"}`}>
            <div className="max-w-[1600px] mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                            <Image src="/logo.png" alt="KumpulMain" width={32} height={32} className="object-contain" />
                        </motion.div>
                        <div>
                            <h1 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{t("header.title")}</h1>
                            <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>{t("header.subtitle")}</p>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? isDark ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-indigo-500/30" : "bg-gradient-to-r from-blue-50 to-purple-50 text-indigo-700 border border-indigo-200"
                                        : isDark ? "text-white/60 hover:text-white hover:bg-white/5" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
                                    <item.icon className="w-4 h-4" />{item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"}`}>
                            <Clock className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                            <span className={`text-sm font-mono ${isDark ? "text-white" : "text-slate-700"}`}>
                                {currentTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                            </span>
                        </div>

                        <motion.button whileTap={{ scale: 0.95 }} onClick={toggleTheme} title={isDark ? t("header.lightMode") : t("header.darkMode")}
                            className={`p-2 rounded-xl transition-colors ${isDark ? "bg-white/5 border border-white/10 hover:bg-white/10 text-amber-400" : "bg-slate-100 border border-slate-200 hover:bg-slate-200 text-indigo-600"}`}>
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </motion.button>

                        <button className={`relative p-2 rounded-xl transition-colors ${isDark ? "bg-white/5 border border-white/10 hover:bg-white/10" : "bg-slate-100 border border-slate-200 hover:bg-slate-200"}`}>
                            <Bell className={`w-5 h-5 ${isDark ? "text-white/70" : "text-slate-600"}`} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">5</span>
                        </button>

                        <div className={`w-px h-8 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center ring-2 ring-indigo-400/30">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div className="hidden sm:block">
                                <p className={`text-sm font-medium ${isDark ? "text-white" : "text-slate-900"}`}>Admin</p>
                                <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>Super Admin</p>
                            </div>
                        </div>

                        <button onClick={handleLogout} title={t("header.logout")}
                            className={`p-2 rounded-xl transition-colors ${isDark ? "text-white/50 hover:text-red-400 hover:bg-red-500/10" : "text-slate-400 hover:text-red-500 hover:bg-red-50"}`}>
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
        <main className={`min-h-screen relative overflow-hidden ${isDark ? "bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950" : "bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30"}`}>
            <div className={`fixed top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${isDark ? "bg-purple-500/20" : "bg-purple-400/15"}`} />
            <div className={`fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none ${isDark ? "bg-blue-500/20" : "bg-blue-400/10"}`} />
            <AdminHeader />
            <div className="relative z-10">{children}</div>
        </main>
    );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminThemeProvider><AdminLayoutContent>{children}</AdminLayoutContent></AdminThemeProvider>;
}

export { useAdminTheme, adminThemeStyles } from "@/contexts/admin-theme";
