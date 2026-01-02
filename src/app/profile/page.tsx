"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    User, Mail, Phone, Calendar, MapPin, Edit3, Settings, LogOut,
    Trophy, Users, Heart, Clock, ChevronRight, Star, Shield, Bell
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authApi, bookingsApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: string;
    createdAt: string;
}

interface Booking {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    venue: {
        name: string;
        venueType: string;
    };
}

const statsCards = [
    { icon: Calendar, label: "Total Booking", value: 0, color: "from-blue-500 to-blue-600" },
    { icon: Users, label: "Main Bareng", value: 0, color: "from-green-500 to-green-600" },
    { icon: Heart, label: "Venue Favorit", value: 0, color: "from-red-500 to-red-600" },
    { icon: Trophy, label: "Poin Reward", value: 0, color: "from-yellow-500 to-yellow-600" },
];

export default function ProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(statsCards);

    useEffect(() => {
        fetchProfile();
        fetchBookings();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/login";
                return;
            }
            const response = await authApi.getProfile();
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
            window.location.href = "/login";
        } finally {
            setLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await bookingsApi.getMyBookings();
            const bookings = response.data || [];
            setRecentBookings(bookings.slice(0, 3));

            // Update stats
            setStats(prev => prev.map(stat => {
                if (stat.label === "Total Booking") {
                    return { ...stat, value: bookings.length };
                }
                if (stat.label === "Main Bareng") {
                    return { ...stat, value: bookings.filter((b: Booking) => b.status === "CONFIRMED").length };
                }
                return stat;
            }));
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F5B800] border-t-transparent" />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero Header */}
            <section className="relative bg-gradient-to-br from-[#1A2744] via-[#344D7A] to-[#1A2744] pt-24 pb-32 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4A000] p-1">
                                <div className="w-full h-full rounded-full bg-[#1A2744] flex items-center justify-center overflow-hidden">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl md:text-6xl font-bold text-[#F5B800]">
                                            {user?.name?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-[#1A2744] flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                        </motion.div>

                        {/* User Info */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-center md:text-left"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                {user?.name}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/70">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{user?.email}</span>
                                </div>
                                {user?.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{user.phone}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-semibold">
                                    {user?.role === "PENGELOLA" ? "🏟️ Pengelola" : user?.role === "ADMIN" ? "👑 Admin" : "⚽ Pemain"}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm">
                                    Member sejak {user?.createdAt ? formatDate(user.createdAt) : "-"}
                                </span>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="md:ml-auto flex gap-3"
                        >
                            <Link href="/profile/edit">
                                <Button className="bg-white text-[#1A2744] hover:bg-white/90">
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit Profil
                                </Button>
                            </Link>
                            <Link href="/settings">
                                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <section className="relative -mt-16 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <Card className="bg-white p-6 text-center hover:shadow-lg transition-shadow">
                                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-3xl font-bold text-[#1A2744]">{stat.value}</p>
                                    <p className="text-sm text-[#8A95A5]">{stat.label}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Bookings */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#1A2744]">Booking Terbaru</h2>
                                <Link href="/bookings" className="text-[#344D7A] hover:text-[#F5B800] font-medium flex items-center">
                                    Lihat Semua <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>

                            {recentBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {recentBookings.map((booking, i) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 * i }}
                                        >
                                            <Link href={`/bookings/${booking.id}`}>
                                                <Card hover className="p-4 flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center flex-shrink-0">
                                                        <Calendar className="w-7 h-7 text-[#F5B800]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-[#1A2744] truncate">{booking.venue.name}</h3>
                                                        <p className="text-sm text-[#8A95A5]">
                                                            {formatDate(booking.date)} • {booking.startTime} - {booking.endTime}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                                                            booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                                                booking.status === "COMPLETED" ? "bg-blue-100 text-blue-700" :
                                                                    "bg-gray-100 text-gray-700"
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                    <ChevronRight className="w-5 h-5 text-[#8A95A5]" />
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <Card className="p-12 text-center">
                                    <Calendar className="w-16 h-16 mx-auto text-[#8A95A5]/50 mb-4" />
                                    <h3 className="text-lg font-semibold text-[#1A2744] mb-2">Belum ada booking</h3>
                                    <p className="text-[#8A95A5] mb-6">Yuk mulai booking lapangan pertamamu!</p>
                                    <Link href="/venues">
                                        <Button>Cari Venue</Button>
                                    </Link>
                                </Card>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div>
                            <h2 className="text-xl font-bold text-[#1A2744] mb-6">Menu Cepat</h2>
                            <div className="space-y-3">
                                {[
                                    { icon: Calendar, label: "Riwayat Booking", href: "/bookings", color: "text-blue-500" },
                                    { icon: Heart, label: "Venue Favorit", href: "/favorites", color: "text-red-500" },
                                    { icon: Bell, label: "Notifikasi", href: "/notifications", color: "text-yellow-500" },
                                    { icon: Users, label: "Main Bareng", href: "/joinan", color: "text-green-500" },
                                    { icon: Settings, label: "Pengaturan", href: "/settings", color: "text-gray-500" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <Link href={item.href}>
                                            <Card hover className="p-4 flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center ${item.color}`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-[#1A2744]">{item.label}</span>
                                                <ChevronRight className="w-5 h-5 text-[#8A95A5] ml-auto" />
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <button onClick={handleLogout} className="w-full">
                                        <Card hover className="p-4 flex items-center gap-4 border-red-200 hover:border-red-300">
                                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                                <LogOut className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-red-500">Keluar</span>
                                        </Card>
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
