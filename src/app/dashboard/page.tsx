"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Plus, Loader2, Search, Bell, Trophy, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingsApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/types";

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    OPEN: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    COMPLETED: "bg-gray-50 text-gray-600 border-gray-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels: Record<string, string> = {
    PENDING: "Menunggu Pembayaran",
    OPEN: "Menunggu Peserta",
    CONFIRMED: "Terkonfirmasi",
    COMPLETED: "Selesai",
    CANCELLED: "Dibatalkan",
};

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuthStore();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBookings();
        }
    }, [isAuthenticated]);

    const fetchBookings = async () => {
        try {
            const res = await bookingsApi.getMyBookings();
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl p-10 shadow-lg shadow-[#344D7A]/5 border border-[#E4E8ED]">
                    <div className="w-16 h-16 rounded-full bg-[#F5B800]/10 flex items-center justify-center mx-auto mb-6">
                        <Trophy className="h-8 w-8 text-[#F5B800]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#1A2744] mb-2">Silakan login terlebih dahulu</h2>
                    <p className="text-[#5A6A7E] mb-6">Login untuk mengakses dashboard dan booking</p>
                    <Link href="/login">
                        <Button variant="accent">Login Sekarang</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <div>
                            <p className="text-[#F5B800] font-semibold text-sm mb-1">👋 Selamat datang kembali</p>
                            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2744]">
                                Halo, {user?.name?.split(" ")[0]}!
                            </h1>
                        </div>
                        <Link href="/venues">
                            <Button variant="accent">
                                <Plus className="h-5 w-5 mr-2" />
                                Booking Baru
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid sm:grid-cols-3 gap-4 mb-8"
                    >
                        <Link href="/venues">
                            <Card hover className="p-6 group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#F5B800]/30">
                                        <Search className="h-7 w-7 text-[#344D7A]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A2744]">Cari Venue</h3>
                                        <p className="text-[#5A6A7E] text-sm">Booking lapangan</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/joinan">
                            <Card hover className="p-6 group">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#344D7A] to-[#4A6699] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-[#344D7A]/30">
                                        <Users className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A2744]">Main Bareng</h3>
                                        <p className="text-[#5A6A7E] text-sm">Join undangan</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/notifications">
                            <Card hover className="p-6 group relative">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
                                        <Bell className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A2744]">Notifikasi</h3>
                                        <p className="text-[#5A6A7E] text-sm">Lihat update</p>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 w-3 h-3 bg-[#F5B800] rounded-full animate-pulse" />
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                        <Card className="p-6 bg-gradient-to-br from-[#344D7A] to-[#4A6699] border-0">
                            <TrendingUp className="h-6 w-6 text-[#F5B800] mb-3" />
                            <p className="text-3xl font-bold text-white">{bookings.length}</p>
                            <p className="text-white/70 text-sm mt-1">Total Booking</p>
                        </Card>
                        <Card className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
                                <Calendar className="h-5 w-5 text-emerald-600" />
                            </div>
                            <p className="text-3xl font-bold text-[#1A2744]">
                                {bookings.filter(b => b.status === "CONFIRMED").length}
                            </p>
                            <p className="text-[#5A6A7E] text-sm mt-1">Terkonfirmasi</p>
                        </Card>
                        <Card className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center mb-3">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <p className="text-3xl font-bold text-[#1A2744]">
                                {bookings.filter(b => b.status === "PENDING" || b.status === "OPEN").length}
                            </p>
                            <p className="text-[#5A6A7E] text-sm mt-1">Aktif</p>
                        </Card>
                        <Card className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3">
                                <Trophy className="h-5 w-5 text-gray-600" />
                            </div>
                            <p className="text-3xl font-bold text-[#1A2744]">
                                {bookings.filter(b => b.status === "COMPLETED").length}
                            </p>
                            <p className="text-[#5A6A7E] text-sm mt-1">Selesai</p>
                        </Card>
                    </motion.div>

                    {/* Bookings List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#1A2744]">Booking Terbaru</h2>
                            <Button variant="ghost" size="sm">
                                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 text-[#F5B800] animate-spin" />
                            </div>
                        ) : bookings.length > 0 ? (
                            <div className="space-y-3">
                                {bookings.slice(0, 5).map((booking, index) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <Card className="p-5 hover:border-[#F5B800]/50 transition-colors">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5B800]/20 to-[#F5B800]/5 flex items-center justify-center flex-shrink-0">
                                                        <Calendar className="h-6 w-6 text-[#F5B800]" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-[#1A2744]">
                                                            {booking.venue?.name || "Venue"}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-3 text-[#5A6A7E] text-sm mt-1">
                                                            <span className="flex items-center">
                                                                <Calendar className="h-4 w-4 mr-1" />
                                                                {formatDate(booking.date)}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Clock className="h-4 w-4 mr-1" />
                                                                {booking.startTime} - {booking.endTime}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-4">
                                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${statusColors[booking.status]}`}>
                                                        {statusLabels[booking.status]}
                                                    </span>
                                                    <span className="font-bold text-[#344D7A]">
                                                        {formatCurrency(booking.pricePerSlot)}
                                                    </span>
                                                    <Link href={`/bookings/${booking.id}`}>
                                                        <Button size="sm" variant="outline">
                                                            Detail
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-[#F7F8FA] flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="h-10 w-10 text-[#8A95A5]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1A2744] mb-2">Belum ada booking</h3>
                                <p className="text-[#5A6A7E] mb-6">Mulai booking lapangan pertamamu!</p>
                                <Link href="/venues">
                                    <Button variant="accent">Cari Venue</Button>
                                </Link>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
