"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, TrendingUp, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VenueOwnerSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Image with Label */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80"
                                alt="Venue Management"
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                            {/* Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5B800] text-[#1A2744] text-sm font-bold shadow-lg">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    For Venue Owner
                                </span>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-[#E4E8ED]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-[#1A2744]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-[#344D7A]">+150%</p>
                                    <p className="text-[#5A6A7E] text-sm">Peningkatan Booking</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#344D7A]/10 text-[#344D7A] text-sm font-semibold mb-4">
                            🏢 Partner Venue
                        </span>
                        <h2 className="text-3xl font-bold text-[#1A2744] mb-4">
                            Kelola venue lebih praktis
                            <br />
                            <span className="text-[#F5B800]">dan menguntungkan.</span>
                        </h2>
                        <p className="text-[#5A6A7E] mb-8 leading-relaxed">
                            Daftarkan venue olahraga Anda di KumpulMain dan dapatkan akses ke ribuan
                            pelanggan potensial. Kelola jadwal, terima booking, dan tingkatkan pendapatan
                            dengan dashboard yang mudah digunakan.
                        </p>

                        {/* Features */}
                        <div className="space-y-4 mb-8">
                            {[
                                { icon: Clock, text: "Kelola jadwal dan booking real-time" },
                                { icon: TrendingUp, text: "Tingkatkan pendapatan hingga 150%" },
                                { icon: Shield, text: "Pembayaran aman dan terjamin" },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] flex items-center justify-center">
                                        <feature.icon className="h-5 w-5 text-[#344D7A]" />
                                    </div>
                                    <span className="text-[#1A2744]">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/register?role=pengelola">
                            <Button variant="primary" size="lg">
                                Daftarkan Venue Anda
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
