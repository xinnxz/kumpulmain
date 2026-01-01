"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await authApi.login(formData);
            const { accessToken, user } = res.data;
            login(user, accessToken);

            if (user.role === "ADMIN") {
                router.push("/admin");
            } else if (user.role === "PENGELOLA") {
                router.push("/pengelola");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Login gagal. Cek email dan password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex">
            {/* Left - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-[#A30D2D] flex items-center justify-center">
                            <span className="text-xl font-bold text-white">K</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            Kumpul<span className="text-[#A30D2D]">Main</span>
                        </span>
                    </Link>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Masuk ke akun</h1>
                    <p className="text-gray-500 mb-8">Selamat datang kembali! Silakan masuk.</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-12 pl-12 pr-4 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#A30D2D] focus:ring-1 focus:ring-[#A30D2D] outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full h-12 pl-12 pr-12 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#A30D2D] focus:ring-1 focus:ring-[#A30D2D] outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-gray-600 text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#A30D2D] focus:ring-[#A30D2D] mr-2" />
                                Ingat saya
                            </label>
                            <Link href="/forgot-password" className="text-sm text-[#A30D2D] hover:underline">
                                Lupa password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                            Masuk
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-gray-600 text-sm">
                        Belum punya akun?{" "}
                        <Link href="/register" className="text-[#A30D2D] hover:underline font-medium">
                            Daftar sekarang
                        </Link>
                    </p>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-4 rounded-lg bg-gray-100 border border-gray-200">
                        <p className="text-gray-500 text-xs text-center mb-3">Demo Credentials</p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData({ email: "admin@kumpulmain.id", password: "admin123" })}
                                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#A30D2D] text-xs font-medium transition-colors"
                            >
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: "lapangan@kumpulmain.id", password: "pengelola123" })}
                                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#A30D2D] text-xs font-medium transition-colors"
                            >
                                Pengelola
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: "andi@gmail.com", password: "user123" })}
                                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-[#A30D2D] text-xs font-medium transition-colors"
                            >
                                User
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right - Image */}
            <div className="hidden lg:block lg:w-1/2 bg-[#A30D2D] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800')] bg-cover bg-center opacity-20" />
                <div className="relative h-full flex flex-col items-center justify-center p-12 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Booking Lapangan Jadi Mudah</h2>
                    <p className="text-lg opacity-80">
                        Cari venue, pilih waktu, dan booking langsung. Semua dalam satu platform.
                    </p>
                </div>
            </div>
        </main>
    );
}
