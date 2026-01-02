"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2, Plus, Calendar, TrendingUp, Users, CreditCard,
    ChevronRight, Clock, Bell, BarChart3, Settings, LogOut
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const statsCards = [
    { icon: Calendar, label: "Booking Bulan Ini", value: 24, change: "+12%", color: "from-blue-500 to-blue-600" },
    { icon: CreditCard, label: "Pendapatan Bulan Ini", value: "Rp 4.8 Jt", change: "+18%", color: "from-green-500 to-green-600" },
    { icon: Users, label: "Total Pelanggan", value: 156, change: "+8%", color: "from-purple-500 to-purple-600" },
    { icon: TrendingUp, label: "Occupancy Rate", value: "78%", change: "+5%", color: "from-orange-500 to-orange-600" },
];

const recentBookings = [
    { id: "1", venue: "Lapangan Futsal A", customer: "Ahmad", date: "15 Jan 2026", time: "19:00-20:00", status: "CONFIRMED", amount: 150000 },
    { id: "2", venue: "Lapangan Futsal B", customer: "Budi", date: "15 Jan 2026", time: "20:00-21:00", status: "PENDING", amount: 150000 },
    { id: "3", venue: "Lapangan Futsal A", customer: "Charlie", date: "16 Jan 2026", time: "18:00-19:00", status: "CONFIRMED", amount: 150000 },
];

const menuItems = [
    { icon: Building2, label: "Venue Saya", href: "/pengelola/venues", badge: 2 },
    { icon: Calendar, label: "Booking", href: "/pengelola/bookings", badge: 5 },
    { icon: BarChart3, label: "Laporan", href: "/pengelola/reports" },
    { icon: CreditCard, label: "Keuangan", href: "/pengelola/finance" },
    { icon: Settings, label: "Pengaturan", href: "/pengelola/settings" },
];

export default function PengelolaDashboardPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A2744]">
                                Selamat Datang, {user?.name || "Partner"}! 👋
                            </h1>
                            <p className="text-[#8A95A5] mt-1">
                                Kelola venue dan pantau performa bisnis kamu
                            </p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <Button variant="outline">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Link href="/pengelola/venues/create">
                                <Button>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Tambah Venue
                                </Button>
                            </Link>
                        </div>
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
                                <Card className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-[#1A2744] mt-4">{stat.value}</p>
                                    <p className="text-sm text-[#8A95A5]">{stat.label}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Bookings */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-[#1A2744]">Booking Terbaru</h2>
                                    <Link href="/pengelola/bookings" className="text-[#344D7A] hover:text-[#F5B800] font-medium flex items-center">
                                        Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>

                                <Card className="overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#8A95A5]">Venue</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#8A95A5]">Pelanggan</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#8A95A5]">Jadwal</th>
                                                    <th className="text-left py-4 px-6 text-sm font-semibold text-[#8A95A5]">Status</th>
                                                    <th className="text-right py-4 px-6 text-sm font-semibold text-[#8A95A5]">Nominal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentBookings.map((booking, i) => (
                                                    <tr key={booking.id} className="border-t hover:bg-gray-50">
                                                        <td className="py-4 px-6">
                                                            <p className="font-semibold text-[#1A2744]">{booking.venue}</p>
                                                        </td>
                                                        <td className="py-4 px-6 text-[#344D7A]">{booking.customer}</td>
                                                        <td className="py-4 px-6">
                                                            <p className="text-[#1A2744]">{booking.date}</p>
                                                            <p className="text-sm text-[#8A95A5]">{booking.time}</p>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "CONFIRMED"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-yellow-100 text-yellow-700"
                                                                }`}>
                                                                {booking.status === "CONFIRMED" ? "Terkonfirmasi" : "Menunggu"}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-6 text-right font-semibold text-[#1A2744]">
                                                            {formatCurrency(booking.amount)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Sidebar Menu */}
                        <div>
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h2 className="text-xl font-bold text-[#1A2744] mb-4">Menu Pengelola</h2>
                                <div className="space-y-2">
                                    {menuItems.map((item, i) => (
                                        <Link key={item.label} href={item.href}>
                                            <Card hover className="p-4 flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[#F5B800]/10 flex items-center justify-center">
                                                    <item.icon className="w-5 h-5 text-[#F5B800]" />
                                                </div>
                                                <span className="font-medium text-[#1A2744] flex-1">{item.label}</span>
                                                {item.badge && (
                                                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                <ChevronRight className="w-5 h-5 text-[#8A95A5]" />
                                            </Card>
                                        </Link>
                                    ))}
                                </div>

                                {/* Quick Stats */}
                                <Card className="mt-6 p-6 bg-gradient-to-br from-[#1A2744] to-[#344D7A]">
                                    <h3 className="text-white font-semibold mb-4">Statistik Hari Ini</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-white/70">Booking Masuk</span>
                                            <span className="text-white font-semibold">3</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/70">Pendapatan</span>
                                            <span className="text-[#F5B800] font-semibold">Rp 450.000</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/70">Jam Tersisa</span>
                                            <span className="text-white font-semibold">5 slot</span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
