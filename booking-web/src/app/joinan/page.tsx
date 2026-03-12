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
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
        <main className="min-h-screen bg-[#F7F8FA] overflow-hidden">
            <Navbar />

            {/* Hero - Interactive Background */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Animated Background Blobs - Light & Subtle */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 -left-20 w-[400px] h-[400px] rounded-full bg-[#F5B800]/20 blur-[80px]"
                    />
                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#344D7A]/20 blur-[60px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-400/10 blur-[100px]"
                    />
                </div>

                {/* Floating Sport Emojis */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 right-[15%] text-6xl select-none pointer-events-none opacity-60"
                >⚽</motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-48 left-[10%] text-5xl select-none pointer-events-none opacity-60"
                >🏀</motion.div>
                <motion.div
                    animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-20 right-[25%] text-4xl select-none pointer-events-none opacity-60"
                >🏸</motion.div>
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-60 right-[35%] text-3xl select-none pointer-events-none opacity-40"
                >🎾</motion.div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title - Playful & Bold */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg shadow-[#F5B800]/10 border border-[#F5B800]/20 mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-[#F5B800]" />
                            <span className="text-sm font-medium text-[#344D7A]">Temukan teman main baru!</span>
                        </motion.div>

                        <h1 className="text-5xl sm:text-7xl font-black mb-4 leading-tight text-[#1A2744]">
                            Gas{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F5B800] via-amber-400 to-[#F5B800]">
                                    Mabar!
                                </span>
                                <motion.span
                                    className="absolute -inset-2 blur-2xl bg-[#F5B800]/30 rounded-full"
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </span>
                        </h1>
                        <p className="text-xl text-[#5A6A7E] max-w-xl mx-auto font-light">
                            Main bareng, kenalan, patungan. <br />
                            <span className="text-[#344D7A] font-medium">Seru kan?</span>
                        </p>
                    </motion.div>

                    {/* Sport Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center gap-3 flex-wrap mb-8"
                    >
                        {sports.map((sport, i) => (
                            <motion.button
                                key={sport.key}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                onClick={() => setSelectedSport(sport.key)}
                                className={`group relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${selectedSport === sport.key
                                        ? "bg-[#344D7A] text-white shadow-lg shadow-[#344D7A]/30"
                                        : "bg-white text-[#5A6A7E] hover:bg-[#344D7A] hover:text-white shadow-md border border-[#E4E8ED]"
                                    }`}
                            >
                                <span className="mr-2">{sport.emoji}</span>
                                {sport.label}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex justify-center gap-8"
                    >
                        {[
                            { value: "500+", label: "Sesi", emoji: "🔥" },
                            { value: "10K+", label: "Pemain", emoji: "👥" },
                            { value: "4.9", label: "Rating", emoji: "⭐" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="text-center bg-white rounded-2xl px-6 py-4 shadow-lg border border-[#E4E8ED]"
                            >
                                <div className="text-2xl mb-1">{stat.emoji}</div>
                                <div className="text-2xl font-bold text-[#344D7A]">{stat.value}</div>
                                <div className="text-xs text-[#8A95A5] uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Sessions Grid */}
            <section className="relative pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A2744]">
                                {loading ? "Loading..." : `${filtered.length} Sesi `}
                                <span className="text-[#8A95A5] font-normal">tersedia</span>
                            </h2>
                        </div>
                        <Link href="/joinan/create">
                            <Button variant="accent" className="shadow-lg shadow-[#F5B800]/20">
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
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onHoverStart={() => setHoveredCard(inv.id)}
                                        onHoverEnd={() => setHoveredCard(null)}
                                        whileHover={{ y: -8 }}
                                    >
                                        <Link href={`/joinan/${inv.inviteCode}`}>
                                            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-[#344D7A]/5 border border-[#E4E8ED] hover:shadow-xl hover:shadow-[#F5B800]/10 transition-all duration-500">
                                                {/* Image Header */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                        style={{ backgroundImage: `url(${inv.venue.images?.[0]})` }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/80 via-transparent to-transparent" />

                                                    {/* Sport Badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <div className={`${colors.bg} px-4 py-2 rounded-xl text-white font-bold text-sm shadow-lg`}>
                                                            {sports.find(s => s.key === inv.venue.venueType)?.emoji} {inv.venue.venueType}
                                                        </div>
                                                    </div>

                                                    {/* Hot Badge */}
                                                    {isHot && (
                                                        <motion.div
                                                            animate={{ scale: [1, 1.1, 1] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                            className="absolute top-4 right-4"
                                                        >
                                                            <div className="bg-red-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-lg">
                                                                <Zap className="w-3 h-3" />
                                                                HAMPIR PENUH
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Title */}
                                                    <div className="absolute bottom-4 left-4 right-4">
                                                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-[#F5B800] transition-colors">
                                                            {inv.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-white/80 text-sm">
                                                            <MapPin className="w-3 h-3" />
                                                            <span>{inv.venue.city}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5">
                                                    {/* Time & Date */}
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className={`flex-1 ${colors.light} rounded-xl p-3 text-center`}>
                                                            <Calendar className={`w-4 h-4 ${colors.text} mx-auto mb-1`} />
                                                            <p className="text-[#1A2744] text-sm font-semibold">{formatDate(inv.date)}</p>
                                                        </div>
                                                        <div className="flex-1 bg-[#F7F8FA] rounded-xl p-3 text-center">
                                                            <Clock className="w-4 h-4 text-[#8A95A5] mx-auto mb-1" />
                                                            <p className="text-[#1A2744] text-sm font-semibold">{inv.startTime}</p>
                                                        </div>
                                                    </div>

                                                    {/* Participants */}
                                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#E4E8ED]">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex -space-x-2">
                                                                {Array(Math.min(inv.filledSlots, 4)).fill(0).map((_, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className={`w-8 h-8 rounded-full border-2 border-white ${colors.bg} flex items-center justify-center text-white text-xs font-bold`}
                                                                    >
                                                                        {String.fromCharCode(65 + i)}
                                                                    </div>
                                                                ))}
                                                                {inv.filledSlots > 4 && (
                                                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F7F8FA] flex items-center justify-center text-[#5A6A7E] text-xs font-bold">
                                                                        +{inv.filledSlots - 4}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-[#1A2744] text-sm font-medium">{inv.filledSlots}/{inv.maxSlots}</p>
                                                                <p className="text-[#8A95A5] text-xs">bergabung</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[#8A95A5] text-sm">
                                                            <Star className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                                            <span className="font-medium text-[#1A2744]">{inv.organizer.rating || 4.8}</span>
                                                        </div>
                                                    </div>

                                                    {/* Price & CTA */}
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-[#8A95A5] text-xs uppercase tracking-wide">Per orang</p>
                                                            <p className="text-2xl font-bold text-[#344D7A]">
                                                                {formatCurrency(inv.pricePerSlot)}
                                                            </p>
                                                        </div>
                                                        <Button variant="accent" className="shadow-md group-hover:shadow-lg transition-shadow">
                                                            Gabung
                                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
                        <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-[#E4E8ED]">
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-[#1A2744] mb-2">Belum ada sesi</h3>
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
            <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#344D7A] to-[#1A2744]">
                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-10 left-[10%] text-5xl opacity-30"
                >⚽</motion.div>
                <motion.div
                    animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-10 right-[15%] text-4xl opacity-30"
                >🏀</motion.div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-6xl mb-6">🚀</div>
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                            Mau bikin sesi sendiri?
                        </h2>
                        <p className="text-xl text-white/60 mb-8">
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
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
