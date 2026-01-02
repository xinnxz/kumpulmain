"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Calendar, Clock, MapPin, Star, ArrowRight, Loader2, Search, Filter, UserPlus } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    venue: {
        id: string;
        name: string;
        city: string;
        venueType: string;
        images?: string[];
    };
    organizer: {
        name: string;
    };
}

export default function JoinanPage() {
    const [invitations, setInvitations] = useState<PublicInvitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchCode, setSearchCode] = useState("");
    const [selectedSport, setSelectedSport] = useState("");

    useEffect(() => {
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        try {
            const res = await invitationsApi.getPublic();
            // Handle different API response structures
            const data = res.data;
            if (Array.isArray(data)) {
                setInvitations(data);
            } else if (data && Array.isArray(data.data)) {
                setInvitations(data.data);
            } else {
                setInvitations([]);
            }
        } catch (error) {
            console.error("Error fetching invitations:", error);
            setInvitations([]);
        } finally {
            setLoading(false);
        }
    };

    const sportTypes = ["Futsal", "Badminton", "Basketball", "Tennis"];

    const filteredInvitations = invitations.filter((inv) => {
        if (selectedSport && inv.venue.venueType !== selectedSport) return false;
        return true;
    });

    const sportBadgeStyles: Record<string, string> = {
        Futsal: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
        Badminton: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
        Basketball: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
        Tennis: "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
    };

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Header */}
            <section className="pt-24 pb-8 bg-gradient-to-b from-white to-[#F7F8FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4">
                            👥 Main Bareng
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2744] mb-3">
                            Cari Teman Main
                        </h1>
                        <p className="text-[#5A6A7E] max-w-lg mx-auto">
                            Join undangan olahraga, bisa patungan biar lebih hemat!
                        </p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg shadow-[#344D7A]/5 p-4 border border-[#E4E8ED]"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search by Code */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type="text"
                                    placeholder="Punya kode undangan? Masukkan di sini..."
                                    value={searchCode}
                                    onChange={(e) => setSearchCode(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:bg-white outline-none transition-all"
                                />
                            </div>

                            {/* Sport Filter */}
                            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                                <button
                                    onClick={() => setSelectedSport("")}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${selectedSport === ""
                                        ? "bg-[#344D7A] text-white"
                                        : "bg-[#F7F8FA] text-[#5A6A7E] hover:bg-[#E4E8ED]"
                                        }`}
                                >
                                    Semua
                                </button>
                                {sportTypes.map((sport) => (
                                    <button
                                        key={sport}
                                        onClick={() => setSelectedSport(sport)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${selectedSport === sport
                                            ? "bg-[#344D7A] text-white"
                                            : "bg-[#F7F8FA] text-[#5A6A7E] hover:bg-[#E4E8ED]"
                                            }`}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </div>

                            <Button variant="accent" className="h-12 px-6">
                                <UserPlus className="h-5 w-5 mr-2" />
                                Join
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[#5A6A7E]">
                            {loading ? "Memuat..." : `${filteredInvitations.length} undangan tersedia`}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <Loader2 className="h-10 w-10 text-[#F5B800] animate-spin mx-auto mb-4" />
                                <p className="text-[#5A6A7E]">Mencari undangan...</p>
                            </div>
                        </div>
                    ) : filteredInvitations.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredInvitations.map((invitation, index) => (
                                <motion.div
                                    key={invitation.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card hover variant="elevated" className="overflow-hidden">
                                        {/* Image */}
                                        <div className="relative h-40">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${invitation.venue.images?.[0] ||
                                                        "https://placehold.co/400x200/f7f8fa/5a6a7e?text=Venue"
                                                        })`,
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/80 to-transparent" />

                                            {/* Sport Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span
                                                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase shadow-lg ${sportBadgeStyles[invitation.venue.venueType] ||
                                                        "bg-[#344D7A] text-white"
                                                        }`}
                                                >
                                                    {invitation.venue.venueType}
                                                </span>
                                            </div>

                                            {/* Slots */}
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                                <div className="flex items-center space-x-1">
                                                    <Users className="h-4 w-4 text-[#344D7A]" />
                                                    <span className="text-sm font-bold text-[#344D7A]">
                                                        {invitation.filledSlots}/{invitation.maxSlots}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Info Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                                <h3 className="font-bold text-lg line-clamp-1">{invitation.title}</h3>
                                                <div className="flex items-center text-white/80 text-sm">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {invitation.venue.name}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            {/* Organizer */}
                                            <div className="flex items-center space-x-3 mb-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center">
                                                    <span className="text-[#344D7A] font-bold text-sm">
                                                        {invitation.organizer.name.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-[#1A2744] font-semibold text-sm">
                                                        {invitation.organizer.name}
                                                    </p>
                                                    <p className="text-[#8A95A5] text-xs">Penyelenggara</p>
                                                </div>
                                            </div>

                                            {/* Schedule */}
                                            <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-[#E4E8ED]">
                                                <div className="flex items-center text-[#5A6A7E]">
                                                    <Calendar className="h-4 w-4 mr-1.5 text-[#F5B800]" />
                                                    {formatDate(invitation.date)}
                                                </div>
                                                <div className="flex items-center text-[#5A6A7E]">
                                                    <Clock className="h-4 w-4 mr-1.5 text-[#344D7A]" />
                                                    {invitation.startTime} - {invitation.endTime}
                                                </div>
                                            </div>

                                            {/* Price & Action */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-[#8A95A5] text-xs">Per orang</p>
                                                    <p className="text-xl font-bold text-[#344D7A]">
                                                        {formatCurrency(invitation.pricePerSlot)}
                                                    </p>
                                                </div>
                                                <Link href={`/joinan/${invitation.inviteCode}`}>
                                                    <Button variant="accent" size="sm">
                                                        Gabung
                                                        <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-[#E4E8ED]">
                            <div className="w-20 h-20 rounded-full bg-[#F7F8FA] flex items-center justify-center mx-auto mb-6">
                                <Users className="h-10 w-10 text-[#8A95A5]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1A2744] mb-2">Belum ada undangan</h3>
                            <p className="text-[#5A6A7E] mb-6 max-w-md mx-auto">
                                Belum ada undangan main bareng yang tersedia. Buat undanganmu sendiri!
                            </p>
                            <Link href="/venues">
                                <Button variant="accent">
                                    Booking & Buat Undangan
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
