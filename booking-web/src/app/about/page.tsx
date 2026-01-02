"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Target, Heart, Users, MapPin, Trophy, Zap,
    CheckCircle, ArrowRight, Star, Quote, Building2,
    Calendar, Shield, Smartphone, Globe
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const stats = [
    { value: "50.000+", label: "Pengguna Aktif" },
    { value: "1.000+", label: "Venue Partner" },
    { value: "100.000+", label: "Booking/Bulan" },
    { value: "30+", label: "Kota di Indonesia" },
];

const values = [
    {
        icon: Heart,
        title: "Komunitas Pertama",
        description: "Kami percaya olahraga adalah tentang kebersamaan. Setiap fitur dirancang untuk menghubungkan pemain."
    },
    {
        icon: Target,
        title: "Akses Mudah",
        description: "Booking lapangan, cari teman main, join kompetisi - semua dalam satu platform yang simpel."
    },
    {
        icon: Shield,
        title: "Terpercaya",
        description: "Transparansi harga, pembayaran aman, dan dukungan pelanggan 24/7 untuk pengalaman terbaik."
    },
    {
        icon: Zap,
        title: "Inovasi",
        description: "Terus mengembangkan fitur baru untuk membuat pengalaman olahraga semakin mudah dan menyenangkan."
    },
];

const team = [
    {
        name: "Abdu Muttaqiin",
        role: "CEO & Founder",
        image: "/team-ceo.png",
        quote: "Visi kami adalah membuat olahraga lebih accessible untuk semua orang Indonesia."
    },
    {
        name: "Siti Nurhaliza",
        role: "COO",
        image: "/team-coo.png",
        quote: "Operasional yang solid adalah kunci untuk memberikan pengalaman terbaik."
    },
    {
        name: "Andi Pratama",
        role: "CTO",
        image: "/team-cto.png",
        quote: "Teknologi harus membuat hidup lebih mudah, bukan sebaliknya."
    },
    {
        name: "Dewi Anggraini",
        role: "Head of Marketing",
        image: "/team-marketing.png",
        quote: "Membangun komunitas olahraga yang inklusif adalah passion kami."
    },
];

const testimonials = [
    {
        name: "Rizky Ramadhan",
        role: "Pemain Futsal",
        avatar: "/testimonial-1.png",
        content: "KumpulMain.id mengubah cara saya main futsal. Sekarang gampang banget cari teman main bareng setiap minggu!",
        rating: 5,
    },
    {
        name: "Ibu Ratna Sari",
        role: "Owner GOR Bintang",
        avatar: "/testimonial-2.png",
        content: "Sejak join KumpulMain, booking venue saya naik 40%. Sistemnya mudah dan pembayaran lancar.",
        rating: 5,
    },
    {
        name: "Bayu Setiawan",
        role: "Kapten Tim Basket",
        avatar: "/testimonial-3.png",
        content: "Fitur joinan sangat membantu saat kekurangan pemain. Bisa ketemu teman baru yang seru!",
        rating: 5,
    },
];

