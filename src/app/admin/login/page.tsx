"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Simulate admin login - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check for admin credentials (demo)
            if (formData.email === "admin@kumpulmain.id" && formData.password === "admin123") {
                localStorage.setItem("adminToken", "admin-jwt-token");
                localStorage.setItem("adminUser", JSON.stringify({
                    id: "admin-1",
                    name: "Super Admin",
                    email: formData.email,
                    role: "ADMIN"
                }));
                router.push("/admin/dashboard");
            } else {
                setError("Email atau password salah");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#1A2744] via-[#0D1520] to-[#1A2744] flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5B800]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#F5B800] to-[#D4A000] flex items-center justify-center">
                        <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                    <p className="text-white/50 mt-2">KumpulMain.id</p>
                </div>

                <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                Email Admin
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5B800] focus:ring-0 transition-colors"
                                    placeholder="admin@kumpulmain.id"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/70 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5B800] focus:ring-0 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full py-4 text-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Shield className="w-5 h-5 mr-2" />
                                    Masuk ke Admin
                                </>
                            )}
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-white/30 text-sm mt-6">
                    Akses hanya untuk administrator terotorisasi
                </p>
            </motion.div>
        </main>
    );
}
