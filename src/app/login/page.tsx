"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Trophy, Star, Users } from "lucide-react";
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
        <main className="min-h-screen bg-[#F7F8FA] flex">
            {/* Left - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 mb-10">
                        <div className="relative w-12 h-12">
                            <Image
                                src="/logo.png"
                                alt="KumpulMain"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-2xl font-bold">
                            <span className="text-[#344D7A]">Kumpul</span>
                            <span className="text-[#F5B800]">Main</span>
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-[#1A2744] mb-2">Selamat Datang!</h1>
                    <p className="text-[#5A6A7E] mb-8">Masuk untuk mulai booking dan main bareng</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-[#1A2744] mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-[#E4E8ED] text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1A2744] mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Masukkan password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full h-12 pl-12 pr-12 rounded-xl bg-white border border-[#E4E8ED] text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20 outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A95A5] hover:text-[#344D7A]"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-[#5A6A7E] text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-[#E4E8ED] text-[#F5B800] focus:ring-[#F5B800] mr-2" />
                                Ingat saya
                            </label>
                            <Link href="/forgot-password" className="text-sm text-[#344D7A] hover:text-[#F5B800] font-medium">
                                Lupa password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" size="lg" variant="accent" isLoading={loading}>
                            Masuk
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-[#5A6A7E]">
                        Belum punya akun?{" "}
                        <Link href="/register" className="text-[#344D7A] hover:text-[#F5B800] font-semibold">
                            Daftar sekarang
                        </Link>
                    </p>

                    {/* Demo Credentials */}
                    <div className="mt-8 p-5 rounded-2xl bg-white border border-[#E4E8ED]">
                        <p className="text-[#5A6A7E] text-xs text-center mb-4 font-medium uppercase tracking-wide">Demo Credentials</p>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData({ email: "admin@kumpulmain.id", password: "admin123" })}
                                className="p-3 rounded-xl bg-[#344D7A]/5 border border-transparent hover:border-[#F5B800] text-[#344D7A] text-sm font-semibold transition-all"
                            >
                                Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: "lapangan@kumpulmain.id", password: "pengelola123" })}
                                className="p-3 rounded-xl bg-[#344D7A]/5 border border-transparent hover:border-[#F5B800] text-[#344D7A] text-sm font-semibold transition-all"
                            >
                                Pengelola
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ email: "andi@gmail.com", password: "user123" })}
                                className="p-3 rounded-xl bg-[#F5B800]/10 border border-[#F5B800] text-[#344D7A] text-sm font-semibold"
                            >
                                User
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right - Visual */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#344D7A] to-[#283C5F] relative overflow-hidden items-center justify-center p-12">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F5B800]/5 rounded-full blur-3xl" />

                <div className="relative text-center max-w-md">
                    {/* Logo with white background */}
                    <div className="w-28 h-28 mx-auto mb-8 bg-white rounded-2xl p-3 shadow-2xl">
                        <div className="relative w-full h-full">
                            <Image
                                src="/logo.png"
                                alt="KumpulMain"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">
                        Booking Venue <span className="text-[#F5B800]">Lebih Mudah</span>
                    </h2>
                    <p className="text-white/70 text-lg mb-10">
                        Cari venue, pilih waktu, dan booking langsung. Semua dalam satu platform!
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <Trophy className="h-6 w-6 text-[#F5B800] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">500+</p>
                            <p className="text-white/60 text-xs">Venue</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <Users className="h-6 w-6 text-[#F5B800] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">10K+</p>
                            <p className="text-white/60 text-xs">Users</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <Star className="h-6 w-6 text-[#F5B800] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">4.9</p>
                            <p className="text-white/60 text-xs">Rating</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
