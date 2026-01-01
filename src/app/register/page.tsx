"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

export default function RegisterPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const passwordRequirements = [
        { text: "Minimal 6 karakter", valid: formData.password.length >= 6 },
        { text: "Mengandung huruf dan angka", valid: /[a-zA-Z]/.test(formData.password) && /\d/.test(formData.password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Password tidak cocok");
            return;
        }

        setLoading(true);

        try {
            // Register
            await authApi.register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                password: formData.password,
            });

            // Auto login after register
            const loginRes = await authApi.login({
                email: formData.email,
                password: formData.password,
            });

            login(loginRes.data.user, loginRes.data.accessToken);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registrasi gagal. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12">
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
                        <h1 className="text-2xl font-bold text-white mb-2">Buat Akun Baru</h1>
                        <p className="text-slate-400">Daftar gratis dan mulai main bareng!</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                required
                            />
                        </div>

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
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="tel"
                                placeholder="No. Telepon (opsional)"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
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

                        {/* Password Requirements */}
                        <div className="space-y-1.5">
                            {passwordRequirements.map((req, i) => (
                                <div key={i} className="flex items-center text-xs">
                                    <CheckCircle2 className={`h-4 w-4 mr-2 ${req.valid ? "text-emerald-500" : "text-slate-600"}`} />
                                    <span className={req.valid ? "text-emerald-400" : "text-slate-500"}>{req.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Konfirmasi Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-start text-slate-400 text-sm cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 mr-2 mt-0.5" required />
                                <span>
                                    Saya setuju dengan{" "}
                                    <Link href="/terms" className="text-emerald-400 hover:underline">Syarat & Ketentuan</Link>
                                    {" "}dan{" "}
                                    <Link href="/privacy" className="text-emerald-400 hover:underline">Kebijakan Privasi</Link>
                                </span>
                            </label>
                        </div>

                        <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                            Daftar Sekarang
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-slate-400 text-sm">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="text-emerald-400 hover:underline font-medium">
                            Masuk di sini
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