const milestones = [
    { year: "2024", event: "KumpulMain.id didirikan dengan misi menghubungkan pecinta olahraga" },
    { year: "2024", event: "Meluncurkan fitur Joinan/Main Bareng pertama di Indonesia" },
    { year: "2025", event: "Mencapai 1.000 venue partner di 20 kota" },
    { year: "2025", event: "Meluncurkan fitur Kompetisi untuk turnamen amatir" },
    { year: "2026", event: "Ekspansi ke 30 kota dengan 50.000+ pengguna aktif" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-20 bg-gradient-to-br from-[#1A2744] via-[#344D7A] to-[#5A6A7E] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5B800]/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-medium mb-6">
                            <Building2 className="w-4 h-4" />
                            Tentang Kami
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            Menghubungkan Pecinta Olahraga
                            <span className="block text-[#F5B800]">di Seluruh Indonesia</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                            KumpulMain.id adalah platform olahraga #1 di Indonesia yang memudahkan booking lapangan,
                            mencari teman main bareng, dan mengikuti kompetisi dalam satu aplikasi.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-[#E4E8ED] -mt-8 relative z-20">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-xl shadow-[#344D7A]/10 border border-[#E4E8ED] p-8"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-3xl md:text-4xl font-bold text-[#344D7A]">{stat.value}</p>
                                    <p className="text-[#5A6A7E] mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-6">
                                Misi Kami
                            </h2>
                            <p className="text-lg text-[#5A6A7E] mb-6 leading-relaxed">
                                Kami percaya setiap orang berhak menikmati olahraga dengan mudah.
                                KumpulMain.id hadir untuk menghilangkan hambatan antara Anda dan aktivitas olahraga favorit.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Memudahkan akses ke lapangan olahraga berkualitas",
                                    "Menghubungkan komunitas olahraga di seluruh Indonesia",
                                    "Memberikan platform kompetisi untuk atlet amatir",
                                    "Mendukung pengelola venue untuk berkembang"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="w-6 h-6 text-[#F5B800] flex-shrink-0 mt-0.5" />
                                        <p className="text-[#1A2744]">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative h-[400px] rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800"
                                    alt="Sports Community"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/60 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-[#F5B800] rounded-2xl p-6 shadow-lg">
                                <p className="text-4xl font-bold text-[#1A2744]">2024</p>
                                <p className="text-[#1A2744]/70">Didirikan</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-[#F7F8FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-4">Nilai-Nilai Kami</h2>
                        <p className="text-[#5A6A7E] max-w-2xl mx-auto">
                            Prinsip yang menjadi fondasi dalam membangun platform olahraga terbaik di Indonesia
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-[#E4E8ED] hover:border-[#F5B800]/50 hover:shadow-lg transition-all group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <value.icon className="w-7 h-7 text-[#F5B800]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1A2744] mb-2">{value.title}</h3>
                                <p className="text-[#5A6A7E] text-sm leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-4">Perjalanan Kami</h2>
                        <p className="text-[#5A6A7E]">Milestone penting dalam membangun KumpulMain.id</p>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#E4E8ED]" />

                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`relative flex items-center gap-6 mb-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                                    <div className="bg-white rounded-xl p-4 border border-[#E4E8ED] inline-block">
                                        <span className="text-[#F5B800] font-bold">{milestone.year}</span>
                                        <p className="text-[#1A2744] mt-1">{milestone.event}</p>
                                    </div>
                                </div>

                                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#F5B800] border-4 border-white shadow -translate-x-1/2" />

                                <div className="flex-1 md:hidden ml-16">
                                    <div className="bg-white rounded-xl p-4 border border-[#E4E8ED]">
                                        <span className="text-[#F5B800] font-bold">{milestone.year}</span>
                                        <p className="text-[#1A2744] mt-1">{milestone.event}</p>
                                    </div>
                                </div>

                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-[#F7F8FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-4">Tim Kami</h2>
                        <p className="text-[#5A6A7E] max-w-2xl mx-auto">
                            Didukung oleh tim yang passionate tentang olahraga dan teknologi
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden border border-[#E4E8ED] group hover:shadow-xl transition-all"
                            >
                                <div className="relative h-64">
                                    <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744] via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                        <p className="text-[#F5B800]">{member.role}</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-[#5A6A7E] italic">&quot;{member.quote}&quot;</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-4">Apa Kata Mereka</h2>
                        <p className="text-[#5A6A7E]">Testimoni dari pengguna dan partner kami</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 border border-[#E4E8ED] relative"
                            >
                                <Quote className="absolute top-4 right-4 w-8 h-8 text-[#F5B800]/20" />
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                    ))}
                                </div>
                                <p className="text-[#1A2744] mb-6">{testimonial.content}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                                        <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#1A2744]">{testimonial.name}</p>
                                        <p className="text-sm text-[#5A6A7E]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#1A2744] to-[#344D7A]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Bergabung dengan Komunitas Kami
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                        Mulai perjalanan olahraga Anda bersama ribuan pemain lainnya.
                        Booking lapangan, cari teman main, dan ikuti kompetisi sekarang!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button variant="accent" size="lg" className="shadow-lg shadow-[#F5B800]/30">
                                Daftar Sekarang
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/venues">
                            <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                                Jelajahi Venue
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
