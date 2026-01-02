"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Search, Eye, CheckCircle, XCircle, Clock, User, MapPin, CreditCard } from "lucide-react";
import { AdminHeader } from "@/components/layout/admin-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const bookings = [
    { id: "1", customer: "Ahmad Pratama", venue: "Futsal Arena Jakarta", owner: "John Doe", date: "2026-01-15", time: "19:00-20:00", amount: 150000, status: "CONFIRMED", isJoinan: true },
    { id: "2", customer: "Budi Santoso", venue: "Badminton Center Bandung", owner: "Jane Smith", date: "2026-01-15", time: "18:00-19:00", amount: 100000, status: "PENDING", isJoinan: false },
    { id: "3", customer: "Charlie Wijaya", venue: "Basketball Court Surabaya", owner: "Bob Wilson", date: "2026-01-16", time: "20:00-21:00", amount: 175000, status: "CONFIRMED", isJoinan: true },
    { id: "4", customer: "David Hadiyanto", venue: "Tennis Club Depok", owner: "Alice Brown", date: "2026-01-14", time: "17:00-18:00", amount: 200000, status: "COMPLETED", isJoinan: false },
    { id: "5", customer: "Eva Susanti", venue: "Mini Soccer Bekasi", owner: "Charlie Green", date: "2026-01-13", time: "19:00-20:00", amount: 250000, status: "CANCELLED", isJoinan: false },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
    PENDING: { label: "Menunggu", color: "text-amber-700", bgColor: "bg-amber-100", icon: Clock },
    CONFIRMED: { label: "Terkonfirmasi", color: "text-emerald-700", bgColor: "bg-emerald-100", icon: CheckCircle },
    COMPLETED: { label: "Selesai", color: "text-blue-700", bgColor: "bg-blue-100", icon: CheckCircle },
    CANCELLED: { label: "Dibatalkan", color: "text-red-700", bgColor: "bg-red-100", icon: XCircle },
};

export default function AdminBookingsPage() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = bookings.filter(b => {
        if (filter !== "all" && b.status !== filter) return false;
        if (searchQuery && !b.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !b.venue.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <AdminHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            Kelola Booking
                        </h1>
                        <p className="text-slate-500 mt-1">Lihat semua booking di platform</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input type="text" placeholder="Cari booking..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none w-64" />
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {["all", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
                        <button key={status} onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === status
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
                            {status === "all" ? "Semua" : statusConfig[status]?.label || status}
                        </button>
                    ))}
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
                    {filteredBookings.map((booking) => {
                        const status = statusConfig[booking.status];
                        const StatusIcon = status.icon;
                        return (
                            <Card key={booking.id} className="p-4 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-slate-900">{booking.venue}</p>
                                            {booking.isJoinan && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">Joinan</span>}
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {booking.customer}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {booking.owner}</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {booking.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {booking.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">{formatCurrency(booking.amount)}</p>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" /> {status.label}
                                            </span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"><Eye className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </motion.div>
            </div>
        </main>
    );
}
