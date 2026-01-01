"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Users, CreditCard, ArrowRight } from "lucide-react";

const steps = [
    {
        step: "01",
        icon: Search,
        title: "Cari Lapangan",
        description: "Temukan lapangan favorit berdasarkan lokasi, tipe olahraga, atau harga.",
    },
    {
        step: "02",
        icon: Calendar,
        title: "Pilih Waktu",
        description: "Lihat slot yang tersedia dan pilih waktu yang sesuai dengan jadwalmu.",
    },
    {
        step: "03",
        icon: Users,
        title: "Buat atau Join",
        description: "Booking sendiri atau buat undangan main bareng. Bisa juga join undangan orang lain!",
    },
    {
        step: "04",
        icon: CreditCard,
        title: "Bayar & Main",
        description: "Bayar online, dapat konfirmasi instant, dan siap main di lapangan!",
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
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
                        CARA KERJA
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold text-white mb-6"
                    >
                        Booking Lapangan dalam{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                            4 Langkah Mudah
                        </span>
                    </motion.h2>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-slate-700 to-transparent z-0" />
                            )}

                            <div className="relative z-10 text-center">
                                {/* Step Number */}
                                <div className="text-6xl font-bold text-slate-800 mb-4">{item.step}</div>

                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                                    <item.icon className="h-8 w-8 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
