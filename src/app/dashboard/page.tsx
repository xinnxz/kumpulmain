"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Plus, Loader2, Search, Bell } from "lucide-react";
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
    OPEN: "bg-green-50 text-green-700 border-green-200",
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
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Silakan login terlebih dahulu</h2>
                    <Link href="/login">
                        <Button>Login</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Halo, {user?.name?.split(" ")[0]}! 👋
                            </h1>
                            <p className="text-gray-500 mt-1">Siap untuk main hari ini?</p>
                        </div>
                        <Link href="/venues">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Booking Baru
                            </Button>
                        </Link>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                        <Link href="/venues">
                            <Card hover className="p-5 flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-[#A30D2D] flex items-center justify-center">
                                    <Search className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Cari Venue</h3>
                                    <p className="text-gray-500 text-sm">Booking lapangan</p>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/joinan">
                            <Card hover className="p-5 flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Main Bareng</h3>
                                    <p className="text-gray-500 text-sm">Join undangan</p>
                                </div>
                            </Card>
                        </Link>

                        <Link href="/notifications">
                            <Card hover className="p-5 flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                                    <Bell className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                                    <p className="text-gray-500 text-sm">Lihat update</p>
                                </div>
                            </Card>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Card className="p-5 text-center">
                            <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                            <p className="text-gray-500 text-sm mt-1">Total Booking</p>
                        </Card>
                        <Card className="p-5 text-center">
                            <p className="text-3xl font-bold text-green-600">
                                {bookings.filter(b => b.status === "CONFIRMED").length}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">Terkonfirmasi</p>
                        </Card>
                        <Card className="p-5 text-center">
                            <p className="text-3xl font-bold text-yellow-600">
                                {bookings.filter(b => b.status === "PENDING" || b.status === "OPEN").length}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">Aktif</p>
                        </Card>
                        <Card className="p-5 text-center">
                            <p className="text-3xl font-bold text-gray-600">
                                {bookings.filter(b => b.status === "COMPLETED").length}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">Selesai</p>
                        </Card>
                    </div>

                    {/* Bookings List */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Booking Saya</h2>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 text-[#A30D2D] animate-spin" />
                            </div>
                        ) : bookings.length > 0 ? (
                            <div className="space-y-3">
                                {bookings.slice(0, 5).map((booking) => (
                                    <Card key={booking.id} className="p-5">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="h-6 w-6 text-gray-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {booking.venue?.name || "Venue"}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm mt-1">
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
                                                <span className="font-semibold text-gray-900">
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
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada booking</h3>
                                <p className="text-gray-500 mb-6">Mulai booking lapangan pertamamu!</p>
                                <Link href="/venues">
                                    <Button>Cari Venue</Button>
                                </Link>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
