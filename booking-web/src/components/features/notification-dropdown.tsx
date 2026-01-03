"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell, Calendar, CreditCard, Users, CheckCircle,
    X, Check, Loader2, ExternalLink
} from "lucide-react";
import { notificationsApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

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
};

// Mock notifications for demo
const mockNotifications: Notification[] = [
    {
        id: "1",
        type: "BOOKING_CONFIRMED",
        title: "Booking Terkonfirmasi",
        message: "Booking kamu di Futsal Arena Jakarta telah dikonfirmasi",
        isRead: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        type: "PAYMENT_SUCCESS",
        title: "Pembayaran Berhasil",
        message: "Pembayaran Rp 150.000 telah diterima",
        isRead: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        id: "3",
        type: "JOINAN_JOINED",
        title: "Peserta Baru",
        message: "Ahmad bergabung ke sesi Main Bareng kamu",
        isRead: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
];

export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && isAuthenticated) {
            fetchNotifications();
        }
    }, [isOpen, isAuthenticated]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const response = await notificationsApi.getAll();
            setNotifications(response.data || []);
        } catch (error) {
            // Use mock data
            setNotifications(mockNotifications);
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
            // Update locally anyway
            setNotifications(prev =>
                prev.map(n => n.id === id ? { ...n, isRead: true } : n)
            );
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationsApi.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (error) {
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        }
    };

    const formatTime = (dateStr: string) => {
        if (!mounted) return "";
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now.getTime() - date.getTime();

        if (diff < 60000) return "Baru saja";
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
        return `${Math.floor(diff / 86400000)}d`;
    };

    const notificationsList = Array.isArray(notifications) ? notifications : [];
    const unreadCount = notificationsList.filter(n => !n.isRead).length;

    if (!mounted || !isAuthenticated) {
        return null;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl text-[#5A6A7E] hover:text-[#1A2744] hover:bg-[#F7F8FA] transition-all"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-[#E4E8ED] overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-[#E4E8ED] flex items-center justify-between bg-gradient-to-r from-[#344D7A] to-[#1A2744]">
                            <div>
                                <h3 className="text-lg font-bold text-white">Notifikasi</h3>
                                <p className="text-white/60 text-sm">
                                    {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua sudah dibaca"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllAsRead}
                                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                        title="Tandai semua dibaca"
                                    >
                                        <Check className="h-4 w-4" />
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="py-12 flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 text-[#F5B800] animate-spin" />
                                </div>
                            ) : notificationsList.length > 0 ? (
                                <div className="divide-y divide-[#E4E8ED]">
                                    {notificationsList.slice(0, 5).map((notification) => {
                                        const config = typeConfig[notification.type] || typeConfig.BOOKING_NEW;
                                        const Icon = config.icon;

                                        return (
                                            <motion.div
                                                key={notification.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`p-4 hover:bg-[#F7F8FA] transition-colors cursor-pointer ${!notification.isRead ? "bg-yellow-50/50" : ""
                                                    }`}
                                                onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                                            >
                                                <div className="flex gap-3">
                                                    <div className={`w-10 h-10 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className={`w-5 h-5 ${config.color}`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h4 className={`font-semibold text-sm line-clamp-1 ${!notification.isRead ? "text-[#1A2744]" : "text-[#5A6A7E]"
                                                                }`}>
                                                                {notification.title}
                                                            </h4>
                                                            <span className="text-xs text-[#8A95A5] whitespace-nowrap">
                                                                {formatTime(notification.createdAt)}
                                                            </span>
                                                        </div>
                                                        <p className={`text-sm line-clamp-2 mt-0.5 ${!notification.isRead ? "text-[#344D7A]" : "text-[#8A95A5]"
                                                            }`}>
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                    {!notification.isRead && (
                                                        <div className="w-2 h-2 rounded-full bg-[#F5B800] flex-shrink-0 mt-2" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <Bell className="w-12 h-12 mx-auto text-[#8A95A5]/30 mb-3" />
                                    <p className="text-[#8A95A5]">Tidak ada notifikasi</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <Link
                            href="/notifications"
                            onClick={() => setIsOpen(false)}
                            className="block px-5 py-3 text-center text-sm font-semibold text-[#344D7A] hover:bg-[#F7F8FA] border-t border-[#E4E8ED] transition-colors"
                        >
                            Lihat Semua Notifikasi
                            <ExternalLink className="inline-block w-4 h-4 ml-1" />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
