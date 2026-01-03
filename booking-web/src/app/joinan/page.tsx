"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users, Calendar, Clock, MapPin, Star, ArrowRight, Loader2,
    UserPlus, Sparkles, Zap
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { invitationsApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

interface PublicInvitation {
    id: string;
    title: string;
    inviteCode: string;
    maxSlots: number;
    filledSlots: number;
    pricePerSlot: number;
    date: string;
    startTime: string;
    endTime: string;
    skillLevel?: string;
    venue: {
        id: string;
        name: string;
        city: string;
        venueType: string;
        images?: string[];
    };
    organizer: {
        name: string;
        rating?: number;
    };
    participants?: { name: string }[];
}

// Mock data
const mockInvitations: PublicInvitation[] = [
    {
        id: "1",
        title: "Futsal Seru Bareng! 🔥",
        inviteCode: "FUTSAL01",
        maxSlots: 14,
        filledSlots: 10,
        pricePerSlot: 25000,
        date: "2026-01-05",
        startTime: "19:00",
        endTime: "21:00",
        skillLevel: "Fun Game",
        venue: { id: "1", name: "Futsal Arena Jakarta", city: "Jakarta Selatan", venueType: "Futsal", images: ["https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400"] },
        organizer: { name: "Andi Pratama", rating: 4.9 },
        participants: Array(10).fill({ name: "Player" }),
    },
    {
        id: "2",
        title: "Morning Badminton 🏸",
        inviteCode: "BADMIN02",
        maxSlots: 8,
        filledSlots: 5,
        pricePerSlot: 30000,
        date: "2026-01-06",
        startTime: "07:00",
        endTime: "09:00",
        skillLevel: "Intermediate",
        venue: { id: "2", name: "GOR Bandung", city: "Bandung", venueType: "Badminton", images: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400"] },
        organizer: { name: "Sarah W", rating: 4.8 },
        participants: Array(5).fill({ name: "Player" }),
    },
    {
        id: "3",
        title: "Basketball Night 🏀",
        inviteCode: "BASKET03",
        maxSlots: 10,
        filledSlots: 8,
        pricePerSlot: 35000,
        date: "2026-01-07",
        startTime: "20:00",
        endTime: "22:00",
        skillLevel: "Competitive",
        venue: { id: "3", name: "GOR Bogor", city: "Bogor", venueType: "Basketball", images: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400"] },
        organizer: { name: "Mike Chen", rating: 5.0 },
        participants: Array(8).fill({ name: "Player" }),
    },
];

export default function JoinanPage() {
    const [invitations, setInvitations] = useState<PublicInvitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSport, setSelectedSport] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        try {
            const res = await invitationsApi.getPublic();
            const data = res.data;
            if (Array.isArray(data) && data.length > 0) setInvitations(data);
            else if (data?.data?.length > 0) setInvitations(data.data);
            else setInvitations(mockInvitations);
        } catch {
            setInvitations(mockInvitations);
        } finally {
            setLoading(false);
        }
    };

    const sports = [
        { key: "", label: "Semua", emoji: "🎯" },
        { key: "Futsal", label: "Futsal", emoji: "⚽" },
        { key: "Badminton", label: "Badminton", emoji: "🏸" },
        { key: "Basketball", label: "Basket", emoji: "🏀" },
        { key: "Tennis", label: "Tennis", emoji: "🎾" },
    ];

    const filtered = invitations.filter(inv => !selectedSport || inv.venue.venueType === selectedSport);

    const getColorScheme = (sport: string) => {
        const schemes: Record<string, { bg: string; text: string; light: string }> = {
            Futsal: { bg: "bg-emerald-500", text: "text-emerald-600", light: "bg-emerald-50" },
            Badminton: { bg: "bg-sky-500", text: "text-sky-600", light: "bg-sky-50" },
            Basketball: { bg: "bg-orange-500", text: "text-orange-600", light: "bg-orange-50" },
            Tennis: { bg: "bg-lime-500", text: "text-lime-600", light: "bg-lime-50" },
        };
        return schemes[sport] || schemes.Futsal;
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero Section - Light Animations Only */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Simple Static Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5B800]/5 via-transparent to-[#344D7A]/5" />

                {/* Static Decorative Emojis (No Animation) */}
                <div className="absolute top-32 right-[15%] text-5xl opacity-20 select-none">⚽</div>
                <div className="absolute top-48 left-[10%] text-4xl opacity-15 select-none">🏀</div>
                <div className="absolute bottom-20 right-[25%] text-3xl opacity-15 select-none">🏸</div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-md border border-[#F5B800]/20 mb-6">
                            <Sparkles className="w-4 h-4 text-[#F5B800]" />
                            <span className="text-sm font-medium text-[#344D7A]">Temukan teman main baru!</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl font-black mb-4 text-[#1A2744]">
                            Gas <span className="text-[#F5B800]">Mabar!</span>
                        </h1>
                        <p className="text-lg text-[#5A6A7E] max-w-xl mx-auto">
                            Main bareng, kenalan, patungan. <span className="text-[#344D7A] font-medium">Seru kan?</span>
                        </p>
                    </motion.div>

                    {/* Sport Pills */}
                    <div className="flex justify-center gap-3 flex-wrap mb-8">
                        {sports.map((sport) => (
                            <button
                                key={sport.key}
                                onClick={() => setSelectedSport(sport.key)}
                                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${selectedSport === sport.key
                                        ? "bg-[#344D7A] text-white shadow-lg"
                                        : "bg-white text-[#5A6A7E] hover:bg-[#344D7A] hover:text-white shadow-md border border-[#E4E8ED]"
                                    }`}
                            >
                                <span className="mr-2">{sport.emoji}</span>
                                {sport.label}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-6 mb-8">
                        {[
                            { value: "500+", label: "Sesi", emoji: "🔥" },
                            { value: "10K+", label: "Pemain", emoji: "👥" },
                            { value: "4.9", label: "Rating", emoji: "⭐" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center bg-white rounded-xl px-5 py-3 shadow-md border border-[#E4E8ED]">
                                <div className="text-xl mb-1">{stat.emoji}</div>
                                <div className="text-xl font-bold text-[#344D7A]">{stat.value}</div>
                                <div className="text-xs text-[#8A95A5] uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sessions Grid */}
            <section className="relative pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-[#1A2744]">
                            {loading ? "Loading..." : `${filtered.length} Sesi `}
                            <span className="text-[#8A95A5] font-normal">tersedia</span>
                        </h2>
                        <Link href="/joinan/create">
                            <Button variant="accent" className="shadow-md">
                                <Zap className="w-4 h-4 mr-2" />
                                Buat Sesi
                            </Button>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-[#F5B800] animate-spin" />
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filtered.map((inv, index) => {
                                const colors = getColorScheme(inv.venue.venueType);
                                const slotsLeft = inv.maxSlots - inv.filledSlots;
                                const isHot = slotsLeft <= 3;

                                return (
                                    <motion.div
                                        key={inv.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                    >
                                        <Link href={`/joinan/${inv.inviteCode}`}>
                                            <div className="group bg-white rounded-2xl overflow-hidden shadow-md border border-[#E4E8ED] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                {/* Image Header */}
                                                <div className="relative h-44 overflow-hidden">
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                                                        style={{ backgroundImage: `url(${inv.venue.images?.[0]})` }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/80 via-transparent to-transparent" />

                                                    {/* Sport Badge */}
                                                    <div className="absolute top-3 left-3">
                                                        <div className={`${colors.bg} px-3 py-1.5 rounded-lg text-white font-bold text-xs shadow`}>
                                                            {sports.find(s => s.key === inv.venue.venueType)?.emoji} {inv.venue.venueType}
                                                        </div>
                                                    </div>

                                                    {/* Hot Badge */}
                                                    {isHot && (
                                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow">
                                                            <Zap className="w-3 h-3" />
                                                            HAMPIR PENUH
                                                        </div>
                                                    )}

                                                    {/* Title */}
                                                    <div className="absolute bottom-3 left-3 right-3">
                                                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                                                            {inv.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-white/80 text-sm">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{inv.venue.city}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4">
                                                    {/* Time & Date */}
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className={`flex-1 ${colors.light} rounded-lg p-2.5 text-center`}>
                                                            <Calendar className={`w-4 h-4 ${colors.text} mx-auto mb-1`} />
                                                            <p className="text-[#1A2744] text-sm font-semibold">{formatDate(inv.date)}</p>
                                                        </div>
                                                        <div className="flex-1 bg-[#F7F8FA] rounded-lg p-2.5 text-center">
                                                            <Clock className="w-4 h-4 text-[#8A95A5] mx-auto mb-1" />
                                                            <p className="text-[#1A2744] text-sm font-semibold">{inv.startTime}</p>
                                                        </div>
                                                    </div>

                                                    {/* Participants */}
                                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E4E8ED]">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex -space-x-2">
                                                                {Array(Math.min(inv.filledSlots, 3)).fill(0).map((_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-7 h-7 rounded-full border-2 border-white ${colors.bg} flex items-center justify-center text-white text-xs font-bold`}
                                                                    >
                                                                        {String.fromCharCode(65 + i)}
                                                                    </div>
                                                                ))}
                                                                {inv.filledSlots > 3 && (
                                                                    <div className="w-7 h-7 rounded-full border-2 border-white bg-[#F7F8FA] flex items-center justify-center text-[#5A6A7E] text-xs font-bold">
                                                                        +{inv.filledSlots - 3}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span className="text-[#5A6A7E] text-sm">{inv.filledSlots}/{inv.maxSlots}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Star className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                                            <span className="font-medium text-[#1A2744]">{inv.organizer.rating || 4.8}</span>
                                                        </div>
                                                    </div>

                                                    {/* Price & CTA */}
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[#8A95A5] text-xs">Per orang</p>
                                                            <p className="text-xl font-bold text-[#344D7A]">
                                                                {formatCurrency(inv.pricePerSlot)}
                                                            </p>
                                                        </div>
                                                        <Button variant="accent" size="sm">
                                                            Gabung
                                                            <ArrowRight className="w-4 h-4 ml-1" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-md border border-[#E4E8ED]">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold text-[#1A2744] mb-2">Belum ada sesi</h3>
                            <p className="text-[#5A6A7E] mb-6">Jadi yang pertama buat sesi main bareng!</p>
                            <Link href="/joinan/create">
                                <Button variant="accent">
                                    <Zap className="w-4 h-4 mr-2" />
                                    Buat Sesi Sekarang
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-[#344D7A] to-[#1A2744]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="text-5xl mb-6">🚀</div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                        Mau bikin sesi sendiri?
                    </h2>
                    <p className="text-lg text-white/60 mb-8">
                        Booking venue, ajak teman, patungan. Simple!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/venues">
                            <Button size="lg" className="bg-white text-[#344D7A] hover:bg-white/90 px-8">
                                <MapPin className="w-5 h-5 mr-2" />
                                Cari Venue
                            </Button>
                        </Link>
                        <Link href="/joinan/create">
                            <Button size="lg" variant="accent" className="px-8">
                                <Zap className="w-5 h-5 mr-2" />
                                Buat Sesi
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
