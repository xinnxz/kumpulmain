"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-700 text-center relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-emerald-500/30"
                        >
                            <Rocket className="h-10 w-10 text-white" />
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                            Siap untuk Main Bareng?
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                            Daftar gratis sekarang dan temukan lapangan impianmu. Booking mudah,
                            payment aman, dan seru bareng teman baru!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Mulai Sekarang - Gratis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/venues">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    Lihat Lapangan
                                </Button>
                            </Link>
                        </div>

                        <p className="text-slate-500 text-sm mt-6">
                            Sudah punya akun? <Link href="/login" className="text-emerald-400 hover:underline">Masuk di sini</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
