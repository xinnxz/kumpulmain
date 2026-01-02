"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Settings, Shield, Bell, LogOut, Save, Loader2,
    CreditCard, Percent, ToggleLeft, Mail, AlertTriangle, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const settingsCategories = [
    { id: "general", label: "Umum", icon: Settings },
    { id: "commission", label: "Komisi", icon: Percent },
    { id: "features", label: "Fitur", icon: Toggle },
    { id: "notifications", label: "Notifikasi", icon: Mail },
];

export default function AdminSettingsPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("general");
    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState({
        platformName: "KumpulMain.id",
        supportEmail: "support@kumpulmain.id",
        commissionRate: 10,
        minPayout: 100000,
        maxBookingDays: 30,
        joinanEnabled: true,
        reviewsEnabled: true,
        payoutsEnabled: true,
        maintenanceMode: false,
        emailNewBooking: true,
        emailPaymentReceived: true,
        emailNewVenue: true,
        emailDailyReport: false,
    });

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSaving(false);
    };

    return (
        <main className="min-h-screen bg-[#0D1520]">
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3"><Shield className="w-8 h-8 text-[#F5B800]" /><span className="text-xl font-bold text-white">Admin Panel</span></div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-white/70 hover:text-white"><Bell className="w-6 h-6" /></button>
                            <button onClick={() => router.push("/admin/login")} className="p-2 text-white/70 hover:text-red-400"><LogOut className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                    <Link href="/admin/dashboard" className="text-white/50 hover:text-white text-sm mb-2 inline-block">← Kembali ke Dashboard</Link>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Settings className="w-8 h-8 text-[#F5B800]" />
                        Pengaturan Platform
                    </h1>
                    <p className="text-white/50 mt-1">Konfigurasi dan preferensi platform</p>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Card className="p-2 bg-white/5 border-white/10">
                            {settingsCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activeCategory === cat.id ? "bg-[#F5B800]/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}
                                >
                                    <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? "text-[#F5B800]" : ""}`} />
                                    <span className="font-medium">{cat.label}</span>
                                    <ChevronRight className="w-4 h-4 ml-auto" />
                                </button>
                            ))}
                        </Card>
                    </motion.div>

                    {/* Content */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="md:col-span-3">
                        {/* General */}
                        {activeCategory === "general" && (
                            <Card className="p-6 bg-white/5 border-white/10">
                                <h2 className="text-lg font-bold text-white mb-6">Pengaturan Umum</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Nama Platform</label>
                                        <input type="text" value={settings.platformName} onChange={(e) => setSettings({ ...settings, platformName: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F5B800] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Email Support</label>
                                        <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F5B800] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Maks Booking Advance (hari)</label>
                                        <input type="number" value={settings.maxBookingDays} onChange={(e) => setSettings({ ...settings, maxBookingDays: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F5B800] outline-none" />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Commission */}
                        {activeCategory === "commission" && (
                            <Card className="p-6 bg-white/5 border-white/10">
                                <h2 className="text-lg font-bold text-white mb-6">Pengaturan Komisi</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Persentase Komisi (%)</label>
                                        <div className="relative">
                                            <input type="number" value={settings.commissionRate} onChange={(e) => setSettings({ ...settings, commissionRate: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F5B800] outline-none" />
                                            <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                        </div>
                                        <p className="text-xs text-white/50 mt-1">Persentase yang diambil dari setiap transaksi booking</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-2">Minimum Payout (Rp)</label>
                                        <input type="number" value={settings.minPayout} onChange={(e) => setSettings({ ...settings, minPayout: parseInt(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#F5B800] outline-none" />
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Features */}
                        {activeCategory === "features" && (
                            <Card className="p-6 bg-white/5 border-white/10">
                                <h2 className="text-lg font-bold text-white mb-6">Fitur Platform</h2>
                                <div className="space-y-4">
                                    {[
                                        { key: "joinanEnabled", label: "Fitur Joinan", desc: "Aktifkan fitur main bareng" },
                                        { key: "reviewsEnabled", label: "Review & Rating", desc: "Izinkan user memberikan review" },
                                        { key: "payoutsEnabled", label: "Pencairan Dana", desc: "Aktifkan fitur payout untuk pengelola" },
                                        { key: "maintenanceMode", label: "Maintenance Mode", desc: "Nonaktifkan sementara platform", danger: true },
                                    ].map((feature) => (
                                        <div key={feature.key} className={`flex items-center justify-between p-4 rounded-xl ${feature.danger ? "bg-red-500/10 border border-red-500/20" : "bg-white/5"}`}>
                                            <div>
                                                <p className={`font-medium ${feature.danger ? "text-red-400" : "text-white"}`}>{feature.label}</p>
                                                <p className="text-sm text-white/50">{feature.desc}</p>
                                            </div>
                                            <button
                                                onClick={() => setSettings({ ...settings, [feature.key]: !settings[feature.key as keyof typeof settings] })}
                                                className={`relative w-12 h-7 rounded-full transition-colors ${settings[feature.key as keyof typeof settings] ? (feature.danger ? "bg-red-500" : "bg-[#F5B800]") : "bg-white/20"}`}
                                            >
                                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[feature.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Notifications */}
                        {activeCategory === "notifications" && (
                            <Card className="p-6 bg-white/5 border-white/10">
                                <h2 className="text-lg font-bold text-white mb-6">Notifikasi Email Admin</h2>
                                <div className="space-y-4">
                                    {[
                                        { key: "emailNewBooking", label: "Booking Baru" },
                                        { key: "emailPaymentReceived", label: "Pembayaran Diterima" },
                                        { key: "emailNewVenue", label: "Venue Baru" },
                                        { key: "emailDailyReport", label: "Laporan Harian" },
                                    ].map((notif) => (
                                        <div key={notif.key} className="flex items-center justify-between py-3 border-b border-white/10">
                                            <span className="text-white">{notif.label}</span>
                                            <button
                                                onClick={() => setSettings({ ...settings, [notif.key]: !settings[notif.key as keyof typeof settings] })}
                                                className={`relative w-12 h-7 rounded-full transition-colors ${settings[notif.key as keyof typeof settings] ? "bg-[#F5B800]" : "bg-white/20"}`}
                                            >
                                                <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${settings[notif.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Save Button */}
                        <div className="mt-6 flex justify-end">
                            <Button onClick={handleSave} disabled={saving} className="bg-[#F5B800] text-[#1A2744] hover:bg-[#FFD740]">
                                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4 mr-2" /> Simpan Pengaturan</>}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
