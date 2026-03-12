"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users, Calendar, Clock, MapPin, Share2, ArrowLeft, Loader2,
    Crown, Check, Copy, MessageCircle, UserPlus, LogOut, Star,
    Shield, ExternalLink, Navigation, Zap, Sparkles
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { invitationsApi } from "@/lib/api";
import { formatCurrency, formatDate, generateInviteLink } from "@/lib/utils";

interface Participant {
    id: string;
    user: { id: string; name: string; email: string };
    status: string;
    joinedAt: string;
}

interface JoinanDetail {
    id: string;
    title: string;
    description?: string;
    inviteCode: string;
    maxSlots: number;
    filledSlots: number;
    pricePerSlot: number;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    skillLevel?: string;
    venue: {
        id: string;
        name: string;
        address: string;
        city: string;
        venueType: string;
        images?: string[];
        pricePerHour?: number;
    };
    organizer: { id: string; name: string; phone?: string; rating?: number; totalEvents?: number };
    participants?: Participant[];
}

const mockJoinan: JoinanDetail = {
    id: "1",
    title: "Futsal Seru Bareng! 🔥",
    description: "Main futsal santai bareng teman-teman baru! Yang penting happy. Bawa baju ganti dan minuman sendiri ya!",
    inviteCode: "FUTSAL01",
    maxSlots: 14,
    filledSlots: 10,
    pricePerSlot: 25000,
    date: "2026-01-05",
    startTime: "19:00",
    endTime: "21:00",
    status: "OPEN",
    skillLevel: "Fun Game",
    venue: {
        id: "1",
        name: "Futsal Arena Jakarta",
        address: "Jl. Sudirman No. 123, Senayan",
        city: "Jakarta Selatan",
        venueType: "Futsal",
        images: ["https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800"],
        pricePerHour: 200000,
    },
    organizer: { id: "1", name: "Andi Pratama", rating: 4.9, totalEvents: 15 },
    participants: Array(10).fill(0).map((_, i) => ({
        id: String(i),
        user: { id: String(i), name: ["Budi", "Citra", "Deni", "Eka", "Fani", "Gita", "Hadi", "Indra", "Joko", "Kiki"][i], email: "" },
        status: i < 8 ? "confirmed" : "pending",
        joinedAt: "",
    })),
};

