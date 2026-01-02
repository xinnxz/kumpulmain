"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Users, CreditCard, CheckCircle } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Cari Venue",
        description: "Temukan venue olahraga yang sesuai dengan lokasi dan preferensi kamu.",
        color: "from-blue-500 to-blue-600",
    },
    {
        number: "02",
        icon: Calendar,
        title: "Pilih Jadwal",
        description: "Pilih tanggal dan jam yang tersedia sesuai kebutuhanmu.",
        color: "from-[#F5B800] to-[#D9A300]",
    },
    {
        number: "03",
        icon: CreditCard,
        title: "Bayar Online",
        description: "Lakukan pembayaran dengan aman melalui berbagai metode.",
        color: "from-emerald-500 to-emerald-600",
    },
    {
        number: "04",
        icon: CheckCircle,
        title: "Main!",
        description: "Datang ke venue dan tunjukkan bukti booking. Selamat bermain!",
        color: "from-[#344D7A] to-[#4A6699]",
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4"
                    >
                        📋 Cara Kerja
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-[#1A2744] mb-4"
                    >
                        Booking Dalam 4 Langkah
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#5A6A7E] text-lg"
                    >
                        Proses booking yang super mudah dan cepat
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#E4E8ED] to-transparent" />
                            )}

                            <div className="relative bg-white rounded-2xl p-6 border border-[#E4E8ED] hover:border-[#F5B800]/50 hover:shadow-lg hover:shadow-[#344D7A]/5 transition-all duration-300">
                                {/* Number Badge */}
                                <div className="absolute -top-4 -left-2">
                                    <span className="text-6xl font-bold text-[#F7F8FA]">{step.number}</span>
                                </div>

                                {/* Icon */}
                                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                                    <step.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-[#1A2744] mb-2">{step.title}</h3>
                                <p className="text-[#5A6A7E] text-sm leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
