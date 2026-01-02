"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Users, CreditCard, Shield, Zap, CheckCircle } from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Cari Venue Mudah",
        description: "Temukan venue olahraga terdekat dengan filter lengkap berdasarkan lokasi, jenis, dan harga.",
        color: "from-blue-500 to-blue-600",
    },
    {
        icon: Calendar,
        title: "Booking Instan",
        description: "Booking langsung online real-time. Tidak perlu telepon atau datang ke lokasi.",
        color: "from-emerald-500 to-emerald-600",
    },
    {
        icon: Users,
        title: "Main Bareng",
        description: "Buat atau join undangan main bareng dengan pemain lain. Patungan biaya lebih hemat!",
        color: "from-[#F5B800] to-[#D9A300]",
    },
    {
        icon: CreditCard,
        title: "Pembayaran Aman",
        description: "Bayar online via berbagai metode. Transaksi aman dan terverifikasi.",
        color: "from-purple-500 to-purple-600",
    },
];

const benefits = [
    "Harga transparan tanpa biaya tersembunyi",
    "Konfirmasi booking instan",
    "Customer support 24/7",
    "Garansi uang kembali",
];

export function FeaturesSection() {
    return (
        <section className="py-20 bg-[#F7F8FA] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#F5B800]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#344D7A]/5 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#344D7A]/10 text-[#344D7A] text-sm font-semibold mb-4"
                    >
                        🚀 Kenapa KumpulMain?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-[#1A2744] mb-4"
                    >
                        Semua yang Kamu Butuhkan
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#5A6A7E] text-lg"
                    >
                        Platform lengkap untuk booking lapangan dan mengatur sesi olahraga bersama teman
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg shadow-[#344D7A]/5 border border-[#E4E8ED] hover:border-[#F5B800]/50 transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1A2744] mb-2">{feature.title}</h3>
                            <p className="text-[#5A6A7E] text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#344D7A] to-[#4A6699] rounded-2xl p-8"
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center space-x-3 text-white">
                                <CheckCircle className="h-5 w-5 text-[#F5B800] flex-shrink-0" />
                                <span className="text-sm font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
