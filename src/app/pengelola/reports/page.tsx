"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    BarChart3, TrendingUp, TrendingDown, Calendar, Download,
    ArrowLeft, Users, CreditCard, Building2
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const monthlyStats = [
    { month: "Jul", revenue: 4500000, bookings: 30 },
    { month: "Agu", revenue: 5200000, bookings: 38 },
    { month: "Sep", revenue: 4800000, bookings: 32 },
    { month: "Okt", revenue: 6100000, bookings: 45 },
    { month: "Nov", revenue: 5500000, bookings: 40 },
    { month: "Des", revenue: 7200000, bookings: 52 },
];

const summaryCards = [
    { label: "Total Pendapatan", value: "Rp 33.3 Jt", change: "+18%", trend: "up", icon: CreditCard, color: "from-green-500 to-green-600" },
    { label: "Total Booking", value: "237", change: "+12%", trend: "up", icon: Calendar, color: "from-blue-500 to-blue-600" },
    { label: "Venue Aktif", value: "3", change: "0%", trend: "neutral", icon: Building2, color: "from-purple-500 to-purple-600" },
    { label: "Pelanggan Unik", value: "156", change: "+8%", trend: "up", icon: Users, color: "from-orange-500 to-orange-600" },
];

const topVenues = [
    { name: "Lapangan Futsal A", bookings: 89, revenue: 13350000 },
    { name: "Lapangan Futsal B", bookings: 76, revenue: 11400000 },
    { name: "Lapangan Badminton", bookings: 72, revenue: 7200000 },
];

export default function PengelolaReportsPage() {
    const [period, setPeriod] = useState("6m");

    const maxRevenue = Math.max(...monthlyStats.map(s => s.revenue));

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                    >
                        <div>
                            <Link
                                href="/pengelola/dashboard"
                                className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Kembali ke Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                                <BarChart3 className="w-8 h-8 text-[#F5B800]" />
                                Laporan & Statistik
                            </h1>
                            <p className="text-[#8A95A5] mt-1">Pantau performa venue dan pendapatan kamu</p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                                className="px-4 py-2 rounded-xl border border-gray-200 focus:border-[#F5B800] outline-none"
                            >
                                <option value="1m">1 Bulan</option>
                                <option value="3m">3 Bulan</option>
                                <option value="6m">6 Bulan</option>
                                <option value="1y">1 Tahun</option>
                            </select>
                            <Button variant="outline">
                                <Download className="w-5 h-5 mr-2" />
                                Export PDF
                            </Button>
                        </div>
                    </motion.div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {summaryCards.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <Card className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                            <stat.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : "text-gray-500"
                                            }`}>
                                            {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                                            {stat.trend === "down" && <TrendingDown className="w-3 h-3" />}
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p className="text-2xl font-bold text-[#1A2744]">{stat.value}</p>
                                    <p className="text-sm text-[#8A95A5]">{stat.label}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Revenue Chart */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2"
                        >
                            <Card className="p-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-6">Pendapatan Bulanan</h2>
                                <div className="flex items-end gap-4 h-64">
                                    {monthlyStats.map((stat, i) => (
                                        <div key={stat.month} className="flex-1 flex flex-col items-center">
                                            <div className="w-full flex flex-col items-center">
                                                <p className="text-sm font-semibold text-[#1A2744] mb-2">
                                                    {formatCurrency(stat.revenue).replace("Rp", "").trim()}
                                                </p>
                                                <div
                                                    className="w-full bg-gradient-to-t from-[#F5B800] to-[#FFD740] rounded-t-lg transition-all hover:opacity-80"
                                                    style={{ height: `${(stat.revenue / maxRevenue) * 180}px` }}
                                                />
                                            </div>
                                            <p className="text-sm text-[#8A95A5] mt-2">{stat.month}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Top Venues */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="p-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4">Venue Terpopuler</h2>
                                <div className="space-y-4">
                                    {topVenues.map((venue, i) => (
                                        <div key={venue.name} className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? "bg-[#F5B800] text-[#1A2744]" :
                                                    i === 1 ? "bg-gray-300 text-gray-700" :
                                                        "bg-orange-200 text-orange-700"
                                                }`}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-[#1A2744]">{venue.name}</p>
                                                <p className="text-sm text-[#8A95A5]">{venue.bookings} booking</p>
                                            </div>
                                            <p className="font-semibold text-[#1A2744]">{formatCurrency(venue.revenue)}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
