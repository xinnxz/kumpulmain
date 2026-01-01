"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Plus, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingsApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/types";

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    OPEN: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    COMPLETED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
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

    const upcomingBookings = bookings.filter(b =>
        b.status === "CONFIRMED" && new Date(b.date) >= new Date()
    );

    const activeBookings = bookings.filter(b =>
        b.status === "PENDING" || b.status === "OPEN"
    );

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-4">Silakan login terlebih dahulu</h2>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Halo, {user?.name?.split(" ")[0]}! 👋
                        </motion.h1>
                        <p className="text-slate-400">Siap main hari ini?</p>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
                    >
                        <Link href="/venues">
                            <Card hover className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Cari Lapangan</h3>
                                    <p className="text-slate-400 text-sm">Booking lapangan baru</p>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/joinan">
                            <Card hover className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Main Bareng</h3>
                                    <p className="text-slate-400 text-sm">Join undangan orang lain</p>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/venues">
                            <Card hover className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                                    <Plus className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Buat Undangan</h3>
                                    <p className="text-slate-400 text-sm">Ajak teman main bareng</p>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
                    >
                        <Card variant="glass" className="text-center">
                            <p className="text-3xl font-bold text-white mb-1">{bookings.length}</p>
                            <p className="text-slate-400 text-sm">Total Booking</p>
                        </Card>
                        <Card variant="glass" className="text-center">
                            <p className="text-3xl font-bold text-emerald-400 mb-1">{upcomingBookings.length}</p>
                            <p className="text-slate-400 text-sm">Akan Datang</p>
                        </Card>
                        <Card variant="glass" className="text-center">
                            <p className="text-3xl font-bold text-blue-400 mb-1">{activeBookings.length}</p>
                            <p className="text-slate-400 text-sm">Aktif</p>
                        </Card>
                        <Card variant="glass" className="text-center">
                            <p className="text-3xl font-bold text-yellow-400 mb-1">
                                {bookings.filter(b => b.status === "COMPLETED").length}
                            </p>
                            <p className="text-slate-400 text-sm">Selesai</p>
                        </Card>
                    </motion.div>

                    {/* Bookings List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Booking Saya</h2>
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                            </div>
                        ) : bookings.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.slice(0, 5).map((booking) => (
                                    <Card key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center flex-shrink-0">
                                                <Calendar className="h-8 w-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">
                                                    {booking.venue?.name || "Venue"}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 text-slate-400 text-sm mt-1">
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
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                                                {statusLabels[booking.status]}
                                            </span>
                                            <span className="text-emerald-400 font-semibold">
                                                {formatCurrency(booking.pricePerSlot)}
                                            </span>
                                            <Link href={`/bookings/${booking.id}`}>
                                                <Button size="sm" variant="ghost">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="text-center py-12">
                                <Calendar className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Belum ada booking</h3>
                                <p className="text-slate-400 mb-6">Mulai booking lapangan pertamamu!</p>
                                <Link href="/venues">
                                    <Button>Cari Lapangan</Button>
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
