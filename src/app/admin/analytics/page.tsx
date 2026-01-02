"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    BarChart3, TrendingUp, TrendingDown, Users, Building2, Calendar, CreditCard,
    Shield, Bell, LogOut, ArrowUpRight, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
    { month: "Jul", users: 1200, bookings: 450, revenue: 45000000 },
    { month: "Agu", users: 1500, bookings: 520, revenue: 52000000 },
    { month: "Sep", users: 1800, bookings: 480, revenue: 48000000 },
    { month: "Okt", users: 2200, bookings: 610, revenue: 61000000 },
    { month: "Nov", users: 2800, bookings: 550, revenue: 55000000 },
    { month: "Des", users: 3500, bookings: 720, revenue: 72000000 },
];

const summaryStats = [
    { label: "Total Users", value: "12,450", change: "+18%", trend: "up", icon: Users, color: "from-blue-500 to-blue-600" },
    { label: "Total Venues", value: "324", change: "+12%", trend: "up", icon: Building2, color: "from-purple-500 to-purple-600" },
    { label: "Total Bookings", value: "45,678", change: "+25%", trend: "up", icon: Calendar, color: "from-green-500 to-green-600" },
    { label: "Total Revenue", value: "Rp 2.8 M", change: "+32%", trend: "up", icon: CreditCard, color: "from-[#F5B800] to-[#FFD740]" },
];

const topVenues = [
    { name: "Futsal Arena Jakarta", bookings: 1250, revenue: 187500000, growth: "+15%" },
    { name: "Badminton Center Bandung", bookings: 980, revenue: 98000000, growth: "+12%" },
    { name: "Basketball Court Surabaya", bookings: 856, revenue: 149800000, growth: "+8%" },
    { name: "Tennis Club Depok", bookings: 654, revenue: 130800000, growth: "+5%" },
    { name: "Mini Soccer Bekasi", bookings: 542, revenue: 135500000, growth: "+22%" },
];

export default function AdminAnalyticsPage() {
    const router = useRouter();
    const [period, setPeriod] = useState("6m");

    const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

    return (
        <main className="min-h-screen bg-[#0D1520]">
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-[#F5B800]" /><span className="text-xl font-bold text-white">Admin Panel</span></div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-white/70 hover:text-white"><Bell className="w-6 h-6" /></button>
                            <button onClick={() => router.push("/admin/login")} className="p-2 text-white/70 hover:text-red-400"><LogOut className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <Link href="/admin/dashboard" className="text-white/50 hover:text-white text-sm mb-2 inline-block">← Kembali ke Dashboard</Link>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <BarChart3 className="w-8 h-8 text-[#F5B800]" />
                            Analytics & Insights
                        </h1>
                        <p className="text-white/50 mt-1">Pantau performa platform secara keseluruhan</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F5B800] outline-none">
                            <option value="1m">1 Bulan</option>
                            <option value="3m">3 Bulan</option>
                            <option value="6m">6 Bulan</option>
                            <option value="1y">1 Tahun</option>
                        </select>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10"><Download className="w-4 h-4 mr-2" /> Export</Button>
                    </div>
                </motion.div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {summaryStats.map((stat, i) => (
                        <motion.div key={stat.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}>
                            <Card className="p-5 bg-white/5 border-white/10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="flex items-center gap-1 text-xs font-semibold text-green-400">
                                        <TrendingUp className="w-3 h-3" /> {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-white/50">{stat.label}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Revenue Chart */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
                        <Card className="p-6 bg-white/5 border-white/10">
                            <h2 className="text-lg font-bold text-white mb-6">Revenue Bulanan</h2>
                            <div className="flex items-end gap-4 h-64">
                                {monthlyData.map((data) => (
                                    <div key={data.month} className="flex-1 flex flex-col items-center">
                                        <p className="text-xs text-white/50 mb-2">{(data.revenue / 1000000).toFixed(0)}M</p>
                                        <div className="w-full bg-gradient-to-t from-[#F5B800] to-[#FFD740] rounded-t-lg transition-all hover:opacity-80" style={{ height: `${(data.revenue / maxRevenue) * 180}px` }} />
                                        <p className="text-sm text-white/50 mt-2">{data.month}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Top Venues */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                        <Card className="p-6 bg-white/5 border-white/10">
                            <h2 className="text-lg font-bold text-white mb-4">Top Venues</h2>
                            <div className="space-y-4">
                                {topVenues.slice(0, 5).map((venue, i) => (
                                    <div key={venue.name} className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? "bg-[#F5B800] text-[#1A2744]" : i === 1 ? "bg-gray-400 text-gray-800" : i === 2 ? "bg-orange-400 text-orange-900" : "bg-white/10 text-white/70"}`}>
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-white truncate">{venue.name}</p>
                                            <p className="text-xs text-white/50">{venue.bookings} bookings</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-white">{formatCurrency(venue.revenue).replace("Rp ", "")}</p>
                                            <p className="text-xs text-green-400">{venue.growth}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Growth Metrics */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6">
                    <Card className="p-6 bg-white/5 border-white/10">
                        <h2 className="text-lg font-bold text-white mb-4">User & Booking Growth</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-white/50 text-sm mb-4">Users Bulanan</p>
                                <div className="flex items-end gap-2 h-32">
                                    {monthlyData.map((data) => (
                                        <div key={data.month} className="flex-1 flex flex-col items-center">
                                            <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(data.users / 3500) * 100}px` }} />
                                            <p className="text-xs text-white/30 mt-1">{data.month}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-white/50 text-sm mb-4">Bookings Bulanan</p>
                                <div className="flex items-end gap-2 h-32">
                                    {monthlyData.map((data) => (
                                        <div key={data.month} className="flex-1 flex flex-col items-center">
                                            <div className="w-full bg-green-500 rounded-t" style={{ height: `${(data.bookings / 720) * 100}px` }} />
                                            <p className="text-xs text-white/30 mt-1">{data.month}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}
