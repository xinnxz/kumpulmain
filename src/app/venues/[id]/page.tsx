"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin, Clock, Users, Star, ChevronLeft, Calendar, Check,
    Loader2, Share2, Heart, Phone, MessageCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { venuesApi, bookingsApi } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Venue, TimeSlot } from "@/types";

export default function VenueDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const venueId = params.id as string;

    const [venue, setVenue] = useState<Venue | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [isJoinable, setIsJoinable] = useState(false);
    const [maxSlots, setMaxSlots] = useState(2);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        fetchVenue();
    }, [venueId]);

    useEffect(() => {
        if (venue) {
            fetchAvailability();
        }
    }, [venue, selectedDate]);

    const fetchVenue = async () => {
        try {
            const res = await venuesApi.getById(venueId);
            setVenue(res.data);
        } catch (error) {
            console.error("Error fetching venue:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailability = async () => {
        try {
            const res = await venuesApi.getAvailability(venueId, selectedDate);
            setSlots(res.data.slots || []);
        } catch (error) {
            console.error("Error fetching availability:", error);
        }
    };

    const toggleSlot = (slot: string) => {
        if (selectedSlots.includes(slot)) {
            setSelectedSlots(selectedSlots.filter((s) => s !== slot));
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    const handleBooking = async () => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }

        if (selectedSlots.length === 0) return;

        setBookingLoading(true);
        try {
            // Get start and end time from selected slots
            const sortedSlots = selectedSlots.sort();
            const startTime = sortedSlots[0];
            const endTime = sortedSlots[sortedSlots.length - 1].replace(":00", ":00");
            // Calculate end time properly
            const lastHour = parseInt(sortedSlots[sortedSlots.length - 1].split(":")[0]) + 1;
            const endTimeFormatted = `${lastHour.toString().padStart(2, "0")}:00`;

            const res = await bookingsApi.create({
                venueId,
                date: selectedDate,
                startTime,
                endTime: endTimeFormatted,
                isJoinable,
                maxSlots: isJoinable ? maxSlots : 1,
                title: isJoinable ? `Main Bareng di ${venue?.name}` : undefined,
            });

            router.push(`/bookings/${res.data.booking.id}`);
        } catch (error: any) {
            alert(error.response?.data?.message || "Booking gagal");
        } finally {
            setBookingLoading(false);
        }
    };

    const totalPrice = venue ? selectedSlots.length * venue.pricePerHour : 0;

    // Generate dates for date picker
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toISOString().split("T")[0];
    });

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
            </main>
        );
    }

    if (!venue) {
        return (
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl text-white mb-4">Venue tidak ditemukan</h2>
                    <Link href="/venues">
                        <Button>Kembali</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            <div className="pt-20">
                {/* Hero Image */}
                <div className="relative h-64 sm:h-80 lg:h-96">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${venue.images?.[0] || "https://placehold.co/1200x600/1a1a2e/ffffff?text=Venue"})`
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                    {/* Back button */}
                    <Link
                        href="/venues"
                        className="absolute top-4 left-4 flex items-center px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-sm hover:bg-slate-800 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Kembali
                    </Link>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                        <button className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-slate-800">
                            <Share2 className="h-5 w-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-slate-800">
                            <Heart className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Card>
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div>
                                            {venue.venueType && (
                                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase mb-2">
                                                    {venue.venueType}
                                                </span>
                                            )}
                                            <h1 className="text-2xl sm:text-3xl font-bold text-white">{venue.name}</h1>
                                        </div>
                                        <div className="flex items-center space-x-1 text-yellow-400">
                                            <Star className="h-5 w-5 fill-yellow-400" />
                                            <span className="font-bold">4.8</span>
                                            <span className="text-slate-400 text-sm">(128 reviews)</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
                                        <span className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1.5 text-emerald-500" />
                                            {venue.address}
                                        </span>
                                        <span className="flex items-center">
                                            <Users className="h-4 w-4 mr-1.5 text-emerald-500" />
                                            Max {venue.capacity} orang
                                        </span>
                                    </div>

                                    {venue.description && (
                                        <p className="mt-4 text-slate-400 leading-relaxed">
                                            {venue.description}
                                        </p>
                                    )}

                                    {/* Facilities */}
                                    {venue.facilities && venue.facilities.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-slate-800">
                                            <h3 className="text-white font-semibold mb-3">Fasilitas</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {venue.facilities.map((f) => (
                                                    <span key={f} className="flex items-center px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-sm">
                                                        <Check className="h-4 w-4 mr-1.5 text-emerald-500" />
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>

                            {/* Schedule */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card>
                                    <h3 className="text-lg font-semibold text-white mb-4">Jadwal Tersedia</h3>

                                    {/* Date Picker */}
                                    <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-2 px-2">
                                        {dates.map((date) => {
                                            const dateObj = new Date(date);
                                            const isSelected = date === selectedDate;
                                            return (
                                                <button
                                                    key={date}
                                                    onClick={() => setSelectedDate(date)}
                                                    className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all ${isSelected
                                                            ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                                                            : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                                        }`}
                                                >
                                                    <div className="text-xs font-medium">
                                                        {dateObj.toLocaleDateString("id-ID", { weekday: "short" })}
                                                    </div>
                                                    <div className="text-lg font-bold">{dateObj.getDate()}</div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Time Slots */}
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                        {slots.map((slot) => {
                                            const isSelected = selectedSlots.includes(slot.start);
                                            const isDisabled = !slot.available;
                                            return (
                                                <button
                                                    key={slot.start}
                                                    onClick={() => !isDisabled && toggleSlot(slot.start)}
                                                    disabled={isDisabled}
                                                    className={`py-3 rounded-xl text-sm font-medium transition-all ${isDisabled
                                                            ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
                                                            : isSelected
                                                                ? "bg-emerald-500 text-white"
                                                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                        }`}
                                                >
                                                    {slot.start}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {slots.length === 0 && (
                                        <p className="text-slate-500 text-center py-8">
                                            Venue tutup pada tanggal ini
                                        </p>
                                    )}
                                </Card>
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
                                <Card variant="gradient">
                                    <div className="text-center mb-6">
                                        <span className="text-emerald-400 text-3xl font-bold">
                                            {formatCurrency(venue.pricePerHour)}
                                        </span>
                                        <span className="text-slate-400">/jam</span>
                                    </div>

                                    {selectedSlots.length > 0 && (
                                        <div className="space-y-3 mb-6 p-4 rounded-xl bg-slate-800/50">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">{selectedSlots.length} jam dipilih</span>
                                                <span className="text-white">{formatCurrency(totalPrice)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Joinan Toggle */}
                                    <div className="mb-6 p-4 rounded-xl bg-slate-800/50">
                                        <label className="flex items-center justify-between cursor-pointer">
                                            <div>
                                                <p className="text-white font-medium">Buka untuk Joinan</p>
                                                <p className="text-slate-400 text-xs">Ajak orang lain patungan</p>
                                            </div>
                                            <button
                                                onClick={() => setIsJoinable(!isJoinable)}
                                                className={`w-12 h-6 rounded-full transition-colors ${isJoinable ? "bg-emerald-500" : "bg-slate-700"
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isJoinable ? "translate-x-6" : "translate-x-0.5"
                                                    }`} />
                                            </button>
                                        </label>

                                        {isJoinable && (
                                            <div className="mt-4">
                                                <label className="text-sm text-slate-400 mb-2 block">
                                                    Jumlah slot peserta
                                                </label>
                                                <select
                                                    value={maxSlots}
                                                    onChange={(e) => setMaxSlots(parseInt(e.target.value))}
                                                    className="w-full h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                                                >
                                                    {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                                                        <option key={n} value={n}>{n} orang</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        disabled={selectedSlots.length === 0}
                                        isLoading={bookingLoading}
                                        onClick={handleBooking}
                                    >
                                        {isAuthenticated ? "Booking Sekarang" : "Login untuk Booking"}
                                    </Button>

                                    <p className="text-center text-slate-500 text-xs mt-4">
                                        Pembayaran aman via Midtrans
                                    </p>
                                </Card>

                                {/* Contact */}
                                {venue.manager && (
                                    <Card className="mt-4">
                                        <h4 className="text-white font-semibold mb-3">Kontak Pengelola</h4>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                <span className="text-emerald-400 font-semibold">
                                                    {venue.manager.name?.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-medium">{venue.manager.name}</p>
                                                <p className="text-slate-400 text-xs">Pengelola</p>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
