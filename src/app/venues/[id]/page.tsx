"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Star, Clock, Users, ChevronLeft, ChevronRight,
    Wifi, Car, Coffee, Droplet, Wind, Loader2, Check, ArrowRight, Share2, Heart,
    X, Calendar, RefreshCw, Shield, Phone, MessageCircle, ChevronDown,
    Sparkles, ThumbsUp, Award
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { venuesApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { getVenueImage } from "@/components/features/venue-card";
import type { Venue } from "@/types";

// Facility icons mapping
const facilityIcons: Record<string, any> = {
    Wifi: Wifi,
    WiFi: Wifi,
    Parkir: Car,
    "Parkir Luas": Car,
    Kantin: Coffee,
    Cafe: Coffee,
    Toilet: Droplet,
    "Toilet Bersih": Droplet,
    AC: Wind,
    "Ruang Ganti": Users,
    "Ruang Ganti AC": Wind,
    Shower: Droplet,
    Mushola: Sparkles,
    "Tribun Penonton": Users,
};

// Mock reviews data
const mockReviews = [
    {
        id: 1,
        name: "Ahmad Rizki",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad",
        rating: 5,
        date: "2 hari lalu",
        comment: "Lapangan sangat bersih dan terawat. Staffnya ramah dan helpful. Pasti bakal balik lagi!",
        helpful: 12,
    },
    {
        id: 2,
        name: "Dinda Sari",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dinda",
        rating: 5,
        date: "1 minggu lalu",
        comment: "Fasilitas lengkap, parkir luas. Recommended banget buat main bareng teman-teman!",
        helpful: 8,
    },
    {
        id: 3,
        name: "Budi Setiawan",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
        rating: 4,
        date: "2 minggu lalu",
        comment: "Bagus overall, cuma kadang agak ramai di weekend. Book lebih awal biar dapet slot.",
        helpful: 5,
    },
];

export default function VenueDetailPage() {
    const params = useParams();
    // Use slug directly - backend supports lookup by slug
    const venueSlug = params.id as string;

    const [venue, setVenue] = useState<Venue | null>(null);
    const [nearbyVenues, setNearbyVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [isJoinan, setIsJoinan] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
    const [showLightbox, setShowLightbox] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if (!venueSlug || fetchError) return;
        fetchVenue();
    }, [venueSlug]);

    const fetchVenue = async () => {
        try {
            setLoading(true);
            const res = await venuesApi.getById(venueSlug);
            setVenue(res.data);

            // Fetch nearby venues
            const nearbyRes = await venuesApi.getAll({
                city: res.data.city,
                take: "5"
            });
            setNearbyVenues(nearbyRes.data.data.filter((v: Venue) => v.id !== res.data.id).slice(0, 4));

            const today = new Date().toISOString().split("T")[0];
            setSelectedDate(today);
        } catch (error) {
            console.error("Error fetching venue:", error);
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    };

    // Time slots
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
            isToday: i === 0,
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

    // Generate multiple images for gallery
    const primaryImage = getVenueImage(venue.id, venue.venueType || "futsal");
    const galleryImages = [
        primaryImage,
        getVenueImage(venue.id + "1", venue.venueType || "futsal"),
        getVenueImage(venue.id + "2", venue.venueType || "futsal"),
        getVenueImage(venue.id + "3", venue.venueType || "futsal"),
    ];

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                {/* ==================== IMAGE HERO ==================== */}
                <section className="relative">
                    {/* Full-width Hero Image */}
                    <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
                        {/* Smooth Crossfade - elegant transition */}
                        <AnimatePresence mode="sync">
                            <motion.img
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                src={galleryImages[currentImageIndex]}
                                alt={venue.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Invisible Drag Layer - only captures swipe, doesn't move visually */}
                        <motion.div
                            className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 60) {
                                    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1);
                                } else if (info.offset.x < -60) {
                                    setCurrentImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0);
                                }
                                setTimeout(() => setIsDragging(false), 100);
                            }}
                            onClick={() => { if (!isDragging) setShowLightbox(true); }}
                            style={{ x: 0 }}
                        />

                        {/* Light Bottom Gradient Only - for text readability */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1A2744]/80 via-[#1A2744]/30 to-transparent" />

                        {/* Navigation Arrows - z-20 to be above drag layer */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-xl"
                        >
                            <ChevronLeft className="h-7 w-7" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-xl"
                        >
                            <ChevronRight className="h-7 w-7" />
                        </button>

                        {/* Quick Actions - z-20 to be above drag layer */}
                        <div className="absolute top-6 right-6 flex space-x-3 z-20">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(window.location.href);
                                    // Show toast notification
                                    const toast = document.createElement('div');
                                    toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#1A2744] text-white rounded-full shadow-2xl z-50 animate-fade-in flex items-center space-x-2';
                                    toast.innerHTML = '<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span>Link berhasil disalin!</span>';
                                    document.body.appendChild(toast);
                                    setTimeout(() => toast.remove(), 2000);
                                }}
                                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A2744] transition-all duration-300 shadow-xl hover:scale-110"
                            >
                                <Share2 className="h-5 w-5" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const heart = e.currentTarget;
                                    const isFilled = heart.classList.contains('is-liked');
                                    if (isFilled) {
                                        heart.classList.remove('is-liked', 'bg-red-500', 'text-white');
                                        heart.classList.add('bg-black/40', 'text-white');
                                        heart.querySelector('svg')?.classList.remove('fill-white');
                                    } else {
                                        heart.classList.add('is-liked', 'bg-red-500', 'text-white');
                                        heart.classList.remove('bg-black/40');
                                        heart.querySelector('svg')?.classList.add('fill-white');
                                        // Add heart animation
                                        heart.animate([
                                            { transform: 'scale(1)' },
                                            { transform: 'scale(1.3)' },
                                            { transform: 'scale(1)' }
                                        ], { duration: 300 });
                                    }
                                }}
                                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-red-500 transition-all duration-300 shadow-xl hover:scale-110"
                            >
                                <Heart className="h-5 w-5 transition-all" />
                            </button>
                        </div>

                        {/* Venue Badge + Counter */}
                        <div className="absolute top-6 left-6 flex items-center space-x-3">
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#F5B800] to-[#D4A000] text-[#1A2744] text-sm font-bold uppercase shadow-lg">
                                {venue.venueType || "Olahraga"}
                            </span>
                            <span className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-sm font-medium">
                                📷 {currentImageIndex + 1} / {galleryImages.length}
                            </span>
                        </div>

                        {/* Venue Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                                {venue.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 text-white/90">
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-5 w-5 text-[#F5B800]" />
                                    <span>{venue.address}, {venue.city}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Star className="h-5 w-5 text-[#F5B800] fill-[#F5B800]" />
                                    <span className="font-bold">4.8</span>
                                    <span className="text-white/60">(128 ulasan)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Elegant Thumbnail Strip */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                        <div className="flex gap-2 justify-center">
                            {galleryImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        // Determine slide direction based on clicked thumbnail position
                                        if (i > currentImageIndex) {
                                            setSlideDirection('right'); // Clicking right thumbnail, image comes from right
                                        } else if (i < currentImageIndex) {
                                            setSlideDirection('left'); // Clicking left thumbnail, image comes from left
                                        }
                                        setCurrentImageIndex(i);
                                    }}
                                    className={`relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300 ${currentImageIndex === i
                                        ? "ring-2 ring-[#F5B800] ring-offset-2 ring-offset-white scale-105 shadow-lg"
                                        : "opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${venue.name} ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {showLightbox && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                            onClick={() => setShowLightbox(false)}
                        >
                            <button
                                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                                onClick={() => setShowLightbox(false)}
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1); }}
                                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                            <img
                                src={galleryImages[currentImageIndex]}
                                alt={venue.name}
                                className="max-w-[90vw] max-h-[90vh] object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0); }}
                                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {galleryImages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                                        className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? "w-6 bg-[#F5B800]" : "bg-white/50"}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ==================== MAIN CONTENT ==================== */}
                <section className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Quick Info Bar */}
                                <Card className="p-4">
                                    <div className="flex flex-wrap gap-4 justify-between items-center">
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex items-center space-x-2 text-[#5A6A7E]">
                                                <div className="w-8 h-8 rounded-lg bg-[#344D7A]/10 flex items-center justify-center">
                                                    <Users className="h-4 w-4 text-[#344D7A]" />
                                                </div>
                                                <span>Max {venue.capacity} orang</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-[#5A6A7E]">
                                                <div className="w-8 h-8 rounded-lg bg-[#344D7A]/10 flex items-center justify-center">
                                                    <Clock className="h-4 w-4 text-[#344D7A]" />
                                                </div>
                                                <span>08:00 - 22:00</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-[#5A6A7E]">
                                                <div className="w-8 h-8 rounded-lg bg-[#344D7A]/10 flex items-center justify-center">
                                                    <Phone className="h-4 w-4 text-[#344D7A]" />
                                                </div>
                                                <span>Hubungi Pengelola</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-[#8A95A5]">Mulai dari</p>
                                            <p className="text-xl font-bold text-[#344D7A]">{formatCurrency(venue.pricePerHour)}<span className="text-sm font-normal">/jam</span></p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Facilities */}
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-4 flex items-center">
                                        <Sparkles className="h-5 w-5 mr-2 text-[#F5B800]" />
                                        Fasilitas
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {(venue.facilities || ["Parkir", "Toilet", "Wifi", "Kantin", "Ruang Ganti", "AC"]).map((facility) => {
                                            const Icon = facilityIcons[facility] || Check;
                                            return (
                                                <motion.div
                                                    key={facility}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-br from-[#F7F8FA] to-white border border-[#E4E8ED] hover:border-[#344D7A]/30 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#344D7A]/10 to-[#344D7A]/5 flex items-center justify-center">
                                                        <Icon className="h-5 w-5 text-[#344D7A]" />
                                                    </div>
                                                    <span className="text-[#1A2744] text-sm font-medium">{facility}</span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </Card>

                                {/* Description */}
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-4">Deskripsi</h2>
                                    <p className="text-[#5A6A7E] leading-relaxed">
                                        {venue.description || `${venue.name} adalah venue olahraga berkualitas yang terletak di ${venue.city}. 
                                        Dengan kapasitas hingga ${venue.capacity} orang, venue ini cocok untuk berbagai 
                                        kegiatan olahraga dan rekreasi. Dilengkapi dengan fasilitas lengkap untuk 
                                        kenyamanan Anda termasuk parkir luas, ruang ganti, dan area istirahat.`}
                                    </p>
                                </Card>

                                {/* Kebijakan Section */}
                                <Card className="p-6">
                                    <h2 className="text-lg font-bold text-[#1A2744] mb-4 flex items-center">
                                        <Shield className="h-5 w-5 mr-2 text-[#F5B800]" />
                                        Kebijakan Booking
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                                    <RefreshCw className="h-5 w-5 text-white" />
                                                </div>
                                                <h3 className="font-semibold text-emerald-800">Reschedule Gratis</h3>
                                            </div>
                                            <p className="text-emerald-700 text-sm">
                                                Reschedule gratis hingga 24 jam sebelum jadwal booking
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-white" />
                                                </div>
                                                <h3 className="font-semibold text-blue-800">Pembatalan</h3>
                                            </div>
                                            <p className="text-blue-700 text-sm">
                                                Refund 100% jika dibatalkan 48 jam sebelum jadwal
                                            </p>
                                        </div>
                                    </div>
                                </Card>

                                {/* Reviews Section */}
                                <Card className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-[#1A2744] flex items-center">
                                            <Award className="h-5 w-5 mr-2 text-[#F5B800]" />
                                            Ulasan Pengunjung
                                        </h2>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-4 w-4 text-[#F5B800] fill-[#F5B800]" />
                                                ))}
                                            </div>
                                            <span className="font-bold text-[#1A2744]">4.8</span>
                                            <span className="text-[#8A95A5] text-sm">(128 ulasan)</span>
                                        </div>
                                    </div>

                                    {/* Rating Breakdown */}
                                    <div className="grid grid-cols-5 gap-2 mb-6 p-4 rounded-xl bg-[#F7F8FA]">
                                        {[5, 4, 3, 2, 1].map((rating) => {
                                            const percentage = rating === 5 ? 75 : rating === 4 ? 18 : rating === 3 ? 5 : 2;
                                            return (
                                                <div key={rating} className="text-center">
                                                    <div className="flex items-center justify-center space-x-1 mb-1">
                                                        <span className="text-sm font-medium text-[#1A2744]">{rating}</span>
                                                        <Star className="h-3 w-3 text-[#F5B800] fill-[#F5B800]" />
                                                    </div>
                                                    <div className="h-2 rounded-full bg-[#E4E8ED] overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#F5B800] rounded-full transition-all"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-[#8A95A5] mt-1">{percentage}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Reviews List */}
                                    <div className="space-y-4">
                                        {mockReviews.slice(0, showAllReviews ? mockReviews.length : 2).map((review) => (
                                            <motion.div
                                                key={review.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 rounded-xl border border-[#E4E8ED] hover:border-[#344D7A]/20 transition-colors"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <img
                                                        src={review.avatar}
                                                        alt={review.name}
                                                        className="w-10 h-10 rounded-full bg-[#E4E8ED]"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="font-semibold text-[#1A2744]">{review.name}</h4>
                                                            <span className="text-xs text-[#8A95A5]">{review.date}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1 mb-2">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="h-3 w-3 text-[#F5B800] fill-[#F5B800]" />
                                                            ))}
                                                        </div>
                                                        <p className="text-[#5A6A7E] text-sm mb-2">{review.comment}</p>
                                                        <button className="flex items-center space-x-1 text-[#8A95A5] text-sm hover:text-[#344D7A] transition-colors">
                                                            <ThumbsUp className="h-3 w-3" />
                                                            <span>Helpful ({review.helpful})</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {mockReviews.length > 2 && (
                                        <button
                                            onClick={() => setShowAllReviews(!showAllReviews)}
                                            className="w-full mt-4 py-3 rounded-xl border border-[#E4E8ED] text-[#344D7A] font-medium hover:bg-[#F7F8FA] transition-colors flex items-center justify-center space-x-2"
                                        >
                                            <span>{showAllReviews ? "Sembunyikan" : `Lihat Semua ${mockReviews.length} Ulasan`}</span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${showAllReviews ? "rotate-180" : ""}`} />
                                        </button>
                                    )}
                                </Card>
                            </div>

                            {/* Right Column - Booking Widget */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 space-y-4">
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
                                                        <p className="text-xs font-medium">{d.isToday ? "Hari Ini" : d.day}</p>
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

                                    {/* Contact Card */}
                                    <Card className="p-4">
                                        <p className="text-sm text-[#5A6A7E] mb-3">Ada pertanyaan?</p>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" className="flex-1">
                                                <Phone className="h-4 w-4 mr-1" />
                                                Telepon
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1">
                                                <MessageCircle className="h-4 w-4 mr-1" />
                                                Chat
                                            </Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================== NEARBY VENUES ==================== */}
                {nearbyVenues.length > 0 && (
                    <section className="py-12 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-[#1A2744] mb-6 flex items-center">
                                <MapPin className="h-6 w-6 mr-2 text-[#F5B800]" />
                                Venue Terdekat di {venue.city}
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {nearbyVenues.map((nearbyVenue) => {
                                    const slug = nearbyVenue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                    return (
                                        <Link key={nearbyVenue.id} href={`/venues/${slug}-${nearbyVenue.id}`}>
                                            <Card hover className="overflow-hidden h-full group">
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <img
                                                        src={getVenueImage(nearbyVenue.id, nearbyVenue.venueType || "futsal")}
                                                        alt={nearbyVenue.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                    <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-[#344D7A] text-white text-xs font-bold uppercase">
                                                        {nearbyVenue.venueType}
                                                    </span>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-semibold text-[#1A2744] line-clamp-1 mb-1">{nearbyVenue.name}</h3>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-1">
                                                            <Star className="h-3 w-3 text-[#F5B800] fill-[#F5B800]" />
                                                            <span className="text-sm text-[#1A2744] font-medium">4.8</span>
                                                        </div>
                                                        <p className="text-sm font-bold text-[#344D7A]">
                                                            {formatCurrency(nearbyVenue.pricePerHour)}<span className="text-xs font-normal text-[#8A95A5]">/jam</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* ==================== APP CTA BANNER ==================== */}
                <section className="py-16 bg-gradient-to-b from-white to-[#F7F8FA]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A2744] via-[#344D7A] to-[#1A2744]">
                            {/* Decorative Elements */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#F5B800]/20 rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#F5B800]/10 rounded-full blur-3xl" />
                                <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                                {/* Grid Pattern */}
                                <div className="absolute inset-0 opacity-5" style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                                    backgroundSize: '50px 50px'
                                }} />
                            </div>

                            <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12 lg:p-16">
                                {/* Left Content */}
                                <div className="text-center md:text-left">
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-semibold mb-6">
                                        📱 Tersedia di iOS & Android
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                        Booking di Genggaman<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B800] to-[#FFD54F]">
                                            Kapan Saja, Dimana Saja
                                        </span>
                                    </h2>
                                    <p className="text-white/70 text-lg mb-8 max-w-md">
                                        Download aplikasi KumpulMain sekarang dan nikmati pengalaman booking lapangan yang lebih cepat dan praktis.
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                                        <div className="flex items-center space-x-2 text-white/80">
                                            <Check className="h-5 w-5 text-[#F5B800]" />
                                            <span className="text-sm">Booking Instan</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-white/80">
                                            <Check className="h-5 w-5 text-[#F5B800]" />
                                            <span className="text-sm">Promo Eksklusif</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-white/80">
                                            <Check className="h-5 w-5 text-[#F5B800]" />
                                            <span className="text-sm">Main Bareng</span>
                                        </div>
                                    </div>

                                    {/* App Store Buttons */}
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <button className="flex items-center space-x-3 px-5 py-3 bg-black rounded-xl hover:bg-gray-900 transition-all hover:scale-105 shadow-xl">
                                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                            </svg>
                                            <div className="text-left">
                                                <p className="text-xs text-white/70">Download on the</p>
                                                <p className="text-base font-semibold text-white">App Store</p>
                                            </div>
                                        </button>
                                        <button className="flex items-center space-x-3 px-5 py-3 bg-black rounded-xl hover:bg-gray-900 transition-all hover:scale-105 shadow-xl">
                                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                                                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                                            </svg>
                                            <div className="text-left">
                                                <p className="text-xs text-white/70">Get it on</p>
                                                <p className="text-base font-semibold text-white">Google Play</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Right - Phone Mockup */}
                                <div className="hidden md:flex justify-center items-center">
                                    <div className="relative">
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#F5B800]/30 to-transparent rounded-full blur-3xl scale-150" />
                                        {/* Phone Image */}
                                        <img
                                            src="/images/phone-mockup.png"
                                            alt="KumpulMain App"
                                            className="relative z-10 w-72 lg:w-80 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
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
