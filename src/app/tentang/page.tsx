"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Target, Heart, Zap, Shield, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FAQSection } from "@/components/features/faq-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const teamMembers = [
    { name: "Andi Pratama", role: "Founder & CEO", image: "/images/team-1.jpg" },
    { name: "Siti Rahayu", role: "Head of Product", image: "/images/team-2.jpg" },
    { name: "Budi Santoso", role: "CTO", image: "/images/team-3.jpg" },
    { name: "Dewi Lestari", role: "Head of Marketing", image: "/images/team-4.jpg" },
];

const values = [
    {
        icon: Heart,
        title: "Passion for Sports",
        description: "Kami percaya olahraga adalah cara terbaik untuk hidup sehat dan bahagia."
    },
    {
        icon: Users,
        title: "Community First",
        description: "Membangun komunitas yang solid dan saling mendukung satu sama lain."
    },
    {
        icon: Target,
        title: "Accessible to All",
        description: "Membuat olahraga mudah diakses oleh semua kalangan masyarakat."
    },
    {
        icon: Shield,
        title: "Trust & Safety",
        description: "Keamanan dan kepercayaan pengguna adalah prioritas utama kami."
    },
];

const stats = [
    { value: "500+", label: "Venue Partner" },
    { value: "50K+", label: "Pengguna Aktif" },
    { value: "100K+", label: "Booking Berhasil" },
    { value: "25+", label: "Kota" },
];

export default function TentangPage() {
    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-[#344D7A] via-[#3D5A8A] to-[#2A3D5F] relative overflow-hidden">
                {/* Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-semibold mb-6">
                            Tentang Kami
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Memudahkan Semua Orang untuk{" "}
                            <span className="text-[#F5B800]">Berolahraga</span>
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed">
                            KumpulMain adalah platform booking venue olahraga terlengkap di Indonesia.
                            Kami menghubungkan pecinta olahraga dengan venue-venue terbaik di kotamu.
                        </p>
                    </motion.div>
                </div>

                {/* Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-[#F7F8FA]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.05,69.18,321.39,56.44Z" fill="currentColor" />
                    </svg>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 -mt-8 relative z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl shadow-[#344D7A]/10 p-8"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <p className="text-3xl sm:text-4xl font-bold text-[#344D7A]">{stat.value}</p>
                                    <p className="text-[#5A6A7E] mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4">
                                Cerita Kami
                            </span>
                            <h2 className="text-3xl font-bold text-[#1A2744] mb-6">
                                Dari Pecinta Olahraga, untuk Pecinta Olahraga
                            </h2>
                            <p className="text-[#5A6A7E] leading-relaxed mb-4">
                                KumpulMain lahir dari keresahan tim kami yang kesulitan mencari lapangan untuk bermain.
                                Proses booking yang ribet, harus telepon berkali-kali, dan sering kali kecewa karena
                                lapangan sudah penuh.
                            </p>
                            <p className="text-[#5A6A7E] leading-relaxed mb-6">
                                Kami percaya semua orang berhak berolahraga dengan mudah. Itulah mengapa kami membangun
                                KumpulMain - platform yang menghubungkan kamu dengan venue olahraga terbaik di kotamu,
                                dengan proses booking yang simpel dan transparan.
                            </p>
                            <Link href="/venues">
                                <Button variant="accent" size="lg">
                                    Mulai Booking
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#344D7A] to-[#4A6699] p-8 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="aspect-square rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <Zap className="h-12 w-12 text-[#F5B800]" />
                                    </div>
                                    <div className="aspect-square rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <Users className="h-12 w-12 text-white" />
                                    </div>
                                    <div className="aspect-square rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <MapPin className="h-12 w-12 text-white" />
                                    </div>
                                    <div className="aspect-square rounded-xl bg-[#F5B800] flex items-center justify-center">
                                        <Heart className="h-12 w-12 text-[#344D7A]" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#F5B800]/20 rounded-full blur-2xl" />
                            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#344D7A]/20 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4">
                            Nilai Kami
                        </span>
                        <h2 className="text-3xl font-bold text-[#1A2744] mb-3">
                            Yang Kami Perjuangkan
                        </h2>
                        <p className="text-[#5A6A7E] max-w-2xl mx-auto">
                            Nilai-nilai yang menjadi fondasi dalam membangun KumpulMain
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#F7F8FA] rounded-2xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center mb-4">
                                    <value.icon className="h-7 w-7 text-[#344D7A]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#1A2744] mb-2">{value.title}</h3>
                                <p className="text-[#5A6A7E] text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-[#344D7A] to-[#2A3D5F]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Siap untuk Mulai Berolahraga?
                        </h2>
                        <p className="text-white/80 mb-8">
                            Temukan venue olahraga terbaik di kotamu dan booking sekarang!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/venues">
                                <Button variant="accent" size="lg">
                                    Cari Venue
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/joinan">
                                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                                    Main Bareng
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
