"use client";

import { motion } from "framer-motion";
import { Search, CreditCard, Users, MessageCircle, Calendar, Shield } from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Cari Lapangan Mudah",
        description: "Temukan lapangan terdekat dengan filter lokasi, tipe olahraga, dan harga.",
    },
    {
        icon: Calendar,
        title: "Booking Real-Time",
        description: "Lihat ketersediaan slot secara real-time dan booking langsung tanpa konfirmasi manual.",
    },
    {
        icon: Users,
        title: "Main Bareng (Joinan)",
        description: "Buat undangan atau join undangan orang lain. Bayar sesuai bagian masing-masing!",
    },
    {
        icon: CreditCard,
        title: "Split Payment",
        description: "Patungan bayar lapangan dengan teman. Setiap orang bayar bagiannya sendiri.",
    },
    {
        icon: MessageCircle,
        title: "Chat Real-Time",
        description: "Diskusi dengan peserta lain dan pengelola lapangan langsung di aplikasi.",
    },
    {
        icon: Shield,
        title: "Pembayaran Aman",
        description: "Transaksi dijamin aman dengan payment gateway terpercaya (Midtrans).",
    },
];

export function FeaturesSection() {
    return (
        <section className="py-24 bg-slate-950 relative">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-emerald-400 font-semibold mb-4"
                    >
                        FITUR LENGKAP
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-6"
                    >
                        Semua yang Kamu Butuhkan untuk{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                            Main Bareng
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg"
                    >
                        Platform lengkap untuk booking lapangan dan cari partner main. Dari pencarian sampai pembayaran,
                        semua bisa dilakukan dalam satu aplikasi.
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="h-7 w-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
