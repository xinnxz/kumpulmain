"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Calendar, Search, Eye, CheckCircle, XCircle, Clock,
    Shield, Bell, LogOut, User, MapPin, CreditCard
} from "lucide-react";
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
    PENDING: { label: "Menunggu", color: "text-yellow-600", bgColor: "bg-yellow-100", icon: Clock },
    CONFIRMED: { label: "Terkonfirmasi", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle },
    COMPLETED: { label: "Selesai", color: "text-blue-600", bgColor: "bg-blue-100", icon: CheckCircle },
    CANCELLED: { label: "Dibatalkan", color: "text-red-600", bgColor: "bg-red-100", icon: XCircle },
};

export default function AdminBookingsPage() {
    const router = useRouter();
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = bookings.filter(b => {
        if (filter !== "all" && b.status !== filter) return false;
        if (searchQuery && !b.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !b.venue.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <main className="min-h-screen bg-[#0D1520]">
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-[#F5B800]" />
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </div>
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
                            <Calendar className="w-8 h-8 text-[#F5B800]" />
                            Kelola Booking
                        </h1>
                        <p className="text-white/50 mt-1">Lihat semua booking di platform</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input type="text" placeholder="Cari booking..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-[#F5B800] outline-none w-64" />
                        </div>
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-2 mb-6">
                    {["all", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
                        <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === status ? "bg-[#F5B800] text-[#1A2744]" : "bg-white/5 text-white/70 hover:bg-white/10"}`}>
                            {status === "all" ? "Semua" : statusConfig[status]?.label || status}
                        </button>
                    ))}
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-4">
                    {filteredBookings.map((booking) => {
                        const status = statusConfig[booking.status];
                        const StatusIcon = status.icon;
                        return (
                            <Card key={booking.id} className="p-4 bg-white/5 border-white/10">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-semibold text-white">{booking.venue}</p>
                                            {booking.isJoinan && <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">Joinan</span>}
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-white/50">
                                            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {booking.customer}</span>
                                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {booking.owner}</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {booking.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {booking.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="font-bold text-white">{formatCurrency(booking.amount)}</p>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" /> {status.label}
                                            </span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white"><Eye className="w-4 h-4" /></Button>
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