export default function JoinanDetailPage() {
    const params = useParams();
    const router = useRouter();
    const inviteCode = params.id as string;

    const [joinan, setJoinan] = useState<JoinanDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (inviteCode) fetchJoinan();
    }, [inviteCode]);

    const fetchJoinan = async () => {
        try {
            setLoading(true);
            const res = await invitationsApi.getByCode(inviteCode);
            setJoinan(res.data || mockJoinan);
        } catch {
            setJoinan(mockJoinan);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        if (!joinan) return;
        setJoining(true);
        try {
            await invitationsApi.join(joinan.id);
            setIsParticipant(true);
            fetchJoinan();
        } catch {
            setIsParticipant(true);
        } finally {
            setJoining(false);
        }
    };

    const copyInviteLink = () => {
        navigator.clipboard.writeText(generateInviteLink(inviteCode));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 animate-spin text-[#F5B800]" />
                </div>
            </main>
        );
    }

    if (!joinan) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh] text-center">
                    <div>
                        <div className="text-6xl mb-4">🤔</div>
                        <h2 className="text-2xl font-bold text-[#1A2744] mb-2">Sesi Tidak Ditemukan</h2>
                        <p className="text-[#5A6A7E] mb-6">Kode undangan tidak valid</p>
                        <Link href="/joinan">
                            <Button variant="accent">Cari Sesi Lain</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    const slotsLeft = joinan.maxSlots - joinan.filledSlots;
    const isFull = slotsLeft === 0;
    const colors = getColorScheme(joinan.venue.venueType);
    const venuePrice = joinan.venue.pricePerHour ? joinan.venue.pricePerHour * 2 : 400000;

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero */}
            <div className="relative pt-20">
                {/* Interactive Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="absolute top-20 left-[10%] w-[300px] h-[300px] rounded-full bg-[#F5B800]/15 blur-[60px]"
                    />
                    <motion.div
                        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                        transition={{ duration: 12, repeat: Infinity }}
                        className="absolute top-40 right-[20%] w-[200px] h-[200px] rounded-full bg-[#344D7A]/15 blur-[50px]"
                    />
                </div>

                {/* Image Banner */}
                <div className="relative h-72 sm:h-96 overflow-hidden">
                    <img
                        src={joinan.venue.images?.[0] || "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800"}
                        alt={joinan.venue.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744] via-[#1A2744]/50 to-transparent" />

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl text-[#1A2744] font-medium hover:bg-[#F7F8FA] transition-all shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </button>

                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <span className={`${colors.bg} px-4 py-2 rounded-xl text-white text-sm font-bold shadow-lg`}>
                            {joinan.venue.venueType}
                        </span>
                        {!isFull && slotsLeft <= 3 && (
                            <motion.span
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="bg-red-500 px-4 py-2 rounded-xl text-white text-sm font-bold shadow-lg flex items-center gap-1"
                            >
                                <Zap className="w-3 h-3" />
                                {slotsLeft} slot!
                            </motion.span>
                        )}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-4xl font-black text-white mb-2"
                        >
                            {joinan.title}
                        </motion.h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/80">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{joinan.venue.city}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(joinan.date)}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{joinan.startTime} - {joinan.endTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        {joinan.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-6 shadow-lg border border-[#E4E8ED]"
                            >
                                <h3 className="font-bold text-lg text-[#1A2744] mb-3 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-[#F5B800]" />
                                    Tentang Sesi Ini
                                </h3>
                                <p className="text-[#5A6A7E] leading-relaxed">{joinan.description}</p>
                            </motion.div>
                        )}

                        {/* Host */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-lg border border-[#E4E8ED]"
                        >
                            <h3 className="font-bold text-lg text-[#1A2744] mb-4 flex items-center gap-2">
                                <Crown className="w-5 h-5 text-[#F5B800]" />
                                Host
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                                    {joinan.organizer.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-lg text-[#1A2744]">{joinan.organizer.name}</p>
                                    <div className="flex items-center gap-3 text-[#5A6A7E] text-sm">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                            {joinan.organizer.rating || 4.8}
                                        </span>
                                        <span>•</span>
                                        <span>{joinan.organizer.totalEvents || 5} sesi</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Chat
                                </Button>
                            </div>
                        </motion.div>

                        {/* Participants */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-6 shadow-lg border border-[#E4E8ED]"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-lg text-[#1A2744] flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#344D7A]" />
                                    Peserta
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${slotsLeft <= 3 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                    {slotsLeft} slot tersisa
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="mb-6">
                                <div className="h-3 bg-[#E4E8ED] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(joinan.filledSlots / joinan.maxSlots) * 100}%` }}
                                        className={`h-full rounded-full ${colors.bg}`}
                                    />
                                </div>
                                <p className="text-[#8A95A5] text-sm mt-2">{joinan.filledSlots} dari {joinan.maxSlots} slot terisi</p>
                            </div>

                            {/* Participant Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {joinan.participants?.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-center gap-3 p-3 bg-[#F7F8FA] rounded-xl hover:bg-[#E4E8ED] transition-colors"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center text-white font-bold text-sm`}>
                                            {p.user.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-[#1A2744] truncate">{p.user.name}</p>
                                            <p className="text-xs text-[#8A95A5]">
                                                {p.status === "confirmed" ? "✓ Ready" : "Menunggu"}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {/* Empty Slots */}
                                {Array(Math.min(slotsLeft, 4)).fill(0).map((_, i) => (
                                    <div key={`empty-${i}`} className="flex items-center gap-3 p-3 border-2 border-dashed border-[#F5B800]/30 rounded-xl bg-[#F5B800]/5">
                                        <div className="w-10 h-10 rounded-xl bg-[#F5B800]/10 flex items-center justify-center">
                                            <UserPlus className="w-4 h-4 text-[#F5B800]" />
                                        </div>
                                        <p className="text-[#F5B800] text-sm font-medium">Slot kosong</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Venue */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-3xl p-6 shadow-lg border border-[#E4E8ED]"
                        >
                            <h3 className="font-bold text-lg text-[#1A2744] mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-[#F5B800]" />
                                Lokasi
                            </h3>
                            <div className="flex items-start gap-4">
                                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                                    <img src={joinan.venue.images?.[0]} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#1A2744]">{joinan.venue.name}</p>
                                    <p className="text-[#5A6A7E] text-sm">{joinan.venue.address}</p>
                                    <p className="text-[#8A95A5] text-sm">{joinan.venue.city}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4">
                                <Link href={`/venues/${joinan.venue.id}`} className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Detail Venue
                                    </Button>
                                </Link>
                                <Button variant="secondary" className="flex-1">
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Directions
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-24"
                        >
                            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-[#F5B800]/20">
                                {/* Price */}
                                <div className="text-center mb-6 pb-6 border-b border-[#E4E8ED]">
                                    <p className="text-[#8A95A5] text-sm mb-1">Biaya per orang</p>
                                    <p className="text-4xl font-black text-[#344D7A]">
                                        {formatCurrency(joinan.pricePerSlot)}
                                    </p>
                                    <p className="text-[#8A95A5] text-xs mt-2">Sudah termasuk venue</p>
                                </div>

                                {/* Price Breakdown */}
                                <div className="mb-6 p-4 bg-gradient-to-r from-[#F7F8FA] to-[#F5B800]/5 rounded-xl space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#5A6A7E]">Sewa venue</span>
                                        <span className="text-[#1A2744]">{formatCurrency(venuePrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#5A6A7E]">Dibagi {joinan.maxSlots} orang</span>
                                        <span className="text-[#1A2744]">≈ {formatCurrency(Math.ceil(venuePrice / joinan.maxSlots))}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-[#E4E8ED]">
                                        <span className="text-[#8A95A5]">+ Biaya host</span>
                                        <span className="text-[#8A95A5]">+{formatCurrency(5000)}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                {isParticipant ? (
                                    <Button
                                        variant="outline"
                                        className="w-full mb-3 text-red-500 border-red-200 hover:bg-red-50"
                                        onClick={() => setIsParticipant(false)}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Keluar
                                    </Button>
                                ) : (
                                    <Button
                                        variant="accent"
                                        className="w-full mb-3 h-14 text-lg font-bold shadow-lg shadow-[#F5B800]/30"
                                        disabled={isFull || joining}
                                        onClick={handleJoin}
                                    >
                                        {joining ? (
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        ) : (
                                            <Zap className="w-5 h-5 mr-2" />
                                        )}
                                        {isFull ? "Slot Penuh" : "Gabung Sekarang!"}
                                    </Button>
                                )}

                                <Button variant="outline" className="w-full" onClick={copyInviteLink}>
                                    {copied ? (
                                        <><Check className="w-4 h-4 mr-2 text-green-500" />Link Disalin!</>
                                    ) : (
                                        <><Share2 className="w-4 h-4 mr-2" />Bagikan</>
                                    )}
                                </Button>

                                {/* Invite Code */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-[#F5B800]/10 to-transparent rounded-xl text-center">
                                    <p className="text-[#8A95A5] text-xs mb-1">Kode Undangan</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <code className="text-xl font-mono font-bold text-[#344D7A]">{inviteCode}</code>
                                        <button onClick={copyInviteLink} className="p-1.5 rounded-lg hover:bg-[#F5B800]/20">
                                            <Copy className="w-4 h-4 text-[#8A95A5]" />
                                        </button>
                                    </div>
                                </div>

                                {/* Trust */}
                                <div className="mt-6 pt-6 border-t border-[#E4E8ED] flex items-center gap-2 text-sm text-[#5A6A7E]">
                                    <Shield className="w-4 h-4 text-green-500" />
                                    Venue sudah dibooking
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
