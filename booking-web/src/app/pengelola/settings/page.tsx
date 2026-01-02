"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Settings, ArrowLeft, Building2, Bell, User, Shield,
    CreditCard, ChevronRight, Save, Loader2
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const settingsMenus = [
    { icon: Building2, label: "Profil Bisnis", href: "#business", description: "Nama bisnis, deskripsi, dan logo" },
    { icon: Bell, label: "Notifikasi", href: "#notifications", description: "Atur preferensi notifikasi" },
    { icon: CreditCard, label: "Rekening Bank", href: "#bank", description: "Informasi pencairan dana" },
    { icon: Shield, label: "Keamanan", href: "#security", description: "Password dan verifikasi" },
];

export default function PengelolaSettingsPage() {
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState("business");
    const [notifications, setNotifications] = useState({
        newBooking: true,
        bookingCancelled: true,
        paymentReceived: true,
        payoutCompleted: true,
        newReview: true,
        emailNotifications: false,
    });

    const [businessData, setBusinessData] = useState({
        businessName: "Futsal Arena Jakarta",
        description: "Lapangan futsal berkualitas dengan rumput sintetis premium dan fasilitas lengkap.",
        phone: "021-12345678",
        email: "info@futsalarena.id",
    });

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSaving(false);
    };

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                        <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                            <Settings className="w-8 h-8 text-[#F5B800]" />
                            Pengaturan
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Kelola pengaturan bisnis dan akun kamu</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Sidebar Menu */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-2">
                                {settingsMenus.map((menu) => (
                                    <button
                                        key={menu.href}
                                        onClick={() => setActiveSection(menu.href.replace("#", ""))}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activeSection === menu.href.replace("#", "")
                                                ? "bg-[#F5B800]/10 text-[#1A2744]"
                                                : "hover:bg-gray-50 text-[#8A95A5]"
                                            }`}
                                    >
                                        <menu.icon className={`w-5 h-5 ${activeSection === menu.href.replace("#", "") ? "text-[#F5B800]" : ""
                                            }`} />
                                        <div className="flex-1">
                                            <p className="font-medium">{menu.label}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                ))}
                            </Card>
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-2"
                        >
                            {/* Business Profile */}
                            {activeSection === "business" && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-6">Profil Bisnis</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#1A2744] mb-2">Nama Bisnis</label>
                                            <Input
                                                value={businessData.businessName}
                                                onChange={(e) => setBusinessData({ ...businessData, businessName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#1A2744] mb-2">Deskripsi</label>
                                            <textarea
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B800] outline-none resize-none"
                                                rows={3}
                                                value={businessData.description}
                                                onChange={(e) => setBusinessData({ ...businessData, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#1A2744] mb-2">Telepon</label>
                                                <Input
                                                    value={businessData.phone}
                                                    onChange={(e) => setBusinessData({ ...businessData, phone: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#1A2744] mb-2">Email</label>
                                                <Input
                                                    type="email"
                                                    value={businessData.email}
                                                    onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleSave} disabled={saving}>
                                            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4 mr-2" /> Simpan Perubahan</>}
                                        </Button>
                                    </div>
                                </Card>
                            )}

                            {/* Notifications */}
                            {activeSection === "notifications" && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-6">Preferensi Notifikasi</h2>
                                    <div className="space-y-4">
                                        {Object.entries(notifications).map(([key, value]) => {
                                            const labels: Record<string, string> = {
                                                newBooking: "Booking Baru",
                                                bookingCancelled: "Booking Dibatalkan",
                                                paymentReceived: "Pembayaran Diterima",
                                                payoutCompleted: "Pencairan Selesai",
                                                newReview: "Review Baru",
                                                emailNotifications: "Notifikasi Email",
                                            };
                                            return (
                                                <div key={key} className="flex items-center justify-between py-3 border-b last:border-0">
                                                    <span className="font-medium text-[#1A2744]">{labels[key]}</span>
                                                    <button
                                                        onClick={() => setNotifications({ ...notifications, [key]: !value })}
                                                        className={`relative w-12 h-7 rounded-full transition-colors ${value ? "bg-[#F5B800]" : "bg-gray-200"
                                                            }`}
                                                    >
                                                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-6" : "translate-x-1"
                                                            }`} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Card>
                            )}

                            {/* Bank */}
                            {activeSection === "bank" && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-6">Rekening Bank</h2>
                                    <div className="p-4 bg-[#F7F8FA] rounded-xl mb-4">
                                        <p className="text-sm text-[#8A95A5] mb-1">Rekening Saat Ini</p>
                                        <p className="font-semibold text-[#1A2744]">BCA - •••• •••• •••• 1234</p>
                                        <p className="text-sm text-[#8A95A5]">a.n. Ahmad Pratama</p>
                                    </div>
                                    <Button variant="outline">Ubah Rekening</Button>
                                </Card>
                            )}

                            {/* Security */}
                            {activeSection === "security" && (
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-6">Keamanan</h2>
                                    <div className="space-y-4">
                                        <Link href="/settings/security">
                                            <div className="p-4 border rounded-xl hover:border-[#F5B800] transition-colors">
                                                <p className="font-medium text-[#1A2744]">Ubah Password</p>
                                                <p className="text-sm text-[#8A95A5]">Ganti password akun kamu</p>
                                            </div>
                                        </Link>
                                        <div className="p-4 border rounded-xl">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-[#1A2744]">Verifikasi 2 Langkah</p>
                                                    <p className="text-sm text-[#8A95A5]">Belum diaktifkan</p>
                                                </div>
                                                <Button variant="outline" size="sm">Aktifkan</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
