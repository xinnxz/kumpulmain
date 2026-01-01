"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, ArrowRight, Play, Users, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative bg-gradient-to-b from-[#F7F8FA] to-white pt-28 pb-16 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#344D7A]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5B800]/10 border border-[#F5B800]/30 mb-6"
                        >
                            <Trophy className="h-4 w-4 text-[#F5B800] mr-2" />
                            <span className="text-[#344D7A] text-sm font-semibold">#1 Platform Booking Venue</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2744] leading-tight mb-6">
                            Booking Venue,
                            <span className="block text-[#344D7A]">
                                Main Bareng
                                <span className="relative inline-block ml-2">
                                    <span className="relative z-10">Seru!</span>
                                    <span className="absolute bottom-2 left-0 w-full h-3 bg-[#F5B800]/30 -z-0" />
                                </span>
                            </span>
                        </h1>

                        <p className="text-lg text-[#5A6A7E] mb-8 leading-relaxed max-w-lg">
                            Temukan venue olahraga terbaik, booking langsung online, dan ajak teman untuk main bareng.
                            <span className="text-[#344D7A] font-semibold"> Semua dalam satu platform!</span>
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link href="/venues">
                                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                                    <Search className="h-5 w-5 mr-2" />
                                    Cari Venue Sekarang
                                </Button>
                            </Link>
                            <Link href="/joinan">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    <Users className="h-5 w-5 mr-2" />
                                    Lihat Mabar
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <p className="text-3xl font-bold text-[#344D7A]">500+</p>
                                <p className="text-[#5A6A7E] text-sm">Venue Partner</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#344D7A]">10K+</p>
                                <p className="text-[#5A6A7E] text-sm">Pengguna Aktif</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-[#F5B800] fill-[#F5B800]" />
                                    ))}
                                </div>
                                <p className="text-[#344D7A] font-bold">4.9</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Enhanced Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Card */}
                        <div className="relative bg-white rounded-3xl shadow-2xl shadow-[#344D7A]/10 overflow-hidden border border-[#E4E8ED]">
                            <div className="aspect-[4/3] relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600')" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/80 via-transparent to-transparent" />

                                {/* Play Button */}
                                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#F5B800] flex items-center justify-center shadow-lg shadow-[#F5B800]/40 hover:scale-110 transition-transform">
                                    <Play className="h-6 w-6 text-[#344D7A] ml-1" fill="#344D7A" />
                                </button>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <span className="inline-block px-3 py-1 rounded-lg bg-[#F5B800] text-[#344D7A] text-xs font-bold mb-2">
                                        FUTSAL
                                    </span>
                                    <h3 className="text-xl font-bold mb-1">Arena Futsal Premium</h3>
                                    <div className="flex items-center text-white/80 text-sm">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        Jakarta Selatan
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-[#5A6A7E] text-sm">Mulai dari</p>
                                    <p className="text-2xl font-bold text-[#344D7A]">Rp 150.000<span className="text-sm font-normal text-[#5A6A7E]">/jam</span></p>
                                </div>
                                <Button variant="accent" size="sm">
                                    Booking
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                        {/* Floating Card - Users */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl shadow-[#344D7A]/10 border border-[#E4E8ED]"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] border-2 border-white" />
                                    ))}
                                </div>
                                <div>
                                    <p className="text-[#344D7A] font-bold">25+ Main Bareng</p>
                                    <p className="text-[#5A6A7E] text-xs">Tersedia hari ini</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Card - Rating */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="absolute -top-4 -right-4 bg-[#344D7A] rounded-2xl p-4 shadow-xl"
                        >
                            <div className="flex items-center space-x-2 text-white">
                                <Star className="h-5 w-5 text-[#F5B800] fill-[#F5B800]" />
                                <span className="font-bold">4.9</span>
                                <span className="text-white/70 text-sm">(1.2k+)</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
