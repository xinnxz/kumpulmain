"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users, Building2, Calendar, CreditCard, TrendingUp,
    ChevronRight, Bell, Settings, LogOut, Shield, AlertTriangle,
    CheckCircle, Clock, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const statsCards = [
    { icon: Users, label: "Total Pengguna", value: "1,234", change: "+12%", color: "from-blue-500 to-blue-600" },
    { icon: Building2, label: "Total Venue", value: "89", change: "+5", color: "from-purple-500 to-purple-600" },
    { icon: Calendar, label: "Booking Bulan Ini", value: "456", change: "+23%", color: "from-green-500 to-green-600" },
    { icon: CreditCard, label: "Revenue Bulan Ini", value: "Rp 45.6 Jt", change: "+18%", color: "from-orange-500 to-orange-600" },
];

const recentActivities = [
    { type: "user", message: "User baru: Ahmad Pratama bergabung", time: "5 menit lalu", icon: Users },
    { type: "booking", message: "Booking baru di Futsal Arena Jakarta", time: "12 menit lalu", icon: Calendar },
    { type: "venue", message: "Venue baru menunggu approval: Badminton Center", time: "1 jam lalu", icon: Building2 },
    { type: "payment", message: "Pembayaran diterima: Rp 150.000", time: "2 jam lalu", icon: CreditCard },
];

const pendingItems = [
    { type: "Venue Approval", count: 3, icon: Building2, href: "/admin/venues?status=pending", color: "text-orange-500 bg-orange-50" },
    { type: "Disputes", count: 2, icon: AlertTriangle, href: "/admin/disputes", color: "text-red-500 bg-red-50" },
    { type: "Payouts", count: 5, icon: CreditCard, href: "/admin/payouts", color: "text-blue-500 bg-blue-50" },
];

const menuItems = [
    { icon: Users, label: "Pengguna", href: "/admin/users", count: 1234 },
    { icon: Building2, label: "Venue", href: "/admin/venues", count: 89 },
    { icon: Calendar, label: "Booking", href: "/admin/bookings", count: 456 },
    { icon: CreditCard, label: "Pembayaran", href: "/admin/payments" },
    { icon: BarChart3, label: "Analitik", href: "/admin/analytics" },
    { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
];

export default function AdminDashboardPage() {
    const router = useRouter();
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        const adminUser = localStorage.getItem("adminUser");

        if (!adminToken) {
            router.push("/admin/login");
            return;
        }

        if (adminUser) {
            setAdmin(JSON.parse(adminUser));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
    };

    return (
        <main className="min-h-screen bg-[#0D1520]">
            {/* Top Bar */}
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-[#F5B800]" />
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-white/70 hover:text-white">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#F5B800] flex items-center justify-center text-[#1A2744] font-bold">
                                    A
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-white font-medium">{admin?.name || "Admin"}</p>
                                    <p className="text-white/50 text-sm">Super Admin</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-white/70 hover:text-red-400 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-white/50 mt-1">Pantau performa platform KumpulMain.id</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {statsCards.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * i }}
                        >
                            <Card className="p-6 bg-white/5 border-white/10">
                                <div className="flex items-start justify-between">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-white mt-4">{stat.value}</p>
                                <p className="text-sm text-white/50">{stat.label}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Pending Items Alert */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <div className="grid sm:grid-cols-3 gap-4">
                        {pendingItems.map((item, i) => (
                            <Link key={item.type} href={item.href}>
                                <Card hover className={`p-4 bg-white/5 border-white/10 flex items-center gap-4`}>
                                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-semibold">{item.type}</p>
                                        <p className="text-white/50 text-sm">{item.count} menunggu</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-white/30" />
                                </Card>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Aktivitas Terbaru</h2>
                            <Card className="bg-white/5 border-white/10 divide-y divide-white/10">
                                {recentActivities.map((activity, i) => (
                                    <div key={i} className="p-4 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <activity.icon className="w-5 h-5 text-[#F5B800]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white">{activity.message}</p>
                                            <p className="text-white/50 text-sm">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </Card>
                        </motion.div>
                    </div>

                    {/* Quick Menu */}
                    <div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Menu Admin</h2>
                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link key={item.label} href={item.href}>
                                        <Card hover className="p-4 bg-white/5 border-white/10 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[#F5B800]/10 flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-[#F5B800]" />
                                            </div>
                                            <span className="font-medium text-white flex-1">{item.label}</span>
                                            {item.count && (
                                                <span className="px-2 py-0.5 rounded bg-white/10 text-white/70 text-sm">
                                                    {item.count}
                                                </span>
                                            )}
                                            <ChevronRight className="w-5 h-5 text-white/30" />
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
