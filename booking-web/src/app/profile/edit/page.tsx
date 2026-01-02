"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    User, Mail, Phone, Camera, ArrowLeft, Save, Loader2, Check
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authApi } from "@/lib/api";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
}

export default function EditProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/login");
                return;
            }
            const response = await authApi.getProfile();
            setUser(response.data);
            setFormData({
                name: response.data.name || "",
                phone: response.data.phone || "",
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            router.push("/login");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Simulate API call - replace with actual API when ready
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update local storage
            const userData = JSON.parse(localStorage.getItem("user") || "{}");
            userData.name = formData.name;
            userData.phone = formData.phone;
            localStorage.setItem("user", JSON.stringify(userData));

            setSuccess(true);
            setTimeout(() => {
                router.push("/profile");
            }, 1500);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setSaving(false);
        }
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

            <div className="pt-24 pb-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali
                        </button>
                        <h1 className="text-3xl font-bold text-[#1A2744]">Edit Profil</h1>
                        <p className="text-[#8A95A5] mt-1">Perbarui informasi akun kamu</p>
                    </motion.div>

                    {/* Success Message */}
                    {success && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-green-800">Profil berhasil diperbarui!</p>
                                <p className="text-sm text-green-600">Mengalihkan ke halaman profil...</p>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Avatar Section */}
                                <div className="flex flex-col items-center">
                                    <div className="relative group">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#F5B800] to-[#D4A000] p-1">
                                            <div className="w-full h-full rounded-full bg-[#1A2744] flex items-center justify-center overflow-hidden">
                                                {user?.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-4xl font-bold text-[#F5B800]">
                                                        {formData.name?.charAt(0).toUpperCase() || "U"}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#344D7A] border-4 border-white flex items-center justify-center text-white hover:bg-[#1A2744] transition-colors"
                                        >
                                            <Camera className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-[#8A95A5] mt-3">Klik ikon kamera untuk mengubah foto</p>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Nama Lengkap
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 transition-colors text-[#1A2744]"
                                                placeholder="Masukkan nama lengkap"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email (Read-only) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                            <input
                                                type="email"
                                                value={user?.email || ""}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-[#8A95A5] cursor-not-allowed"
                                                disabled
                                            />
                                        </div>
                                        <p className="text-xs text-[#8A95A5] mt-1">Email tidak dapat diubah</p>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Nomor Telepon
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 transition-colors text-[#1A2744]"
                                                placeholder="08xx xxxx xxxx"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => router.back()}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1"
                                        disabled={saving || success}
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : success ? (
                                            <>
                                                <Check className="w-5 h-5 mr-2" />
                                                Tersimpan!
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5 mr-2" />
                                                Simpan Perubahan
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
