"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (form.email === "admin@kumpulmain.id" && form.password === "admin123") {
                localStorage.setItem("adminToken", "admin-token-123");
                localStorage.setItem("adminUser", JSON.stringify({ email: form.email, name: "Admin" }));
                router.push("/admin/dashboard");
            } else {
                setError("Email atau password salah");
            }
        } catch {
            setError("Terjadi kesalahan, coba lagi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#F7F8FA] via-white to-[#F0F4FF] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background orbs */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#344D7A]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#F5B800]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <Card className="p-8 bg-white/80 backdrop-blur-xl border-[#E4E8ED] shadow-xl shadow-[#344D7A]/10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4">
                            <Image src="/logo.png" alt="KumpulMain" width={96} height={96} className="object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1A2744]">
                            Admin Panel
                        </h1>
                        <p className="text-[#5A6A7E] text-sm mt-1">
                            <span className="text-[#344D7A] font-semibold">Kumpul</span>
                            <span className="text-[#F5B800] font-semibold">Main</span>.id
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#344D7A] mb-2">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E4E8ED] text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#344D7A] focus:ring-2 focus:ring-[#344D7A]/20 outline-none transition-all"
                                placeholder="admin@kumpulmain.id"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#344D7A] mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E4E8ED] text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#344D7A] focus:ring-2 focus:ring-[#344D7A]/20 outline-none transition-all pr-12"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A95A5] hover:text-[#344D7A]"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-[#344D7A] to-[#1A2744] hover:from-[#1A2744] hover:to-[#344D7A] text-white font-semibold rounded-xl shadow-lg shadow-[#344D7A]/30"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5 mr-2" />
                                    Masuk ke Admin
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#8A95A5]">
                            Demo: admin@kumpulmain.id / admin123
                        </p>
                    </div>
                </Card>
            </motion.div>
        </main>
    );
}
