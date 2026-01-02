"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Building2, Calendar, CreditCard, ArrowUp, Flame } from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";

const topVenues = [
    { name: "Futsal Arena Jakarta", bookings: 234, revenue: 35100000 },
    { name: "Badminton Center Bandung", bookings: 189, revenue: 18900000 },
    { name: "Basketball Court Surabaya", bookings: 156, revenue: 21840000 },
    { name: "Tennis Club Depok", bookings: 134, revenue: 26800000 },
    { name: "Mini Soccer Bekasi", bookings: 98, revenue: 24500000 },
];

const growthData = [
    { month: "Jan", value: 35 }, { month: "Feb", value: 45 }, { month: "Mar", value: 52 },
    { month: "Apr", value: 63 }, { month: "May", value: 73 }, { month: "Jun", value: 89 },
];

function AnalyticsContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];

    const stats = [
        { label: "Total Revenue", value: "Rp 156.8 Jt", change: "+23%", icon: CreditCard, color: "from-emerald-500 to-teal-400" },
        { label: "Total Booking", value: "1,847", change: "+15%", icon: Calendar, color: "from-blue-500 to-cyan-400" },
        { label: "User Aktif", value: "892", change: "+8%", icon: Users, color: "from-purple-500 to-pink-400" },
        { label: "Venue Aktif", value: "67", change: "+3", icon: Building2, color: "from-amber-500 to-orange-400" },
    ];

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                <h1 className={`text-3xl font-bold ${styles.textPrimary} flex items-center gap-3`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    Analitik Platform
                </h1>
                <p className={`${styles.textMuted} mt-2`}>Insight dan statistik performa</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}
                        className={`p-5 ${styles.cardBg} border rounded-2xl ${styles.cardHover} transition-colors group`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles.success}`}>
                                <ArrowUp className="w-3 h-3" />{stat.change}
                            </span>
                        </div>
                        <p className={`text-2xl font-bold ${styles.textPrimary} mb-1`}>{stat.value}</p>
                        <p className={`text-sm ${styles.textMuted}`}>{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className={`p-6 ${styles.cardBg} border rounded-2xl`}>
                    <h3 className={`text-lg font-bold ${styles.textPrimary} flex items-center gap-2 mb-6`}>
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        Revenue Growth
                    </h3>
                    <div className="h-64 flex items-end gap-4">
                        {growthData.map((data, i) => (
                            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${data.value}%` }} transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-indigo-500 to-purple-400 rounded-t-lg" />
                                <span className={`text-xs ${styles.textMuted}`}>{data.month}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className={`p-6 ${styles.cardBg} border rounded-2xl`}>
                    <h3 className={`text-lg font-bold ${styles.textPrimary} flex items-center gap-2 mb-6`}>
                        <Flame className="w-5 h-5 text-amber-400" />
                        Top Venues
                    </h3>
                    <div className="space-y-4">
                        {topVenues.map((venue, i) => (
                            <motion.div key={venue.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                                className={`flex items-center gap-4 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-slate-50"}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${i === 0 ? "bg-amber-500" : i === 1 ? "bg-slate-400" : i === 2 ? "bg-amber-700" : "bg-slate-300"}`}>
                                    {i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className={`font-medium ${styles.textPrimary}`}>{venue.name}</p>
                                    <p className={`text-sm ${styles.textDimmed}`}>{venue.bookings} booking</p>
                                </div>
                                <p className={`font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}>Rp {(venue.revenue / 1000000).toFixed(1)} Jt</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function AdminAnalyticsPage() {
    return <AdminLayout><AnalyticsContent /></AdminLayout>;
}
