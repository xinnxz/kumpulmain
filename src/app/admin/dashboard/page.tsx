"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users, Building2, Calendar, CreditCard, TrendingUp, Zap,
    Activity, Sparkles, ArrowUpRight, Clock, Target, Flame,
    BarChart3, PieChart, Globe, Rocket, Settings
} from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, duration]);
    return count;
};

// Animated ring component
const AnimatedRing = ({ percentage, color, size = 120 }: { percentage: number; color: string; size?: number }) => {
    const { isDark } = useAdminTheme();
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="6" fill="none" className={isDark ? "text-white/10" : "text-slate-200"} />
            <motion.circle
                cx={size / 2} cy={size / 2} r={radius}
                stroke={color}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ strokeDasharray: circumference }}
            />
        </svg>
    );
};

// Live pulse dot
const PulseDot = () => (
    <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
    </span>
);

function DashboardContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];
    const [currentTime, setCurrentTime] = useState(new Date());

    const totalUsers = useAnimatedCounter(1234);
    const totalVenues = useAnimatedCounter(89);
    const totalBookings = useAnimatedCounter(456);
    const revenue = useAnimatedCounter(45600000);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const quickActions = [
        { icon: Users, label: "Users", href: "/admin/users", color: "from-blue-500 to-cyan-400" },
        { icon: Building2, label: "Venues", href: "/admin/venues", color: "from-purple-500 to-pink-400" },
        { icon: Calendar, label: "Bookings", href: "/admin/bookings", color: "from-emerald-500 to-teal-400" },
        { icon: CreditCard, label: "Payments", href: "/admin/payments", color: "from-amber-500 to-orange-400" },
        { icon: BarChart3, label: "Analytics", href: "/admin/analytics", color: "from-rose-500 to-red-400" },
        { icon: Settings, label: "Settings", href: "/admin/settings", color: "from-slate-500 to-slate-400" },
    ];

    const recentActivities = [
        { action: "New booking", user: "Ahmad P.", venue: "Futsal Arena", time: "2m ago", type: "booking" },
        { action: "Payment received", user: "Budi S.", venue: "Rp 150.000", time: "5m ago", type: "payment" },
        { action: "Venue approved", user: "Badminton Center", venue: "Bandung", time: "12m ago", type: "venue" },
        { action: "New user signup", user: "Diana S.", venue: "", time: "18m ago", type: "user" },
    ];

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-500 font-medium text-sm">
                        Good {currentTime.getHours() < 12 ? "Morning" : currentTime.getHours() < 18 ? "Afternoon" : "Evening"}
                    </span>
                </div>
                <h1 className={`text-4xl font-bold mb-1 ${styles.textPrimary}`}>Dashboard Overview</h1>
                <p className={styles.textMuted}>Platform performance at a glance</p>
            </motion.div>

            {/* Bento Grid */}
            <div className="grid grid-cols-12 gap-4 mb-8">
                {/* Revenue Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-12 lg:col-span-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-6 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Rocket className="w-6 h-6 text-white" />
                                <span className="text-white/80 font-medium">Total Revenue</span>
                            </div>
                            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                                <TrendingUp className="w-4 h-4" />
                                <span>+18%</span>
                            </div>
                        </div>

                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-5xl font-bold text-white">Rp</span>
                            <span className="text-6xl font-bold text-white">{(revenue / 1000000).toFixed(1)}</span>
                            <span className="text-3xl font-bold text-white/60 mb-1">Jt</span>
                        </div>

                        <p className="text-white/60 text-sm">This Month • <span className="text-emerald-300">↑ Rp 7.2 Jt dari bulan lalu</span></p>
                    </div>
                </motion.div>

                {/* Stats Rings */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`col-span-6 lg:col-span-3 ${styles.cardBg} border rounded-3xl p-6 flex flex-col items-center justify-center group ${styles.cardHover} transition-all`}
                >
                    <div className="relative mb-4">
                        <AnimatedRing percentage={78} color="#818cf8" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <Users className={`w-6 h-6 mb-1 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                            <span className={`text-2xl font-bold ${styles.textPrimary}`}>{totalUsers}</span>
                        </div>
                    </div>
                    <span className={styles.textMuted}>Active Users</span>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+12% growth</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`col-span-6 lg:col-span-3 ${styles.cardBg} border rounded-3xl p-6 flex flex-col items-center justify-center group ${styles.cardHover} transition-all`}
                >
                    <div className="relative mb-4">
                        <AnimatedRing percentage={65} color="#a855f7" />
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <Building2 className={`w-6 h-6 mb-1 ${isDark ? "text-purple-400" : "text-purple-600"}`} />
                            <span className={`text-2xl font-bold ${styles.textPrimary}`}>{totalVenues}</span>
                        </div>
                    </div>
                    <span className={styles.textMuted}>Active Venues</span>
                    <div className="flex items-center gap-1 mt-2 text-emerald-500 text-xs">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>+5 new</span>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`col-span-12 lg:col-span-8 ${styles.cardBg} border rounded-3xl p-6`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-lg font-bold ${styles.textPrimary} flex items-center gap-2`}>
                            <Zap className="w-5 h-5 text-amber-400" />
                            Quick Actions
                        </h3>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {quickActions.map((action) => (
                            <Link key={action.label} href={action.href}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all group cursor-pointer ${isDark
                                        ? "bg-white/5 border-white/10 hover:border-white/20"
                                        : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg"}`}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                                        <action.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className={`text-xs font-medium ${isDark ? "text-white/70 group-hover:text-white" : "text-slate-600 group-hover:text-slate-900"} transition-colors`}>
                                        {action.label}
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Live Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`col-span-12 lg:col-span-4 ${styles.cardBg} border rounded-3xl p-6`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-lg font-bold ${styles.textPrimary} flex items-center gap-2`}>
                            <Activity className="w-5 h-5 text-emerald-500" />
                            Live Activity
                        </h3>
                        <PulseDot />
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-50 hover:bg-slate-100"}`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.type === "booking" ? (isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600") :
                                        activity.type === "payment" ? (isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-600") :
                                            activity.type === "venue" ? (isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600") :
                                                (isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600")
                                    }`}>
                                    {activity.type === "booking" ? <Calendar className="w-4 h-4" /> :
                                        activity.type === "payment" ? <CreditCard className="w-4 h-4" /> :
                                            activity.type === "venue" ? <Building2 className="w-4 h-4" /> :
                                                <Users className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${styles.textPrimary}`}>{activity.action}</p>
                                    <p className={`text-xs truncate ${styles.textMuted}`}>{activity.user} {activity.venue && `• ${activity.venue}`}</p>
                                </div>
                                <span className={`text-xs whitespace-nowrap ${styles.textDimmed}`}>{activity.time}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`col-span-6 lg:col-span-4 bg-gradient-to-br ${isDark ? "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" : "from-emerald-100 to-teal-100 border-emerald-200"} backdrop-blur border rounded-3xl p-6`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className={styles.textMuted}>Today&apos;s Bookings</p>
                            <p className={`text-3xl font-bold ${styles.textPrimary}`}>{totalBookings}</p>
                        </div>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-white"}`}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                        />
                    </div>
                    <p className={`text-xs mt-2 ${styles.textDimmed}`}>75% of daily target</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className={`col-span-6 lg:col-span-4 bg-gradient-to-br ${isDark ? "from-amber-500/20 to-orange-500/20 border-amber-500/20" : "from-amber-100 to-orange-100 border-amber-200"} backdrop-blur border rounded-3xl p-6`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className={styles.textMuted}>Performance Score</p>
                            <p className={`text-3xl font-bold ${styles.textPrimary}`}>94<span className={`text-lg ${styles.textMuted}`}>/100</span></p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 8 }}
                                animate={{ height: i < 9 ? 24 + Math.random() * 16 : 8 }}
                                transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                                className={`flex-1 rounded-full ${i < 9 ? "bg-gradient-to-t from-amber-500 to-orange-400" : (isDark ? "bg-white/20" : "bg-slate-300")}`}
                            />
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className={`col-span-12 lg:col-span-4 bg-gradient-to-br ${isDark ? "from-blue-500/20 to-indigo-500/20 border-blue-500/20" : "from-blue-100 to-indigo-100 border-blue-200"} backdrop-blur border rounded-3xl p-6`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className={styles.textMuted}>Active Cities</p>
                            <p className={`text-3xl font-bold ${styles.textPrimary}`}>12</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Jakarta", "Bandung", "Surabaya", "Bogor", "Depok", "+7"].map((city) => (
                            <span key={city} className={`px-3 py-1 rounded-full text-xs ${isDark ? "bg-white/10 text-white/70" : "bg-white text-slate-600"}`}>
                                {city}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) router.push("/admin/login");
    }, [router]);

    return (
        <AdminLayout>
            <DashboardContent />
        </AdminLayout>
    );
}
