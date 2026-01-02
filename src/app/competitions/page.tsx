"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Trophy, Calendar, MapPin, Users, Clock, ArrowRight,
    Search, Filter, ChevronRight, Medal, Target, Flame,
    Star, CheckCircle, AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

// Ini Mock competition data
const competitions = [
    {
        id: "1",
        title: "Liga Futsal Jabodetabek 2026",
        sport: "Futsal",
        organizer: "KumpulMain.id",
        location: "Jakarta & Sekitarnya",
        startDate: "15 Jan 2026",
        endDate: "28 Feb 2026",
        registrationDeadline: "10 Jan 2026",
        prizePool: "Rp 50.000.000",
        maxTeams: 32,
        registeredTeams: 24,
        entryFee: "Rp 1.500.000",
        status: "open",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
        featured: true,
    },
    {
        id: "2",
        title: "Turnamen Badminton Ganda Putra",
        sport: "Badminton",
        organizer: "PB Garuda",
        location: "GOR Senayan, Jakarta",
        startDate: "20 Jan 2026",
        endDate: "22 Jan 2026",
        registrationDeadline: "18 Jan 2026",
        prizePool: "Rp 25.000.000",
        maxTeams: 64,
        registeredTeams: 48,
        entryFee: "Rp 500.000",
        status: "open",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
        featured: false,
    },
    {
        id: "3",
        title: "Basketball 3x3 Championship",
        sport: "Basketball",
        organizer: "Hoops Indonesia",
        location: "Lapangan Banteng, Jakarta",
        startDate: "5 Feb 2026",
        endDate: "6 Feb 2026",
        registrationDeadline: "1 Feb 2026",
        prizePool: "Rp 30.000.000",
        maxTeams: 24,
        registeredTeams: 12,
        entryFee: "Rp 750.000",
        status: "open",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
        featured: true,
    },
    {
        id: "4",
        title: "Volleyball Cup 2026",
        sport: "Volleyball",
        organizer: "Volley Jakarta",
        location: "GOR Cendrawasih",
        startDate: "10 Feb 2026",
        endDate: "15 Feb 2026",
        registrationDeadline: "5 Feb 2026",
        prizePool: "Rp 20.000.000",
        maxTeams: 16,
        registeredTeams: 16,
        entryFee: "Rp 1.000.000",
        status: "full",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800",
        featured: false,
    },
    {
        id: "5",
        title: "Mini Soccer Tournament",
        sport: "Mini Soccer",
        organizer: "Soccer Club JKT",
        location: "Pantai Indah Kapuk",
        startDate: "25 Jan 2026",
        endDate: "26 Jan 2026",
        registrationDeadline: "20 Jan 2026",
        prizePool: "Rp 15.000.000",
        maxTeams: 16,
        registeredTeams: 10,
        entryFee: "Rp 800.000",
        status: "open",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
        featured: false,
    },
];

const sportFilters = ["Semua", "Futsal", "Badminton", "Basketball", "Volleyball", "Mini Soccer", "Tennis"];

