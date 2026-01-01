"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

            // Redirect based on role
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
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">K</span>
                    </div>
                    <span className="text-2xl font-bold text-white">
                        kumpul<span className="text-emerald-400">main</span>
                    </span>
                </Link>

                {/* Form Card */}
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-white mb-2">Selamat Datang Kembali!</h1>
                        <p className="text-slate-400">Masuk untuk melanjutkan</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full h-12 pl-12 pr-12 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-slate-400 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 mr-2" />
                                Ingat saya
                            </label>
                            <Link href="/forgot-password" className="text-emerald-400 hover:underline">
                                Lupa password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                            Masuk
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-slate-400 text-sm">
                        Belum punya akun?{" "}
                        <Link href="/register" className="text-emerald-400 hover:underline font-medium">
                            Daftar sekarang
                        </Link>
                    </div>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                    <p className="text-slate-500 text-xs text-center mb-2">Demo Credentials</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <button
                            type="button"
                            onClick={() => setFormData({ email: "admin@kumpulmain.id", password: "admin123" })}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
                        >
                            Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ email: "lapangan@kumpulmain.id", password: "pengelola123" })}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
                        >
                            Pengelola
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ email: "andi@gmail.com", password: "user123" })}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
                        >
                            User
                        </button>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
