"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2, TrendingUp, Calendar, Users, Star, CheckCircle,
    ArrowRight, Shield, Zap, BarChart3, Clock, CreditCard
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const benefits = [
    {
        icon: TrendingUp,
        title: "Tingkatkan Pendapatan",
        description: "Jangkau ribuan pemain yang mencari lapangan setiap hari"
    },
    {
        icon: Calendar,
        title: "Kelola Booking Mudah",
        description: "Dashboard intuitif untuk mengelola jadwal & booking"
    },
    {
        icon: CreditCard,
        title: "Pembayaran Otomatis",
        description: "Terima pembayaran langsung ke rekening kamu"
    },
    {
        icon: BarChart3,
        title: "Laporan & Analitik",
        description: "Pantau performa venue dengan data real-time"
    },
];

const features = [
    "Listing venue gratis",
    "Dashboard pengelolaan lengkap",
    "Notifikasi booking real-time",
    "Kalender booking visual",
    "Laporan pendapatan",
    "Support 24/7",
];

const testimonials = [
    {
        name: "Ahmad Pratama",
        venue: "Futsal Arena Jakarta",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        text: "Sejak bergabung dengan KumpulMain, booking venue saya meningkat 40%. Sangat recommended!",
        rating: 5,
    },
    {
        name: "Diana Sari",
        venue: "Badminton Center Bandung",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        text: "Dashboardnya sangat mudah digunakan. Saya bisa kelola semua booking dari handphone.",
        rating: 5,
    },
];

export default function PartnerPage() {
    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-[#1A2744] via-[#344D7A] to-[#1A2744]">
                {/* Decorative */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#F5B800]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-semibold mb-6">
                                <Building2 className="w-4 h-4 mr-2" />
                                Partner Program
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                                Maksimalkan Potensi
                                <span className="text-[#F5B800]"> Venue</span> Kamu
                            </h1>
                            <p className="text-xl text-white/70 mb-8">
                                Ayok Join bersama kami untuk membuat bisnis kalian menjadi semakin terkenal dan terpercaya.
                                Dengan KumpulMain, kamu akan merasakan keuntungan bersama KumpulMain.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/partner/register">
                                    <Button size="lg" className="text-lg px-8 py-4">
                                        Daftar Sekarang
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                                    Pelajari Lebih Lanjut
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop"
                                    alt="Venue Partner"
                                    className="rounded-2xl shadow-2xl"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-[#1A2744]">+40%</p>
                                            <p className="text-sm text-[#8A95A5]">Rata-rata peningkatan booking</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-4">
                            Keuntungan Menjadi Partner
                        </h2>
                        <p className="text-lg text-[#8A95A5] max-w-2xl mx-auto">
                            Nikmati berbagai keuntungan yang akan membantu bisnis venue kamu berkembang
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <Card hover className="p-6 text-center h-full">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#F5B800] to-[#D4A000] flex items-center justify-center">
                                        <benefit.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#1A2744] mb-2">{benefit.title}</h3>
                                    <p className="text-[#8A95A5]">{benefit.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Checklist */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-6">
                                Semua yang Kamu Butuhkan untuk Mengelola Venue
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-[#344D7A]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <Link href="/partner/register" className="inline-block mt-8">
                                <Button size="lg">
                                    Mulai Sekarang
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                                alt="Dashboard Preview"
                                className="rounded-2xl shadow-xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A2744] mb-4">
                            Apa Kata Partner Kami
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <Card className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-bold text-[#1A2744]">{testimonial.name}</p>
                                            <p className="text-sm text-[#8A95A5]">{testimonial.venue}</p>
                                        </div>
                                        <div className="ml-auto flex">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[#344D7A] italic">"{testimonial.text}"</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#1A2744] via-[#344D7A] to-[#1A2744]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Siap Mengembangkan Bisnis Venue Kamu?
                        </h2>
                        <p className="text-xl text-white/70 mb-8">
                            Daftar sekarang dan mulai terima booking dari ribuan pemain di seluruh Indonesia
                        </p>
                        <Link href="/partner/register">
                            <Button size="lg" className="text-lg px-10 py-4">
                                Daftar Gratis Sekarang
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
