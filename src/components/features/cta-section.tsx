"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-[#344D7A] to-[#283C5F] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F5B800]/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-semibold mb-6">
                            🎯 Siap untuk Main?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                            Booking Lebih Mudah,
                            <br />
                            Main Lebih <span className="text-[#F5B800]">Seru!</span>
                        </h2>
                        <p className="text-white/70 text-lg mb-8 leading-relaxed">
                            Gabung bersama ribuan pengguna KumpulMain dan nikmati kemudahan booking venue olahraga favorit kamu.
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-3 gap-6 mb-10">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Star className="h-6 w-6 text-[#F5B800]" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">500+</p>
                                    <p className="text-white/60 text-sm">Venue</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Shield className="h-6 w-6 text-[#F5B800]" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">100%</p>
                                    <p className="text-white/60 text-sm">Aman</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-[#F5B800]" />
                                </div>
                                <div>
                                    <p className="text-white font-bold">24/7</p>
                                    <p className="text-white/60 text-sm">Support</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/register">
                                <Button variant="accent" size="lg">
                                    Daftar Gratis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/venues">
                                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                                    Lihat Venue
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Image */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
                                <div
                                    className="aspect-video rounded-2xl bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600')" }}
                                />
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-2xl"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center">
                                        <Star className="h-6 w-6 text-[#344D7A]" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#344D7A]">4.9</p>
                                        <p className="text-[#5A6A7E] text-sm">Rating Pengguna</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Users Card */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute -top-4 -right-4 bg-[#F5B800] rounded-2xl px-5 py-4 shadow-lg"
                            >
                                <p className="text-[#344D7A] font-bold text-lg">10.000+</p>
                                <p className="text-[#344D7A]/70 text-sm">Pengguna Aktif</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