export default function CompetitionsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSport, setSelectedSport] = useState("Semua");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const filteredCompetitions = competitions.filter(comp => {
        const matchSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchSport = selectedSport === "Semua" || comp.sport === selectedSport;
        const matchStatus = selectedStatus === "all" || comp.status === selectedStatus;
        return matchSearch && matchSport && matchStatus;
    });

    const featuredCompetitions = competitions.filter(c => c.featured);

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-gradient-to-br from-[#1A2744] via-[#344D7A] to-[#5A6A7E] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F5B800]/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-medium mb-6">
                            <Trophy className="w-4 h-4" />
                            Kompetisi & Turnamen
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Cari Kompetisi Terbaik
                            <span className="block text-[#F5B800]">untuk Tim Anda!</span>
                        </h1>
                        <p className="text-lg text-white/70 mb-8">
                            Ikuti berbagai pilihan kompetisi dari seluruh Indonesia.
                            Rasakan keseruan bertanding bersama ribuan tim amatir lainnya!
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                <input
                                    type="text"
                                    placeholder="Cari kompetisi atau lokasi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F5B800]/50"
                                />
                            </div>
                            <Button variant="accent" className="px-8 py-4 shadow-lg shadow-[#F5B800]/30">
                                <Search className="w-5 h-5 mr-2" />
                                Cari
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 bg-white border-b border-[#E4E8ED]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: Trophy, value: "150+", label: "Kompetisi Aktif" },
                            { icon: Users, value: "2.500+", label: "Tim Terdaftar" },
                            { icon: MapPin, value: "25+", label: "Kota" },
                            { icon: Medal, value: "Rp 500Jt+", label: "Total Hadiah" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#F5B800]/10 flex items-center justify-center mx-auto mb-3">
                                    <stat.icon className="w-6 h-6 text-[#F5B800]" />
                                </div>
                                <p className="text-2xl font-bold text-[#1A2744]">{stat.value}</p>
                                <p className="text-sm text-[#5A6A7E]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Competitions */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A2744] flex items-center gap-2">
                                <Flame className="w-6 h-6 text-[#F5B800]" />
                                Kompetisi Unggulan
                            </h2>
                            <p className="text-[#5A6A7E] mt-1">Kompetisi populer yang sedang berjalan</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredCompetitions.map((comp, i) => (
                            <motion.div
                                key={comp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-[#344D7A]/5 border border-[#E4E8ED] hover:shadow-xl hover:border-[#F5B800]/30 transition-all"
                            >
                                <div className="relative h-48">
                                    <Image src={comp.image} alt={comp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/90 via-transparent to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-[#F5B800] text-[#1A2744] text-sm font-bold">
                                            {comp.sport}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-bold text-white mb-1">{comp.title}</h3>
                                        <p className="text-white/70 text-sm flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {comp.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-[#5A6A7E]">Tanggal</p>
                                            <p className="text-sm font-semibold text-[#1A2744]">{comp.startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5A6A7E]">Total Hadiah</p>
                                            <p className="text-sm font-bold text-[#F5B800]">{comp.prizePool}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5A6A7E]">Biaya Pendaftaran</p>
                                            <p className="text-sm font-semibold text-[#1A2744]">{comp.entryFee}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#5A6A7E]">Kuota Tim</p>
                                            <p className="text-sm font-semibold text-[#1A2744]">{comp.registeredTeams}/{comp.maxTeams}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {comp.status === "open" ? (
                                                <span className="flex items-center gap-1 text-emerald-600 text-sm">
                                                    <CheckCircle className="w-4 h-4" /> Pendaftaran Dibuka
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-red-500 text-sm">
                                                    <AlertCircle className="w-4 h-4" /> Kuota Penuh
                                                </span>
                                            )}
                                        </div>
                                        <Button variant="accent" size="sm">
                                            Detail <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Competitions */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-[#1A2744]">Semua Kompetisi</h2>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-2">
                            {sportFilters.map(sport => (
                                <button
                                    key={sport}
                                    onClick={() => setSelectedSport(sport)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedSport === sport
                                        ? "bg-[#344D7A] text-white"
                                        : "bg-[#F7F8FA] text-[#5A6A7E] hover:bg-[#E4E8ED]"
                                        }`}
                                >
                                    {sport}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompetitions.map((comp, i) => (
                            <motion.div
                                key={comp.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-[#F7F8FA] rounded-2xl overflow-hidden border border-[#E4E8ED] hover:border-[#344D7A]/30 hover:shadow-lg transition-all group"
                            >
                                <div className="relative h-40">
                                    <Image src={comp.image} alt={comp.title} fill className="object-cover" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-1 rounded-lg bg-white/90 text-[#1A2744] text-xs font-semibold">
                                            {comp.sport}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-[#1A2744] mb-2 group-hover:text-[#344D7A] transition-colors">{comp.title}</h3>
                                    <div className="space-y-2 text-sm text-[#5A6A7E]">
                                        <p className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> {comp.location}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> {comp.startDate}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4 text-[#F5B800]" />
                                            <span className="font-bold text-[#F5B800]">{comp.prizePool}</span>
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-[#E4E8ED] flex items-center justify-between">
                                        <span className="text-xs text-[#5A6A7E]">{comp.registeredTeams}/{comp.maxTeams} tim</span>
                                        <Button variant="outline" size="sm" className="text-[#344D7A] border-[#344D7A]">
                                            Lihat Detail
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredCompetitions.length === 0 && (
                        <div className="text-center py-16">
                            <Trophy className="w-16 h-16 text-[#E4E8ED] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1A2744] mb-2">Tidak ada kompetisi ditemukan</h3>
                            <p className="text-[#5A6A7E]">Coba ubah filter atau kata kunci pencarian</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-[#1A2744] to-[#344D7A]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ingin Mengadakan Kompetisi?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        Daftarkan kompetisi Anda di KumpulMain.id dan jangkau ribuan tim dari seluruh Indonesia.
                        Kami akan membantu promosi dan manajemen pendaftaran tim.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="accent" size="lg" className="shadow-lg shadow-[#F5B800]/30">
                            Daftarkan Kompetisi
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10">
                            Pelajari Selengkapnya
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
