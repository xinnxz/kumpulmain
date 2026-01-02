"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Check, X } from "lucide-react";
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
        { label: "Minimal 8 karakter", met: formData.password.length >= 8 },
        { label: "Huruf besar", met: /[A-Z]/.test(formData.password) },
        { label: "Huruf kecil", met: /[a-z]/.test(formData.password) },
        { label: "Angka", met: /[0-9]/.test(formData.password) },
    ];

    const isPasswordValid = passwordRequirements.every(req => req.met);
    const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!isPasswordValid) {
            setError("Password tidak memenuhi persyaratan");
            return;
        }

        if (!isPasswordMatch) {
            setError("Password tidak cocok");
            return;
        }

        setLoading(true);

        try {
            await authApi.register({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
            });

            // Auto login after register
            const loginRes = await authApi.login({
                email: formData.email,
                password: formData.password,
            });

            const { accessToken, user } = loginRes.data;
            login(user, accessToken);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registrasi gagal. Coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F7F8FA] flex">
            {/* Left - Visual */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#344D7A] to-[#283C5F] relative overflow-hidden items-center justify-center p-12">
                {/* Decorative */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F5B800]/5 rounded-full blur-3xl" />

                <div className="relative text-center max-w-md">
                    {/* Logo */}
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
                        Gabung <span className="text-[#F5B800]">KumpulMain</span>
                    </h2>
                    <p className="text-white/70 text-lg mb-10">
                        Daftar sekarang dan dapatkan akses ke ratusan venue olahraga terbaik!
                    </p>

                    {/* Benefits */}
                    <div className="space-y-4 text-left">
                        {[
                            "Booking venue kapan saja, di mana saja",
                            "Main bareng dengan teman baru",
                            "Promo eksklusif untuk member",
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-center space-x-3 bg-white/10 rounded-xl p-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#F5B800] flex items-center justify-center flex-shrink-0">
                                    <Check className="h-5 w-5 text-[#344D7A]" />
                                </div>
                                <span className="text-white/90">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo Mobile */}
                    <Link href="/" className="lg:hidden flex items-center space-x-3 mb-8">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/logo.png"
                                alt="KumpulMain"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold">
                            <span className="text-[#344D7A]">Kumpul</span>
                            <span className="text-[#F5B800]">Main</span>
                        </span>
                    </Link>

                    <h1 className="text-3xl font-bold text-[#1A2744] mb-2">Buat Akun</h1>
                    <p className="text-[#5A6A7E] mb-8">Isi form di bawah untuk mendaftar</p>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1A2744] mb-2">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-[#E4E8ED] text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
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

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1A2744] mb-2">No. Telepon</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type="tel"
                                    placeholder="08xxxxxxxxxx"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-[#E4E8ED] text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:ring-2 focus:ring-[#F5B800]/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1A2744] mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Buat password"
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

                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-3 grid grid-cols-2 gap-2">
                                    {passwordRequirements.map((req, i) => (
                                        <div key={i} className={`flex items-center space-x-2 text-xs ${req.met ? "text-emerald-600" : "text-[#8A95A5]"}`}>
                                            {req.met ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                            <span>{req.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-[#1A2744] mb-2">Konfirmasi Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ulangi password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`w-full h-12 pl-12 pr-12 rounded-xl bg-white border text-[#1A2744] placeholder:text-[#8A95A5] focus:ring-2 outline-none transition-all ${formData.confirmPassword
                                            ? isPasswordMatch
                                                ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                                                : "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-[#E4E8ED] focus:border-[#F5B800] focus:ring-[#F5B800]/20"
                                        }`}
                                    required
                                />
                                {formData.confirmPassword && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {isPasswordMatch ? (
                                            <Check className="h-5 w-5 text-emerald-500" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start space-x-3">
                            <input type="checkbox" required className="w-5 h-5 rounded border-[#E4E8ED] text-[#F5B800] focus:ring-[#F5B800] mt-0.5" />
                            <p className="text-[#5A6A7E] text-sm">
                                Saya setuju dengan{" "}
                                <Link href="/terms" className="text-[#344D7A] hover:text-[#F5B800] font-medium">
                                    Syarat & Ketentuan
                                </Link>{" "}
                                dan{" "}
                                <Link href="/privacy" className="text-[#344D7A] hover:text-[#F5B800] font-medium">
                                    Kebijakan Privasi
                                </Link>
                            </p>
                        </div>

                        <Button type="submit" className="w-full" size="lg" variant="accent" isLoading={loading}>
                            Daftar Sekarang
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-[#5A6A7E]">
                        Sudah punya akun?{" "}
                        <Link href="/login" className="text-[#344D7A] hover:text-[#F5B800] font-semibold">
                            Masuk
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
