"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Search, Eye, CheckCircle, XCircle, Clock, User } from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";
import { formatCurrency } from "@/lib/utils";

const bookings = [
    { id: "1", customer: "Ahmad Pratama", venue: "Futsal Arena Jakarta", date: "2026-01-15", time: "19:00-20:00", amount: 150000, status: "CONFIRMED", isJoinan: true },
    { id: "2", customer: "Budi Santoso", venue: "Badminton Center Bandung", date: "2026-01-15", time: "18:00-19:00", amount: 100000, status: "PENDING", isJoinan: false },
    { id: "3", customer: "Charlie Wijaya", venue: "Basketball Court Surabaya", date: "2026-01-16", time: "20:00-21:00", amount: 175000, status: "CONFIRMED", isJoinan: true },
    { id: "4", customer: "David Hadiyanto", venue: "Tennis Club Depok", date: "2026-01-14", time: "17:00-18:00", amount: 200000, status: "COMPLETED", isJoinan: false },
    { id: "5", customer: "Eva Susanti", venue: "Mini Soccer Bekasi", date: "2026-01-13", time: "19:00-20:00", amount: 250000, status: "CANCELLED", isJoinan: false },
];

function BookingsContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const statusConfig = {
        PENDING: { label: "Menunggu", color: isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700", icon: Clock },
        CONFIRMED: { label: "Terkonfirmasi", color: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700", icon: CheckCircle },
        COMPLETED: { label: "Selesai", color: isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700", icon: CheckCircle },
        CANCELLED: { label: "Dibatalkan", color: isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700", icon: XCircle },
    };

    const filteredBookings = bookings.filter(b => {
        if (filter !== "all" && b.status !== filter) return false;
        if (searchQuery && !b.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !b.venue.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className={`text-3xl font-bold ${styles.textPrimary} flex items-center gap-3`}>
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                            <Calendar className="w-6 h-6 text-white" />
                        </div>
                        Kelola Booking
                    </h1>
                    <p className={`${styles.textMuted} mt-2`}>Lihat semua booking di platform</p>
                </div>
                <div className="mt-4 md:mt-0 relative">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${styles.textDimmed}`} />
                    <input type="text" placeholder="Cari booking..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className={`pl-12 pr-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none w-64`} />
                </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {["all", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
                    <button key={status} onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filter === status ? styles.buttonActive : styles.buttonInactive}`}>
                        {status === "all" ? "Semua" : statusConfig[status as keyof typeof statusConfig]?.label}
                    </button>
                ))}
            </motion.div>

            <div className="space-y-3">
                {filteredBookings.map((booking, i) => {
                    const status = statusConfig[booking.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    return (
                        <motion.div
                            key={booking.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            className={`p-4 ${styles.cardBg} border rounded-2xl ${styles.cardHover} transition-colors`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className={`font-semibold ${styles.textPrimary}`}>{booking.venue}</p>
                                        {booking.isJoinan && <span className={`px-2 py-0.5 text-xs rounded-full font-medium border ${isDark ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" : "bg-indigo-100 text-indigo-700 border-indigo-200"}`}>Joinan</span>}
                                    </div>
                                    <div className={`flex flex-wrap gap-4 text-sm ${styles.textMuted}`}>
                                        <span className="flex items-center gap-1"><User className="w-4 h-4" /> {booking.customer}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {booking.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {booking.time}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className={`font-bold ${styles.textPrimary}`}>{formatCurrency(booking.amount)}</p>
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                            <StatusIcon className="w-3 h-3" /> {status.label}
                                        </span>
                                    </div>
                                    <button className={`p-2 rounded-lg ${isDark ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}><Eye className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default function AdminBookingsPage() {
    return (
        <AdminLayout>
            <BookingsContent />
        </AdminLayout>
    );
}
