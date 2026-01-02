"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users, Calendar, Clock, MapPin, Share2, ArrowLeft, Loader2,
    Crown, Check, Copy, MessageCircle, UserPlus, LogOut
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { invitationsApi } from "@/lib/api";
import { formatCurrency, formatDate, generateInviteLink } from "@/lib/utils";

interface Participant {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
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
    venue: {
        id: string;
        name: string;
        address: string;
        city: string;
        venueType: string;
        images?: string[];
    };
    organizer: {
        id: string;
        name: string;
        phone?: string;
    };
    participants?: Participant[];
}

export default function JoinanDetailPage() {
    const params = useParams();
    const router = useRouter();
    const inviteCode = params.id as string;

    const [joinan, setJoinan] = useState<JoinanDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isParticipant, setIsParticipant] = useState(false);

    useEffect(() => {
        if (inviteCode) fetchJoinan();
    }, [inviteCode]);

    const fetchJoinan = async () => {
        try {
            setLoading(true);
            const res = await invitationsApi.getByCode(inviteCode);
            setJoinan(res.data);
            // Check if current user is a participant
            // This would need auth context, for now using mock
        } catch (error) {
            console.error("Error fetching joinan:", error);
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
            fetchJoinan(); // Refresh data
        } catch (error) {
            console.error("Error joining:", error);
        } finally {
            setJoining(false);
        }
    };

    const handleLeave = async () => {
        if (!joinan) return;
        // API call to leave invitation
        setIsParticipant(false);
    };

    const copyInviteLink = () => {
        const link = generateInviteLink(inviteCode);
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sportBadgeStyles: Record<string, string> = {
        Futsal: "bg-gradient-to-r from-emerald-500 to-emerald-600",
        Badminton: "bg-gradient-to-r from-blue-500 to-blue-600",
        Basketball: "bg-gradient-to-r from-orange-500 to-orange-600",
        Basket: "bg-gradient-to-r from-orange-500 to-orange-600",
        Tennis: "bg-gradient-to-r from-pink-500 to-pink-600",
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-20 flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-[#F5B800] mx-auto mb-4" />
                        <p className="text-[#8A95A5]">Memuat undangan...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!joinan) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-20 flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Users className="w-16 h-16 text-[#8A95A5] mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-[#1A2744] mb-2">Undangan Tidak Ditemukan</h2>
                        <p className="text-[#8A95A5] mb-6">Kode undangan tidak valid atau sudah kadaluarsa</p>
                        <Link href="/joinan">
                            <Button>Cari Undangan Lain</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    const slotsRemaining = joinan.maxSlots - joinan.filledSlots;
    const isFull = slotsRemaining === 0;
    const venueImage = joinan.venue.images?.[0] || "/images/venue_futsal_1_1767281872661.png";

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                {/* Hero Banner */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img
                        src={venueImage}
                        alt={joinan.venue.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744] via-[#1A2744]/50 to-transparent" />

                    {/* Back Button */}
                    <div className="absolute top-4 left-4">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-[#1A2744] font-medium hover:bg-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </button>
                    </div>

                    {/* Sport Badge */}
                    <div className="absolute top-4 right-4">
                        <span className={`px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg ${sportBadgeStyles[joinan.venue.venueType] || "bg-[#344D7A]"}`}>
                            {joinan.venue.venueType}
                        </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{joinan.title}</h1>
                            <div className="flex items-center gap-2 text-white/80">
                                <MapPin className="w-4 h-4" />
                                <span>{joinan.venue.name}, {joinan.venue.city}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Info Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid sm:grid-cols-3 gap-4"
                            >
                                <Card className="p-4 text-center">
                                    <Calendar className="w-6 h-6 text-[#F5B800] mx-auto mb-2" />
                                    <p className="text-sm text-[#8A95A5]">Tanggal</p>
                                    <p className="font-bold text-[#1A2744]">{formatDate(joinan.date)}</p>
                                </Card>
                                <Card className="p-4 text-center">
                                    <Clock className="w-6 h-6 text-[#344D7A] mx-auto mb-2" />
                                    <p className="text-sm text-[#8A95A5]">Waktu</p>
                                    <p className="font-bold text-[#1A2744]">{joinan.startTime} - {joinan.endTime}</p>
                                </Card>
                                <Card className="p-4 text-center">
                                    <Users className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                                    <p className="text-sm text-[#8A95A5]">Slot Tersedia</p>
                                    <p className="font-bold text-[#1A2744]">{slotsRemaining} dari {joinan.maxSlots}</p>
                                </Card>
                            </motion.div>

                            {/* Organizer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="p-5">
                                    <h3 className="font-bold text-[#1A2744] mb-4">Penyelenggara</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center">
                                            <Crown className="w-6 h-6 text-[#344D7A]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1A2744]">{joinan.organizer.name}</p>
                                            <p className="text-sm text-[#8A95A5]">Host</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Participants */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="p-5">
                                    <h3 className="font-bold text-[#1A2744] mb-4">
                                        Peserta ({joinan.filledSlots}/{joinan.maxSlots})
                                    </h3>

                                    {joinan.participants && joinan.participants.length > 0 ? (
                                        <div className="space-y-3">
                                            {joinan.participants.map((p, idx) => (
                                                <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#344D7A] to-[#4A6699] flex items-center justify-center text-white font-bold">
                                                        {p.user.name.charAt(0)}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-[#1A2744]">{p.user.name}</p>
                                                        <p className="text-xs text-[#8A95A5]">Bergabung</p>
                                                    </div>
                                                    {p.status === "confirmed" && (
                                                        <Check className="w-5 h-5 text-emerald-500" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Users className="w-12 h-12 text-[#E4E8ED] mx-auto mb-3" />
                                            <p className="text-[#8A95A5]">Belum ada peserta</p>
                                            <p className="text-sm text-[#8A95A5]">Jadilah yang pertama!</p>
                                        </div>
                                    )}

                                    {/* Empty slots visualization */}
                                    {slotsRemaining > 0 && (
                                        <div className="mt-4 pt-4 border-t border-[#E4E8ED]">
                                            <p className="text-sm text-[#8A95A5] mb-3">Slot kosong:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from({ length: Math.min(slotsRemaining, 6) }).map((_, i) => (
                                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-dashed border-[#E4E8ED] flex items-center justify-center">
                                                        <span className="text-[#8A95A5] text-lg">?</span>
                                                    </div>
                                                ))}
                                                {slotsRemaining > 6 && (
                                                    <div className="w-10 h-10 rounded-full bg-[#F7F8FA] flex items-center justify-center">
                                                        <span className="text-[#8A95A5] text-sm font-medium">+{slotsRemaining - 6}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>

                            {/* Venue Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Card className="p-5">
                                    <h3 className="font-bold text-[#1A2744] mb-4">Detail Venue</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-[#F5B800] mt-0.5" />
                                            <div>
                                                <p className="font-medium text-[#1A2744]">{joinan.venue.name}</p>
                                                <p className="text-sm text-[#8A95A5]">{joinan.venue.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href={`/venues/${joinan.venue.id}`}>
                                        <Button variant="outline" className="w-full mt-4">
                                            Lihat Detail Venue
                                        </Button>
                                    </Link>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Sidebar - Booking Card */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="sticky top-24"
                            >
                                <Card className="p-6">
                                    <div className="text-center mb-6">
                                        <p className="text-[#8A95A5] text-sm mb-1">Biaya per orang</p>
                                        <p className="text-3xl font-bold text-[#344D7A]">
                                            {formatCurrency(joinan.pricePerSlot)}
                                        </p>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-[#5A6A7E]">Terisi</span>
                                            <span className="font-medium text-[#1A2744]">
                                                {joinan.filledSlots}/{joinan.maxSlots} orang
                                            </span>
                                        </div>
                                        <div className="h-3 bg-[#E4E8ED] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${isFull ? "bg-red-500" : "bg-gradient-to-r from-[#F5B800] to-[#FFD740]"}`}
                                                style={{ width: `${(joinan.filledSlots / joinan.maxSlots) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    {isParticipant ? (
                                        <Button
                                            variant="outline"
                                            className="w-full mb-3 text-red-500 border-red-200 hover:bg-red-50"
                                            onClick={handleLeave}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Keluar dari Undangan
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="accent"
                                            className="w-full mb-3"
                                            disabled={isFull || joining}
                                            onClick={handleJoin}
                                        >
                                            {joining ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <UserPlus className="w-4 h-4 mr-2" />
                                            )}
                                            {isFull ? "Slot Penuh" : "Gabung Sekarang"}
                                        </Button>
                                    )}

                                    {/* Share */}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={copyInviteLink}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2 text-emerald-500" />
                                                Link Disalin!
                                            </>
                                        ) : (
                                            <>
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Bagikan Undangan
                                            </>
                                        )}
                                    </Button>

                                    {/* Invite Code */}
                                    <div className="mt-6 p-4 bg-[#F7F8FA] rounded-xl">
                                        <p className="text-xs text-[#8A95A5] mb-1 text-center">Kode Undangan</p>
                                        <div className="flex items-center justify-center gap-2">
                                            <code className="text-lg font-mono font-bold text-[#344D7A]">
                                                {inviteCode}
                                            </code>
                                            <button
                                                onClick={copyInviteLink}
                                                className="p-1.5 rounded-lg hover:bg-[#E4E8ED] transition-colors"
                                            >
                                                <Copy className="w-4 h-4 text-[#8A95A5]" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
