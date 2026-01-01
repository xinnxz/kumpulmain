"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Users, ArrowRight, Play, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6"
                        >
                            <Star className="h-4 w-4 text-emerald-400 mr-2" />
                            <span className="text-emerald-400 text-sm font-medium">Platform #1 Booking Lapangan</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Main Bareng
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                Jadi Lebih Seru
                            </span>
                        </h1>

                        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
                            Booking lapangan favorit, ajak teman, atau join undangan orang lain.
                            Temukan partner main bareng dan nikmati olahraga bersama!
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/venues">
                                <Button size="lg" className="w-full sm:w-auto">
                                    <Search className="h-5 w-5 mr-2" />
                                    Cari Lapangan
                                </Button>
                            </Link>
                            <Link href="/joinan">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    <Users className="h-5 w-5 mr-2" />
                                    Cari Main Bareng
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-slate-400 text-sm">500+ Lapangan</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-slate-400 text-sm">10.000+ Users</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-slate-400 text-sm">Booking Aman</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content - Hero Image/Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative">
                            {/* Main Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl">
                                <div className="aspect-video rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 mb-4 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800')] bg-cover bg-center opacity-60" />
                                    <button className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all">
                                        <Play className="h-8 w-8 text-white ml-1" fill="white" />
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-white font-bold text-lg">Futsal Arena Senayan</h3>
                                    <div className="flex items-center text-slate-400 text-sm">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>Jakarta Selatan</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                                        <span className="text-emerald-400 font-bold">Rp 300.000/jam</span>
                                        <Button size="sm">Booking</Button>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="absolute -bottom-8 -left-8 bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">25 Joinan</p>
                                        <p className="text-slate-400 text-xs">Tersedia hari ini</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Rating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -top-4 -right-4 bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-xl"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <span className="text-white font-bold">4.9</span>
                                </div>
                                <p className="text-slate-400 text-xs mt-1">1.2k+ Reviews</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2">
                    <div className="w-1.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
            </motion.div>
        </section>
    );
}
