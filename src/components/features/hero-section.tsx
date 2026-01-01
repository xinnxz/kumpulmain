"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="bg-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-10"
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        Booking Lapangan Olahraga
                        <br />
                        <span className="text-[#A30D2D]">Lebih Mudah & Cepat</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Temukan dan booking lapangan favoritmu. Bisa main sendiri atau main bareng!
                    </p>
                </motion.div>

                {/* Search Widget - exactly like ayo.co.id */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-2 flex flex-col md:flex-row">
                        {/* Location */}
                        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-100">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                                Lokasi
                            </label>
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Pilih kota"
                                    className="w-full text-gray-900 font-medium placeholder:text-gray-400 outline-none"
                                />
                            </div>
                        </div>

                        {/* Sport Type */}
                        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-100">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                                Jenis Olahraga
                            </label>
                            <select className="w-full text-gray-900 font-medium outline-none bg-transparent cursor-pointer">
                                <option value="">Semua Olahraga</option>
                                <option value="futsal">Futsal</option>
                                <option value="badminton">Badminton</option>
                                <option value="basketball">Basketball</option>
                                <option value="tennis">Tennis</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-gray-100">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 block">
                                Tanggal
                            </label>
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                                <input
                                    type="date"
                                    className="w-full text-gray-900 font-medium outline-none cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="p-2 flex items-center">
                            <Button size="lg" className="w-full md:w-auto whitespace-nowrap">
                                <Search className="h-5 w-5 mr-2" />
                                Cari Venue
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-8 mt-12 text-center"
                >
                    <div>
                        <p className="text-2xl font-bold text-[#A30D2D]">500+</p>
                        <p className="text-gray-500 text-sm">Venue Partner</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#A30D2D]">10K+</p>
                        <p className="text-gray-500 text-sm">Pengguna Aktif</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[#A30D2D]">50K+</p>
                        <p className="text-gray-500 text-sm">Booking Sukses</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
