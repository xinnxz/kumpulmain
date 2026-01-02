"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Shield, ArrowLeft, Key, Smartphone, Eye, EyeOff,
    CheckCircle, AlertCircle, History
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const loginHistory = [
    { device: "Chrome di Windows", location: "Jakarta, Indonesia", time: "Hari ini, 14:30", current: true },
    { device: "Safari di iPhone", location: "Jakarta, Indonesia", time: "Kemarin, 09:15", current: false },
    { device: "Chrome di MacBook", location: "Bandung, Indonesia", time: "3 hari lalu", current: false },
];

export default function SecuritySettingsPage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        setSuccess(true);
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });

        setTimeout(() => setSuccess(false), 3000);
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
                            href="/settings"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Pengaturan
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                            <Shield className="w-8 h-8 text-[#F5B800]" />
                            Keamanan Akun
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Kelola password dan keamanan akun kamu</p>
                    </motion.div>

                    {/* Success Alert */}
                    {success && (
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                        >
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-medium">Password berhasil diubah!</span>
                        </motion.div>
                    )}

                    {/* Change Password */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <h2 className="text-sm font-semibold text-[#8A95A5] uppercase tracking-wider mb-3">
                            Ubah Password
                        </h2>
                        <Card className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                        Password Saat Ini
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={formData.currentPassword}
                                            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                            placeholder="Masukkan password saat ini"
                                            className="pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A95A5] hover:text-[#1A2744]"
                                        >
                                            {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                        Password Baru
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            placeholder="Masukkan password baru"
                                            className="pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A95A5] hover:text-[#1A2744]"
                                        >
                                            {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#8A95A5] mt-1">Minimal 8 karakter dengan huruf dan angka</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                        Konfirmasi Password Baru
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            placeholder="Ulangi password baru"
                                            className="pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A95A5] hover:text-[#1A2744]"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                                <Button type="submit" isLoading={isLoading} className="w-full">
                                    <Key className="w-5 h-5 mr-2" />
                                    Ubah Password
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    {/* Two-Factor Authentication */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <h2 className="text-sm font-semibold text-[#8A95A5] uppercase tracking-wider mb-3">
                            Verifikasi 2 Langkah
                        </h2>
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Smartphone className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[#1A2744]">Autentikasi Dua Faktor (2FA)</h3>
                                    <p className="text-sm text-[#8A95A5] mt-1">
                                        Tambahkan lapisan keamanan ekstra dengan kode verifikasi dari aplikasi authenticator
                                    </p>
                                    {!twoFactorEnabled && (
                                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
                                            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-yellow-700">
                                                Akun kamu belum dilindungi 2FA. Aktifkan untuk keamanan lebih baik.
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                    className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ${twoFactorEnabled ? "bg-green-500" : "bg-gray-200"
                                        }`}
                                >
                                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${twoFactorEnabled ? "translate-x-7" : "translate-x-1"
                                        }`} />
                                </button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Login History */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-sm font-semibold text-[#8A95A5] uppercase tracking-wider mb-3 flex items-center gap-2">
                            <History className="w-4 h-4" />
                            Riwayat Login
                        </h2>
                        <Card className="divide-y">
                            {loginHistory.map((login, i) => (
                                <div key={i} className="p-4 flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${login.current ? "bg-green-100" : "bg-gray-100"
                                        }`}>
                                        <Smartphone className={`w-5 h-5 ${login.current ? "text-green-600" : "text-gray-500"
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-[#1A2744]">{login.device}</p>
                                            {login.current && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                                    Sesi Aktif
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-[#8A95A5]">{login.location} • {login.time}</p>
                                    </div>
                                    {!login.current && (
                                        <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                                            Akhiri
                                        </button>
                                    )}
                                </div>
                            ))}
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
