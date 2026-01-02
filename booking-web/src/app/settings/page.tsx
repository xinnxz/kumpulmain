"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Settings, User, Bell, Shield, CreditCard, LogOut, Moon, Sun,
    ChevronRight, ArrowLeft, Check
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const settingSections = [
    {
        title: "Akun",
        items: [
            { icon: User, label: "Edit Profil", href: "/profile/edit", description: "Ubah nama, foto, dan info lainnya" },
            { icon: Shield, label: "Keamanan", href: "/settings/security", description: "Password dan verifikasi 2 langkah" },
            { icon: CreditCard, label: "Metode Pembayaran", href: "/settings/payment", description: "Kelola kartu dan e-wallet" },
        ]
    },
    {
        title: "Notifikasi",
        items: [
            { icon: Bell, label: "Preferensi Notifikasi", href: "/settings/notifications", description: "Atur jenis notifikasi yang diterima" },
        ]
    },
];

export default function SettingsPage() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);
    const [emailNotif, setEmailNotif] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                            <Settings className="w-8 h-8 text-[#F5B800]" />
                            Pengaturan
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Kelola preferensi akun kamu</p>
                    </motion.div>

                    {/* Settings Sections */}
                    {settingSections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * sectionIndex }}
                            className="mb-8"
                        >
                            <h2 className="text-sm font-semibold text-[#8A95A5] uppercase tracking-wider mb-3">
                                {section.title}
                            </h2>
                            <Card className="divide-y">
                                {section.items.map((item) => (
                                    <Link key={item.label} href={item.href}>
                                        <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                            <div className="w-10 h-10 rounded-xl bg-[#F5B800]/10 flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-[#F5B800]" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-[#1A2744]">{item.label}</p>
                                                <p className="text-sm text-[#8A95A5]">{item.description}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-[#8A95A5]" />
                                        </div>
                                    </Link>
                                ))}
                            </Card>
                        </motion.div>
                    ))}

                    {/* Toggle Settings */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h2 className="text-sm font-semibold text-[#8A95A5] uppercase tracking-wider mb-3">
                            Preferensi
                        </h2>
                        <Card className="divide-y">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                        <Moon className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1A2744]">Mode Gelap</p>
                                        <p className="text-sm text-[#8A95A5]">Aktifkan tema gelap</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? "bg-[#F5B800]" : "bg-gray-200"
                                        }`}
                                >
                                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"
                                        }`} />
                                </button>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1A2744]">Push Notification</p>
                                        <p className="text-sm text-[#8A95A5]">Terima notifikasi di browser</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setPushNotif(!pushNotif)}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${pushNotif ? "bg-[#F5B800]" : "bg-gray-200"
                                        }`}
                                >
                                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${pushNotif ? "translate-x-6" : "translate-x-1"
                                        }`} />
                                </button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Logout */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button onClick={handleLogout} className="w-full">
                            <Card hover className="p-4 flex items-center gap-4 border-red-200 hover:border-red-300 hover:bg-red-50">
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                    <LogOut className="w-5 h-5 text-red-600" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-red-600">Keluar dari Akun</p>
                                    <p className="text-sm text-red-400">Logout dari semua perangkat</p>
                                </div>
                            </Card>
                        </button>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
