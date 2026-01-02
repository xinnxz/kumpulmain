"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar, Search, Filter, ChevronRight, Clock, User,
    CheckCircle, XCircle, AlertCircle, Eye, MoreVertical
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const bookings = [
    {
        id: "1",
        customer: { name: "Ahmad Pratama", avatar: "A", phone: "0812xxxxxxxx" },
        venue: "Lapangan Futsal A",
        date: "2026-01-15",
        time: "19:00 - 20:00",
        status: "PENDING",
        amount: 150000,
        isJoinan: true,
        participants: 8,
        maxSlots: 10,
    },
    {
        id: "2",
        customer: { name: "Budi Santoso", avatar: "B", phone: "0813xxxxxxxx" },
        venue: "Lapangan Futsal B",
        date: "2026-01-15",
        time: "20:00 - 21:00",
        status: "CONFIRMED",
        amount: 150000,
        isJoinan: false,
        participants: 1,
        maxSlots: 1,
    },
    {
        id: "3",
        customer: { name: "Charlie Wijaya", avatar: "C", phone: "0814xxxxxxxx" },
        venue: "Lapangan Futsal A",
        date: "2026-01-16",
        time: "18:00 - 19:00",
        status: "CONFIRMED",
        amount: 175000,
        isJoinan: true,
        participants: 10,
        maxSlots: 10,
    },
    {
        id: "4",
        customer: { name: "David Hadiyanto", avatar: "D", phone: "0815xxxxxxxx" },
        venue: "Lapangan Badminton",
        date: "2026-01-14",
        time: "17:00 - 18:00",
        status: "COMPLETED",
        amount: 100000,
        isJoinan: false,
        participants: 1,
        maxSlots: 1,
    },
    {
        id: "5",
        customer: { name: "Eva Susanti", avatar: "E", phone: "0816xxxxxxxx" },
        venue: "Lapangan Futsal A",
        date: "2026-01-13",
        time: "19:00 - 20:00",
        status: "CANCELLED",
        amount: 150000,
        isJoinan: false,
        participants: 1,
        maxSlots: 1,
    },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    PENDING: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: AlertCircle },
    CONFIRMED: { label: "Terkonfirmasi", color: "bg-green-100 text-green-700", icon: CheckCircle },
    COMPLETED: { label: "Selesai", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
    CANCELLED: { label: "Dibatalkan", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function PengelolaBookingsPage() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBookings = bookings.filter(b => {
        if (filter !== "all" && b.status !== filter) return false;
        if (searchQuery && !b.customer.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

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
                            <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                                <Calendar className="w-8 h-8 text-[#F5B800]" />
                                Kelola Booking
                            </h1>
                            <p className="text-[#8A95A5] mt-1">Lihat dan kelola semua booking venue kamu</p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                <input
                                    type="text"
                                    placeholder="Cari pelanggan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B800] outline-none w-64"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-2 mb-6 overflow-x-auto pb-2"
                    >
                        {["all", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === status
                                        ? "bg-[#F5B800] text-[#1A2744]"
                                        : "bg-white text-[#8A95A5] hover:bg-gray-100"
                                    }`}
                            >
                                {status === "all" ? "Semua" : statusConfig[status]?.label || status}
                            </button>
                        ))}
                    </motion.div>

                    {/* Bookings List */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {filteredBookings.map((booking, i) => {
                            const status = statusConfig[booking.status];
                            const StatusIcon = status.icon;

                            return (
                                <Card key={booking.id} hover className="p-4">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        {/* Customer Info */}
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center text-[#1A2744] font-bold">
                                                {booking.customer.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-[#1A2744]">{booking.customer.name}</p>
                                                    {booking.isJoinan && (
                                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                                            Joinan
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-[#8A95A5]">{booking.venue}</p>
                                            </div>
                                        </div>

                                        {/* Date & Time */}
                                        <div className="flex items-center gap-6 text-sm">
                                            <div className="flex items-center gap-2 text-[#8A95A5]">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(booking.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#8A95A5]">
                                                <Clock className="w-4 h-4" />
                                                <span>{booking.time}</span>
                                            </div>
                                            {booking.isJoinan && (
                                                <div className="flex items-center gap-2 text-[#8A95A5]">
                                                    <User className="w-4 h-4" />
                                                    <span>{booking.participants}/{booking.maxSlots}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Amount */}
                                        <div className="text-right">
                                            <p className="font-bold text-[#1A2744]">{formatCurrency(booking.amount)}</p>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link href={`/pengelola/bookings/${booking.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}

                        {filteredBookings.length === 0 && (
                            <Card className="p-12 text-center">
                                <Calendar className="w-12 h-12 text-[#8A95A5] mx-auto mb-4" />
                                <p className="text-[#8A95A5]">Tidak ada booking ditemukan</p>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
