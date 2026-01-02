"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Bell, ArrowLeft, Calendar, CreditCard, Star,
    CheckCircle, AlertCircle, Users, Building2, Check
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const notifications = [
    {
        id: "1",
        type: "booking",
        title: "Booking Baru",
        message: "Ahmad Pratama melakukan booking untuk Lapangan Futsal A, 15 Jan 2026 pukul 19:00",
        time: "5 menit lalu",
        isRead: false,
        icon: Calendar,
        color: "bg-blue-100 text-blue-600",
    },
    {
        id: "2",
        type: "payment",
        title: "Pembayaran Diterima",
        message: "Pembayaran sebesar Rp 150.000 dari Budi Santoso telah diterima",
        time: "1 jam lalu",
        isRead: false,
        icon: CreditCard,
        color: "bg-green-100 text-green-600",
    },
    {
        id: "3",
        type: "review",
        title: "Review Baru",
        message: 'Charlie memberikan rating 5 bintang: "Lapangannya bagus dan bersih!"',
        time: "3 jam lalu",
        isRead: true,
        icon: Star,
        color: "bg-yellow-100 text-yellow-600",
    },
    {
        id: "4",
        type: "joinan",
        title: "Peserta Joinan Baru",
        message: "David bergabung ke joinan di Lapangan Futsal A (8/10 slot terisi)",
        time: "5 jam lalu",
        isRead: true,
        icon: Users,
        color: "bg-purple-100 text-purple-600",
    },
    {
        id: "5",
        type: "cancelled",
        title: "Booking Dibatalkan",
        message: "Eva membatalkan booking untuk Lapangan Badminton, 13 Jan 2026",
        time: "1 hari lalu",
        isRead: true,
        icon: AlertCircle,
        color: "bg-red-100 text-red-600",
    },
];

export default function PengelolaNotificationsPage() {
    const [notifs, setNotifs] = useState(notifications);
    const [filter, setFilter] = useState("all");

    const unreadCount = notifs.filter(n => !n.isRead).length;

    const markAsRead = (id: string) => {
        setNotifs(notifs.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifs(notifs.map(n => ({ ...n, isRead: true })));
    };

    const filteredNotifs = filter === "all" ? notifs : notifs.filter(n => !n.isRead);

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <Link
                            href="/pengelola/dashboard"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Dashboard
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                                    <Bell className="w-8 h-8 text-[#F5B800]" />
                                    Notifikasi
                                    {unreadCount > 0 && (
                                        <span className="px-2 py-0.5 bg-red-500 text-white text-sm rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </h1>
                                <p className="text-[#8A95A5] mt-1">Semua notifikasi venue kamu</p>
                            </div>
                            {unreadCount > 0 && (
                                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                                    <Check className="w-4 h-4 mr-1" />
                                    Tandai Semua Dibaca
                                </Button>
                            )}
                        </div>
                    </motion.div>

                    {/* Filter */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-2 mb-6"
                    >
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "all"
                                    ? "bg-[#F5B800] text-[#1A2744]"
                                    : "bg-white text-[#8A95A5] hover:bg-gray-100"
                                }`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => setFilter("unread")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === "unread"
                                    ? "bg-[#F5B800] text-[#1A2744]"
                                    : "bg-white text-[#8A95A5] hover:bg-gray-100"
                                }`}
                        >
                            Belum Dibaca ({unreadCount})
                        </button>
                    </motion.div>

                    {/* Notifications List */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="divide-y">
                            {filteredNotifs.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`p-4 flex gap-4 cursor-pointer hover:bg-gray-50 transition-colors ${!notif.isRead ? "bg-blue-50/30" : ""
                                        }`}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color}`}>
                                        <notif.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-[#1A2744]">{notif.title}</p>
                                            {!notif.isRead && (
                                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-[#8A95A5] line-clamp-2">{notif.message}</p>
                                        <p className="text-xs text-[#8A95A5] mt-1">{notif.time}</p>
                                    </div>
                                </div>
                            ))}

                            {filteredNotifs.length === 0 && (
                                <div className="p-12 text-center">
                                    <Bell className="w-12 h-12 text-[#8A95A5] mx-auto mb-4" />
                                    <p className="text-[#8A95A5]">Tidak ada notifikasi</p>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
