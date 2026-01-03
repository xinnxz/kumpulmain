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
                    <Loader2 className="w-10 h-10 animate-spin text-[#F5B800]" />
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
                        <div className="text-5xl mb-4">🤔</div>
                        <h2 className="text-xl font-bold text-[#1A2744] mb-2">Sesi Tidak Ditemukan</h2>
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

            {/* Hero Banner */}
            <div className="pt-20">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                        src={joinan.venue.images?.[0] || "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800"}
                        alt={joinan.venue.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744] via-[#1A2744]/50 to-transparent" />

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[#1A2744] font-medium hover:bg-[#F7F8FA] transition-colors shadow-md"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </button>

                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <span className={`${colors.bg} px-3 py-1.5 rounded-lg text-white text-sm font-bold shadow`}>
                            {joinan.venue.venueType}
                        </span>
                        {!isFull && slotsLeft <= 3 && (
                            <span className="bg-red-500 px-3 py-1.5 rounded-lg text-white text-sm font-bold shadow flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                {slotsLeft} slot!
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">{joinan.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{joinan.venue.city}</span>
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(joinan.date)}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{joinan.startTime} - {joinan.endTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Description */}
                        {joinan.description && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white rounded-2xl p-5 shadow-md border border-[#E4E8ED]"
                            >
                                <h3 className="font-bold text-[#1A2744] mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#F5B800]" />
                                    Tentang Sesi Ini
                                </h3>
                                <p className="text-[#5A6A7E] leading-relaxed">{joinan.description}</p>
                            </motion.div>
                        )}

                        {/* Host */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                            className="bg-white rounded-2xl p-5 shadow-md border border-[#E4E8ED]"
                        >
                            <h3 className="font-bold text-[#1A2744] mb-3 flex items-center gap-2">
                                <Crown className="w-4 h-4 text-[#F5B800]" />
                                Host
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center text-white text-xl font-bold shadow`}>
                                    {joinan.organizer.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-[#1A2744]">{joinan.organizer.name}</p>
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
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Chat
                                </Button>
                            </div>
                        </motion.div>

                        {/* Participants */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="bg-white rounded-2xl p-5 shadow-md border border-[#E4E8ED]"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-[#1A2744] flex items-center gap-2">
                                    <Users className="w-4 h-4 text-[#344D7A]" />
                                    Peserta
                                </h3>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${slotsLeft <= 3 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                    {slotsLeft} slot tersisa
                                </span>
                            </div>

                            {/* Progress */}
                            <div className="mb-4">
                                <div className="h-2 bg-[#E4E8ED] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${colors.bg} transition-all duration-500`}
                                        style={{ width: `${(joinan.filledSlots / joinan.maxSlots) * 100}%` }}
                                    />
                                </div>
                                <p className="text-[#8A95A5] text-xs mt-1">{joinan.filledSlots} dari {joinan.maxSlots} slot terisi</p>
                            </div>

                            {/* Participant Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {joinan.participants?.map((p) => (
                                    <div key={p.id} className="flex items-center gap-2 p-2 bg-[#F7F8FA] rounded-lg">
                                        <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center text-white font-bold text-xs`}>
                                            {p.user.name.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-[#1A2744] text-sm truncate">{p.user.name}</p>
                                            <p className="text-xs text-[#8A95A5]">
                                                {p.status === "confirmed" ? "✓ Ready" : "Menunggu"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {/* Empty Slots */}
                                {Array(Math.min(slotsLeft, 3)).fill(0).map((_, i) => (
                                    <div key={`empty-${i}`} className="flex items-center gap-2 p-2 border border-dashed border-[#E4E8ED] rounded-lg">
                                        <div className="w-8 h-8 rounded-lg bg-[#F7F8FA] flex items-center justify-center">
                                            <UserPlus className="w-3 h-3 text-[#8A95A5]" />
                                        </div>
                                        <p className="text-[#8A95A5] text-xs">Slot kosong</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Venue */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.15 }}
                            className="bg-white rounded-2xl p-5 shadow-md border border-[#E4E8ED]"
                        >
                            <h3 className="font-bold text-[#1A2744] mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#F5B800]" />
                                Lokasi
                            </h3>
                            <div className="flex items-start gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
                                    <Button variant="outline" size="sm" className="w-full">
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Detail
                                    </Button>
                                </Link>
                                <Button variant="secondary" size="sm" className="flex-1">
                                    <Navigation className="w-4 h-4 mr-1" />
                                    Directions
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="sticky top-24"
                        >
                            <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-[#F5B800]/20">
                                {/* Price */}
                                <div className="text-center mb-5 pb-5 border-b border-[#E4E8ED]">
                                    <p className="text-[#8A95A5] text-sm mb-1">Biaya per orang</p>
                                    <p className="text-3xl font-black text-[#344D7A]">
                                        {formatCurrency(joinan.pricePerSlot)}
                                    </p>
                                    <p className="text-[#8A95A5] text-xs mt-1">Sudah termasuk venue</p>
                                </div>

                                {/* Price Breakdown */}
                                <div className="mb-5 p-3 bg-[#F7F8FA] rounded-xl space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#5A6A7E]">Sewa venue</span>
                                        <span className="text-[#1A2744]">{formatCurrency(venuePrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#5A6A7E]">Dibagi {joinan.maxSlots} orang</span>
                                        <span className="text-[#1A2744]">≈ {formatCurrency(Math.ceil(venuePrice / joinan.maxSlots))}</span>
                                    </div>
                                    <div className="flex justify-between pt-1.5 border-t border-[#E4E8ED]">
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
                                        className="w-full mb-3 h-12 text-base font-bold shadow-md"
                                        disabled={isFull || joining}
                                        onClick={handleJoin}
                                    >
                                        {joining ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Zap className="w-4 h-4 mr-2" />
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
                                <div className="mt-5 p-3 bg-[#F5B800]/10 rounded-xl text-center">
                                    <p className="text-[#8A95A5] text-xs mb-1">Kode Undangan</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <code className="text-lg font-mono font-bold text-[#344D7A]">{inviteCode}</code>
                                        <button onClick={copyInviteLink} className="p-1 rounded hover:bg-[#F5B800]/20">
                                            <Copy className="w-4 h-4 text-[#8A95A5]" />
                                        </button>
                                    </div>
                                </div>

                                {/* Trust */}
                                <div className="mt-5 pt-5 border-t border-[#E4E8ED] flex items-center gap-2 text-sm text-[#5A6A7E]">
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
