"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users, Building2, Calendar, CreditCard, TrendingUp,
    ChevronRight, AlertTriangle, BarChart3, Settings
} from "lucide-react";
import { AdminHeader } from "@/components/layout/admin-header";
import { Card } from "@/components/ui/card";

const statsCards = [
    { icon: Users, label: "Total Pengguna", value: "1,234", change: "+12%", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50" },
    { icon: Building2, label: "Total Venue", value: "89", change: "+5", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50" },
    { icon: Calendar, label: "Booking Bulan Ini", value: "456", change: "+23%", color: "from-emerald-500 to-emerald-600", bgColor: "bg-emerald-50" },
    { icon: CreditCard, label: "Revenue Bulan Ini", value: "Rp 45.6 Jt", change: "+18%", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50" },
];

const recentActivities = [
    { type: "user", message: "User baru: Ahmad Pratama bergabung", time: "5 menit lalu", icon: Users, color: "text-blue-600 bg-blue-100" },
    { type: "booking", message: "Booking baru di Futsal Arena Jakarta", time: "12 menit lalu", icon: Calendar, color: "text-emerald-600 bg-emerald-100" },
    { type: "venue", message: "Venue baru menunggu approval: Badminton Center", time: "1 jam lalu", icon: Building2, color: "text-purple-600 bg-purple-100" },
    { type: "payment", message: "Pembayaran diterima: Rp 150.000", time: "2 jam lalu", icon: CreditCard, color: "text-amber-600 bg-amber-100" },
];

const pendingItems = [
    { type: "Venue Approval", count: 3, icon: Building2, href: "/admin/venues?status=pending", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
    { type: "Disputes", count: 2, icon: AlertTriangle, href: "/admin/disputes", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
    { type: "Payouts", count: 5, icon: CreditCard, href: "/admin/payouts", color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
];

const quickMenu = [
    { icon: Users, label: "Pengguna", href: "/admin/users", count: 1234 },
    { icon: Building2, label: "Venue", href: "/admin/venues", count: 89 },
    { icon: Calendar, label: "Booking", href: "/admin/bookings", count: 456 },
    { icon: CreditCard, label: "Pembayaran", href: "/admin/payments" },
    { icon: BarChart3, label: "Analitik", href: "/admin/analytics" },
    { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
];

export default function AdminDashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <AdminHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Pantau performa platform KumpulMain.id</p>
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
                            <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 mt-4">{stat.value}</p>
                                <p className="text-sm text-slate-500">{stat.label}</p>
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
                        {pendingItems.map((item) => (
                            <Link key={item.type} href={item.href}>
                                <Card hover className={`p-4 bg-white border ${item.borderColor} flex items-center gap-4 shadow-sm`}>
                                    <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-900 font-semibold">{item.type}</p>
                                        <p className="text-slate-500 text-sm">{item.count} menunggu</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-400" />
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
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Aktivitas Terbaru</h2>
                            <Card className="bg-white border-slate-200 shadow-sm divide-y divide-slate-100">
                                {recentActivities.map((activity, i) => (
                                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                        <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center`}>
                                            <activity.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-slate-700">{activity.message}</p>
                                            <p className="text-slate-400 text-sm">{activity.time}</p>
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
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Menu Admin</h2>
                            <div className="space-y-2">
                                {quickMenu.map((item) => (
                                    <Link key={item.label} href={item.href}>
                                        <Card hover className="p-4 bg-white border-slate-200 shadow-sm flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <span className="font-medium text-slate-700 flex-1">{item.label}</span>
                                            {item.count && (
                                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-sm">
                                                    {item.count}
                                                </span>
                                            )}
                                            <ChevronRight className="w-5 h-5 text-slate-400" />
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
