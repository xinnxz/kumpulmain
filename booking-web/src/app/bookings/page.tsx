"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar, Clock, MapPin, ChevronRight, Search, Filter,
    Loader2, ArrowLeft, CheckCircle, XCircle, Clock3
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingsApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Booking {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    totalPrice: number;
    isJoinable: boolean;
    venue: {
        id: string;
        name: string;
        venueType: string;
        city: string;
    };
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    PENDING: { label: "Menunggu Pembayaran", color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock3 },
    OPEN: { label: "Menunggu Peserta", color: "bg-blue-100 text-blue-700 border-blue-200", icon: Clock },
    CONFIRMED: { label: "Terkonfirmasi", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
    COMPLETED: { label: "Selesai", color: "bg-gray-100 text-gray-700 border-gray-200", icon: CheckCircle },
    CANCELLED: { label: "Dibatalkan", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
};

const tabs = [
    { key: "all", label: "Semua" },
    { key: "PENDING", label: "Menunggu" },
    { key: "CONFIRMED", label: "Aktif" },
    { key: "COMPLETED", label: "Selesai" },
];

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingsApi.getMyBookings();
            setBookings(response.data || []);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesTab = activeTab === "all" || booking.status === activeTab;
        const matchesSearch = booking.venue.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-[#F5B800] animate-spin" />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <Link
                            href="/profile"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Profil
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1A2744]">Riwayat Booking</h1>
                        <p className="text-[#8A95A5] mt-1">Kelola semua booking kamu di sini</p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row gap-4 mb-6"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                            <input
                                type="text"
                                placeholder="Cari venue..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 transition-colors"
                            />
                        </div>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-2 mb-6 overflow-x-auto pb-2"
                    >
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2.5 rounded-full font-medium transition-all whitespace-nowrap ${activeTab === tab.key
                                        ? "bg-[#1A2744] text-white"
                                        : "bg-white text-[#8A95A5] hover:bg-gray-100"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Booking List */}
                    {filteredBookings.length > 0 ? (
                        <div className="space-y-4">
                            {filteredBookings.map((booking, i) => {
                                const status = statusConfig[booking.status] || statusConfig.PENDING;
                                const StatusIcon = status.icon;

                                return (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <Link href={`/bookings/${booking.id}`}>
                                            <Card hover className="p-6">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                    {/* Icon */}
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center flex-shrink-0">
                                                        <Calendar className="w-8 h-8 text-[#F5B800]" />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div>
                                                                <h3 className="font-bold text-lg text-[#1A2744] line-clamp-1">
                                                                    {booking.venue.name}
                                                                </h3>
                                                                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-[#8A95A5]">
                                                                    <span className="flex items-center gap-1">
                                                                        <Calendar className="w-4 h-4" />
                                                                        {formatDate(booking.date)}
                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <Clock className="w-4 h-4" />
                                                                        {booking.startTime} - {booking.endTime}
                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <MapPin className="w-4 h-4" />
                                                                        {booking.venue.city}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <ChevronRight className="w-6 h-6 text-[#8A95A5] hidden sm:block" />
                                                        </div>

                                                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${status.color}`}>
                                                                <StatusIcon className="w-4 h-4" />
                                                                {status.label}
                                                            </div>
                                                            <p className="font-bold text-[#1A2744]">
                                                                {formatCurrency(booking.totalPrice)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <Card className="p-12 text-center">
                                <Calendar className="w-20 h-20 mx-auto text-[#8A95A5]/30 mb-4" />
                                <h3 className="text-xl font-bold text-[#1A2744] mb-2">
                                    {activeTab === "all" ? "Belum ada booking" : "Tidak ada booking"}
                                </h3>
                                <p className="text-[#8A95A5] mb-6">
                                    {activeTab === "all"
                                        ? "Yuk mulai booking lapangan pertamamu!"
                                        : `Tidak ada booking dengan status "${tabs.find(t => t.key === activeTab)?.label}"`
                                    }
                                </p>
                                <Link href="/venues">
                                    <Button size="lg">Cari Venue</Button>
                                </Link>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
