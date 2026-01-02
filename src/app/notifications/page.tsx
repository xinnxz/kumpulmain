"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Bell, Calendar, CreditCard, Users, MessageCircle, CheckCircle,
    ArrowLeft, Trash2, Check, Loader2
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { notificationsApi } from "@/lib/api";

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    data?: any;
}

const typeConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
    BOOKING_NEW: { icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-100" },
    BOOKING_CONFIRMED: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
    BOOKING_CANCELLED: { icon: Calendar, color: "text-red-600", bgColor: "bg-red-100" },
    JOINAN_REQUEST: { icon: Users, color: "text-purple-600", bgColor: "bg-purple-100" },
    JOINAN_JOINED: { icon: Users, color: "text-green-600", bgColor: "bg-green-100" },
    PAYMENT_SUCCESS: { icon: CreditCard, color: "text-green-600", bgColor: "bg-green-100" },
    CHAT_MESSAGE: { icon: MessageCircle, color: "text-blue-600", bgColor: "bg-blue-100" },
};

const tabs = [
    { key: "all", label: "Semua" },
    { key: "unread", label: "Belum Dibaca" },
    { key: "booking", label: "Booking" },
    { key: "payment", label: "Pembayaran" },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await notificationsApi.getAll();
            setNotifications(response.data || []);
        } catch (error) {
            console.error("Error fetching notifications:", error);
            // Use mock data for now
            setNotifications([
                {
                    id: "1",
                    type: "BOOKING_CONFIRMED",
                    title: "Booking Terkonfirmasi",
                    message: "Booking kamu di Futsal Arena Jakarta telah dikonfirmasi untuk tanggal 15 Jan 2026",
                    isRead: false,
                    createdAt: new Date().toISOString(),
                },
                {
                    id: "2",
                    type: "PAYMENT_SUCCESS",
                    title: "Pembayaran Berhasil",
                    message: "Pembayaran sebesar Rp 150.000 telah diterima",
                    isRead: false,
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                },
                {
                    id: "3",
                    type: "JOINAN_JOINED",
                    title: "Peserta Baru Bergabung",
                    message: "Ahmad baru saja bergabung ke sesi Main Futsal Bareng kamu",
                    isRead: true,
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await notificationsApi.markAsRead(id);
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            );
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationsApi.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            console.error("Error marking all as read:", error);
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (activeTab === "unread") return !n.isRead;
        if (activeTab === "booking") return n.type.includes("BOOKING") || n.type.includes("JOINAN");
        if (activeTab === "payment") return n.type.includes("PAYMENT");
        return true;
    });

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60000) return "Baru saja";
        if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
        return `${Math.floor(diff / 86400000)} hari lalu`;
    };

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
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-6"
                    >
                        <Link
                            href="/profile"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Profil
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#1A2744]">Notifikasi</h1>
                                <p className="text-[#8A95A5] mt-1">
                                    {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
                                </p>
                            </div>
                            {unreadCount > 0 && (
                                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                                    <Check className="w-4 h-4 mr-2" />
                                    Tandai Semua Dibaca
                                </Button>
                            )}
                        </div>
                    </motion.div>

                    {/* Tabs */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
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
                                {tab.key === "unread" && unreadCount > 0 && (
                                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </motion.div>

                    {/* Notifications List */}
                    {filteredNotifications.length > 0 ? (
                        <div className="space-y-3">
                            {filteredNotifications.map((notification, i) => {
                                const config = typeConfig[notification.type] || typeConfig.BOOKING_NEW;
                                const Icon = config.icon;

                                return (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.05 * i }}
                                    >
                                        <Card
                                            hover
                                            className={`p-4 cursor-pointer transition-all ${!notification.isRead ? "border-l-4 border-l-[#F5B800] bg-yellow-50/30" : ""
                                                }`}
                                            onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                                        >
                                            <div className="flex gap-4">
                                                <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                                                    <Icon className={`w-6 h-6 ${config.color}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h3 className={`font-semibold ${!notification.isRead ? "text-[#1A2744]" : "text-[#8A95A5]"}`}>
                                                            {notification.title}
                                                        </h3>
                                                        <span className="text-xs text-[#8A95A5] whitespace-nowrap">
                                                            {formatTime(notification.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className={`text-sm mt-1 ${!notification.isRead ? "text-[#344D7A]" : "text-[#8A95A5]"}`}>
                                                        {notification.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
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
                                <Bell className="w-20 h-20 mx-auto text-[#8A95A5]/30 mb-4" />
                                <h3 className="text-xl font-bold text-[#1A2744] mb-2">Tidak ada notifikasi</h3>
                                <p className="text-[#8A95A5]">
                                    {activeTab === "all"
                                        ? "Kamu belum memiliki notifikasi"
                                        : "Tidak ada notifikasi dalam kategori ini"
                                    }
                                </p>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
