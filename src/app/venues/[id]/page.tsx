"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    MapPin, Star, Clock, Users, Calendar, ChevronLeft, ChevronRight,
    Wifi, Car, Coffee, Droplet, Wind, Loader2, Check, ArrowRight, Share2, Heart
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { venuesApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Venue } from "@/types";

const facilityIcons: Record<string, any> = {
    Wifi: Wifi,
    Parkir: Car,
    Kantin: Coffee,
    Toilet: Droplet,
    AC: Wind,
};

export default function VenueDetailPage() {
    const params = useParams();
    const venueId = params.id as string;

    const [venue, setVenue] = useState<Venue | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [isJoinan, setIsJoinan] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        fetchVenue();
    }, [venueId]);

    const fetchVenue = async () => {
        try {
            const res = await venuesApi.getById(venueId);
            setVenue(res.data);

            // Set default date to today
            const today = new Date().toISOString().split("T")[0];
            setSelectedDate(today);
        } catch (error) {
            console.error("Error fetching venue:", error);
        } finally {
            setLoading(false);
        }
    };

    // Generate time slots
    const timeSlots = [
        { time: "08:00 - 09:00", available: true },
        { time: "09:00 - 10:00", available: true },
        { time: "10:00 - 11:00", available: false },
        { time: "11:00 - 12:00", available: true },
        { time: "13:00 - 14:00", available: true },
        { time: "14:00 - 15:00", available: true },
        { time: "15:00 - 16:00", available: false },
        { time: "16:00 - 17:00", available: true },
        { time: "17:00 - 18:00", available: true },
        { time: "18:00 - 19:00", available: true },
        { time: "19:00 - 20:00", available: false },
        { time: "20:00 - 21:00", available: true },
    ];

    // Generate dates for next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            value: date.toISOString().split("T")[0],
            day: date.toLocaleDateString("id-ID", { weekday: "short" }),
            date: date.getDate(),
        };
    });

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="h-10 w-10 text-[#F5B800] animate-spin" />
                </div>
            </main>
        );
    }

    if (!venue) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                    <h1 className="text-2xl font-bold text-[#1A2744] mb-4">Venue tidak ditemukan</h1>
                    <Link href="/venues">
                        <Button variant="accent">Kembali ke Daftar Venue</Button>
                    </Link>
                </div>
            </main>
        );
    }

    const images = venue.images?.length
        ? venue.images
        : ["https://placehold.co/800x400/f7f8fa/5a6a7e?text=Venue"];

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                {/* Image Gallery */}
                <section className="relative bg-[#1A2744]">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative aspect-[21/9] overflow-hidden">
                            <motion.img
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={images[currentImageIndex]}
                                alt={venue.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/60 via-transparent to-transparent" />

                            {/* Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}

                            {/* Image Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? "w-6 bg-[#F5B800]" : "bg-white/50"}`}
                                    />
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="absolute top-4 right-4 flex space-x-2">
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                    <Share2 className="h-5 w-5" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                                    <Heart className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Header */}
                                <Card className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold uppercase mb-3">
                                                {venue.venueType || "Olahraga"}
                                            </span>
                                            <h1 className="text-2xl font-bold text-[#1A2744] mb-2">{venue.name}</h1>
                                            <div className="flex items-center text-[#5A6A7E]">
                                                <MapPin className="h-4 w-4 mr-1 text-[#F5B800]" />
                                                <span>{venue.address}, {venue.city}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center space-x-1 mb-1">
                                                <Star className="h-5 w-5 text-[#F5B800] fill-[#F5B800]" />
                                                <span className="text-lg font-bold text-[#1A2744]">4.8</span>
                                                <span className="text-[#8A95A5]">(128)</span>
                                            </div>
                                            <p className="text-[#5A6A7E] text-sm">128 ulasan</p>
                                        </div>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E4E8ED]">
                                        <div className="flex items-center space-x-2 text-[#5A6A7E]">
                                            <Users className="h-5 w-5 text-[#344D7A]" />
                                            <span>Max {venue.capacity} orang</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-[#5A6A7E]">
                                            <Clock className="h-5 w-5 text-[#344D7A]" />
                                            <span>08:00 - 22:00</span>
                                        </div>
                                    </div>
                                </Card>

                                {/* Facilities */}
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-4">Fasilitas</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {(venue.facilities || ["Parkir", "Toilet", "Wifi", "Kantin"]).map((facility) => {
                                            const Icon = facilityIcons[facility] || Check;
                                            return (
                                                <div key={facility} className="flex items-center space-x-3 p-3 rounded-xl bg-[#F7F8FA]">
                                                    <div className="w-10 h-10 rounded-lg bg-[#344D7A]/10 flex items-center justify-center">
                                                        <Icon className="h-5 w-5 text-[#344D7A]" />
                                                    </div>
                                                    <span className="text-[#1A2744] text-sm font-medium">{facility}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Card>

                                {/* Description */}
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-4">Tentang Venue</h2>
                                    <p className="text-[#5A6A7E] leading-relaxed">
                                        {venue.name} adalah venue olahraga berkualitas yang terletak di {venue.city}.
                                        Dengan kapasitas hingga {venue.capacity} orang, venue ini cocok untuk berbagai
                                        kegiatan olahraga dan rekreasi. Dilengkapi dengan fasilitas lengkap untuk
                                        kenyamanan Anda.
                                    </p>
                                </Card>
                            </div>

                            {/* Booking Widget */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <Card className="p-6 shadow-xl shadow-[#344D7A]/10 border-2 border-[#E4E8ED]">
                                        {/* Price */}
                                        <div className="mb-6">
                                            <p className="text-[#8A95A5] text-sm">Harga mulai dari</p>
                                            <p className="text-3xl font-bold text-[#344D7A]">
                                                {formatCurrency(venue.pricePerHour)}
                                                <span className="text-base font-normal text-[#8A95A5]">/jam</span>
                                            </p>
                                        </div>

                                        {/* Date Selection */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-[#1A2744] mb-3">
                                                Pilih Tanggal
                                            </label>
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {dates.map((d) => (
                                                    <button
                                                        key={d.value}
                                                        onClick={() => setSelectedDate(d.value)}
                                                        className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all ${selectedDate === d.value
                                                                ? "bg-[#344D7A] text-white"
                                                                : "bg-[#F7F8FA] text-[#5A6A7E] hover:bg-[#E4E8ED]"
                                                            }`}
                                                    >
                                                        <p className="text-xs font-medium">{d.day}</p>
                                                        <p className="text-lg font-bold">{d.date}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Time Slots */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-[#1A2744] mb-3">
                                                Pilih Jam
                                            </label>
                                            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                                                {timeSlots.map((slot) => (
                                                    <button
                                                        key={slot.time}
                                                        onClick={() => slot.available && setSelectedSlot(slot.time)}
                                                        disabled={!slot.available}
                                                        className={`p-3 rounded-xl text-sm font-medium transition-all ${selectedSlot === slot.time
                                                                ? "bg-[#F5B800] text-[#344D7A]"
                                                                : slot.available
                                                                    ? "bg-[#F7F8FA] text-[#5A6A7E] hover:bg-[#E4E8ED]"
                                                                    : "bg-[#F7F8FA] text-[#D1D9E0] cursor-not-allowed line-through"
                                                            }`}
                                                    >
                                                        {slot.time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Joinan Toggle */}
                                        <div className="mb-6 p-4 rounded-xl bg-[#F7F8FA]">
                                            <label className="flex items-center justify-between cursor-pointer">
                                                <div>
                                                    <p className="text-[#1A2744] font-semibold">Buka untuk Main Bareng?</p>
                                                    <p className="text-[#5A6A7E] text-sm">Biarkan orang lain join & patungan</p>
                                                </div>
                                                <button
                                                    onClick={() => setIsJoinan(!isJoinan)}
                                                    className={`w-14 h-8 rounded-full transition-colors ${isJoinan ? "bg-[#F5B800]" : "bg-[#E4E8ED]"}`}
                                                >
                                                    <div className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform ${isJoinan ? "translate-x-7" : "translate-x-1"}`} />
                                                </button>
                                            </label>
                                        </div>

                                        {/* Summary */}
                                        {selectedSlot && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="mb-6 p-4 rounded-xl bg-[#344D7A]/5 border border-[#344D7A]/10"
                                            >
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-[#5A6A7E]">Tanggal</span>
                                                    <span className="text-[#1A2744] font-medium">{formatDate(selectedDate)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-[#5A6A7E]">Waktu</span>
                                                    <span className="text-[#1A2744] font-medium">{selectedSlot}</span>
                                                </div>
                                                <div className="flex justify-between text-sm pt-2 border-t border-[#E4E8ED]">
                                                    <span className="text-[#1A2744] font-semibold">Total</span>
                                                    <span className="text-[#344D7A] font-bold">{formatCurrency(venue.pricePerHour)}</span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Book Button */}
                                        <Button
                                            variant="accent"
                                            size="lg"
                                            className="w-full"
                                            disabled={!selectedSlot}
                                        >
                                            {selectedSlot ? "Booking Sekarang" : "Pilih Jam Dulu"}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>

                                        <p className="text-center text-[#8A95A5] text-xs mt-4">
                                            Pembatalan gratis hingga 24 jam sebelum jadwal
                                        </p>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
