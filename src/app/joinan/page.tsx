"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, MapPin, Calendar, Clock, ArrowRight, Loader2, Search } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { invitationsApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Booking } from "@/types";

export default function JoinanPage() {
    const [invitations, setInvitations] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        try {
            const res = await invitationsApi.getPublic();
            setInvitations(res.data.data);
        } catch (error) {
            console.error("Error fetching invitations:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Header */}
            <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                            <Users className="h-4 w-4 text-emerald-400 mr-2" />
                            <span className="text-emerald-400 text-sm font-medium">Main Bareng</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Cari Partner{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                Main Bareng
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Join undangan orang lain dan main bareng teman baru! Bayar sesuai bagian masing-masing.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                        </div>
                    ) : invitations.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {invitations.map((inv, index) => (
                                <motion.div
                                    key={inv.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card hover className="h-full flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-white mb-1">
                                                    {inv.title || "Main Bareng"}
                                                </h3>
                                                <p className="text-slate-400 text-sm">{inv.venue?.name}</p>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                                                {inv.availableSlots} slot tersisa
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-3 mb-6 flex-1">
                                            <div className="flex items-center text-slate-400 text-sm">
                                                <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                                                <span>{inv.venue?.city || inv.venue?.address}</span>
                                            </div>
                                            <div className="flex items-center text-slate-400 text-sm">
                                                <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                                                <span>{formatDate(inv.date)}</span>
                                            </div>
                                            <div className="flex items-center text-slate-400 text-sm">
                                                <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                                                <span>{inv.startTime} - {inv.endTime}</span>
                                            </div>
                                        </div>

                                        {/* Participants */}
                                        <div className="flex items-center mb-4">
                                            <div className="flex -space-x-2">
                                                {inv.participants?.slice(0, 4).map((p, i) => (
                                                    <div
                                                        key={p.id}
                                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-medium"
                                                    >
                                                        {p.user?.name?.charAt(0) || "?"}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="ml-3 text-slate-400 text-sm">
                                                {inv.filledSlots}/{inv.maxSlots} peserta
                                            </span>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                            <div>
                                                <span className="text-emerald-400 font-bold">{formatCurrency(inv.pricePerSlot)}</span>
                                                <span className="text-slate-500 text-sm">/orang</span>
                                            </div>
                                            <Link href={`/join/${inv.inviteCode}`}>
                                                <Button size="sm">
                                                    Join
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Users className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Belum ada undangan tersedia</h3>
                            <p className="text-slate-400 mb-6">Jadilah yang pertama membuat undangan main bareng!</p>
                            <Link href="/venues">
                                <Button>Buat Undangan</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card variant="gradient" className="text-center py-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Punya kode undangan?</h3>
                        <p className="text-slate-400 mb-6">Masukkan kode untuk langsung join</p>
                        <div className="flex max-w-md mx-auto gap-3">
                            <input
                                type="text"
                                placeholder="Masukkan kode undangan"
                                className="flex-1 h-12 px-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 outline-none"
                            />
                            <Button>Join</Button>
                        </div>
                    </Card>
                </div>
            </section>

            <Footer />
        </main>
    );
}
