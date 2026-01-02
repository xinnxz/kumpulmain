"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, Star, Shield, Zap, HeadphonesIcon } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Booking Instan",
        description: "Booking venue dalam hitungan detik, konfirmasi langsung",
    },
    {
        icon: Shield,
        title: "Pembayaran Aman",
        description: "Transaksi dijamin aman dengan berbagai metode pembayaran",
    },
    {
        icon: Star,
        title: "Venue Terbaik",
        description: "Kurasi venue berkualitas dengan rating dan review lengkap",
    },
    {
        icon: HeadphonesIcon,
        title: "Support 24/7",
        description: "Tim customer service siap membantu kapan saja",
    },
];

export function WhyChooseSection() {
    return (
        <section className="py-20 bg-[#F7F8FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4">
                            ⭐ Kenapa Kami
                        </span>
                        <h2 className="text-3xl font-bold text-[#1A2744] mb-4">
                            Kenapa <span className="text-[#F5B800]">KumpulMain</span> Indonesia
                        </h2>
                        <p className="text-[#5A6A7E] mb-8 leading-relaxed">
                            KumpulMain adalah platform booking venue olahraga terdepan di Indonesia.
                            Kami berkomitmen memberikan pengalaman terbaik untuk komunitas olahraga.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-xl p-5 shadow-sm border border-[#E4E8ED] hover:border-[#F5B800]/50 hover:shadow-lg transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-[#1A2744]" />
                                    </div>
                                    <h3 className="font-bold text-[#1A2744] mb-1">{feature.title}</h3>
                                    <p className="text-[#5A6A7E] text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Image with Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80"
                                alt="Why KumpulMain"
                                width={600}
                                height={500}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/60 to-transparent" />
                        </div>

                        {/* App Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-white border border-[#E4E8ED] p-2">
                                    <Image
                                        src="/logo.png"
                                        alt="KumpulMain"
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[#1A2744] font-bold">KumpulMain App</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-[#F5B800] fill-[#F5B800]" />
                                        <span className="text-[#5A6A7E] text-sm">4.9 (2.5K Reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-4 -right-4 bg-[#344D7A] rounded-2xl px-6 py-4 text-white shadow-lg"
                        >
                            <p className="text-3xl font-bold">50K+</p>
                            <p className="text-white/70 text-sm">Pengguna Aktif</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
