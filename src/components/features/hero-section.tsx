"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, ArrowRight, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
    { id: "cari", label: "Cari Venue", icon: Search, color: "bg-[#F5B800]" },
    { id: "sewa", label: "Sewa Lapangan", icon: Calendar, color: "bg-[#344D7A]" },
    { id: "main", label: "Main Bareng", icon: Users, color: "bg-emerald-500" },
];

export function HeroSection() {
    const [activeTab, setActiveTab] = useState("cari");
    const [searchForm, setSearchForm] = useState({
        location: "",
        sport: "",
        date: "",
    });

    return (
        <section className="relative min-h-[85vh] flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&q=80')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A2744]/95 via-[#1A2744]/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            Super Sport
                            <br />
                            <span className="text-[#F5B800]">Community App</span>
                        </h1>
                        <p className="text-white/80 text-lg mb-8 max-w-md">
                            Platform booking lapangan dan main bareng terpercaya.
                            Cari venue, temukan teman main, dan nikmati olahraga bersama!
                        </p>

                        {/* App Store Badges */}
                        <div className="flex flex-wrap gap-4 mb-10">
                            <a href="#" className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-[#1A2744] hover:bg-white/90 transition-colors">
                                <Play className="h-7 w-7 mr-3" />
                                <div>
                                    <p className="text-[10px] leading-none">GET IT ON</p>
                                    <p className="text-sm font-bold">Google Play</p>
                                </div>
                            </a>
                            <a href="#" className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-[#1A2744] hover:bg-white/90 transition-colors">
                                <svg className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                </svg>
                                <div>
                                    <p className="text-[10px] leading-none">Download on the</p>
                                    <p className="text-sm font-bold">App Store</p>
                                </div>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8">
                            <div>
                                <p className="text-3xl font-bold text-[#F5B800]">500+</p>
                                <p className="text-white/60 text-sm">Venue</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#F5B800]">10K+</p>
                                <p className="text-white/60 text-sm">Pengguna</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#F5B800]">50K+</p>
                                <p className="text-white/60 text-sm">Booking</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Search Widget */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="hidden lg:block"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl p-6">
                            {/* Quick Action Tabs */}
                            <div className="flex gap-2 mb-6">
                                {quickActions.map((action) => (
                                    <button
                                        key={action.id}
                                        onClick={() => setActiveTab(action.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${activeTab === action.id
                                                ? `${action.color} text-white shadow-lg`
                                                : "bg-[#F7F8FA] text-[#5A6A7E] hover:bg-[#E4E8ED]"
                                            }`}
                                    >
                                        <action.icon className="h-4 w-4" />
                                        {action.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search Form */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1A2744] mb-2">Lokasi</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                        <input
                                            type="text"
                                            placeholder="Cari kota atau area..."
                                            value={searchForm.location}
                                            onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">Jenis Olahraga</label>
                                        <select
                                            value={searchForm.sport}
                                            onChange={(e) => setSearchForm({ ...searchForm, sport: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] focus:border-[#F5B800] focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Semua Olahraga</option>
                                            <option value="futsal">Futsal</option>
                                            <option value="badminton">Badminton</option>
                                            <option value="basketball">Basketball</option>
                                            <option value="tennis">Tennis</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">Tanggal</label>
                                        <input
                                            type="date"
                                            value={searchForm.date}
                                            onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                                            className="w-full h-12 px-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] focus:border-[#F5B800] focus:bg-white outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <Link href="/venues">
                                    <Button variant="accent" size="lg" className="w-full">
                                        Cari Venue
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Search - Bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4E8ED] p-4 z-50">
                <Link href="/venues">
                    <Button variant="accent" size="lg" className="w-full">
                        <Search className="mr-2 h-5 w-5" />
                        Cari Venue Sekarang
                    </Button>
                </Link>
            </div>
        </section>
    );
}
