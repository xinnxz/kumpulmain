"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Heart, MapPin, Star, Clock, ArrowLeft, Trash2, Search
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

// Mock data for favorites
const mockFavorites = [
    {
        id: "1",
        name: "Futsal Arena Jakarta",
        address: "Jl. Sudirman No. 123",
        city: "Jakarta",
        pricePerHour: 150000,
        venueType: "futsal",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=250&fit=crop"
    },
    {
        id: "2",
        name: "Badminton Center Bandung",
        address: "Jl. Braga No. 45",
        city: "Bandung",
        pricePerHour: 80000,
        venueType: "badminton",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop"
    },
    {
        id: "3",
        name: "Basketball Court Bogor",
        address: "Jl. Pajajaran No. 88",
        city: "Bogor",
        pricePerHour: 120000,
        venueType: "basketball",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop"
    },
];

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState(mockFavorites);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRemoveFavorite = (id: string) => {
        setFavorites(prev => prev.filter(f => f.id !== id));
    };

    const filteredFavorites = favorites.filter(venue =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <Link
                            href="/profile"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Profil
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                            Venue Favorit
                        </h1>
                        <p className="text-[#8A95A5] mt-1">{favorites.length} venue tersimpan</p>
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                            <input
                                type="text"
                                placeholder="Cari venue favorit..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 transition-colors"
                            />
                        </div>
                    </motion.div>

                    {/* Favorites Grid */}
                    {filteredFavorites.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredFavorites.map((venue, i) => (
                                <motion.div
                                    key={venue.id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * i }}
                                >
                                    <Card hover className="overflow-hidden">
                                        <div className="relative">
                                            <img
                                                src={venue.image}
                                                alt={venue.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            <button
                                                onClick={() => handleRemoveFavorite(venue.id)}
                                                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                            >
                                                <Heart className="w-5 h-5 fill-current" />
                                            </button>
                                            <div className="absolute bottom-3 left-3">
                                                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-[#1A2744] capitalize">
                                                    {venue.venueType}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <Link href={`/venues/${venue.id}`}>
                                                <h3 className="font-bold text-lg text-[#1A2744] hover:text-[#F5B800] transition-colors line-clamp-1">
                                                    {venue.name}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-[#8A95A5] flex items-center gap-1 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                {venue.city}
                                            </p>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                                    <span className="font-semibold text-[#1A2744]">{venue.rating}</span>
                                                </div>
                                                <p className="font-bold text-[#F5B800]">
                                                    {formatCurrency(venue.pricePerHour)}
                                                    <span className="text-[#8A95A5] font-normal text-sm">/jam</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <Card className="p-12 text-center">
                                <Heart className="w-20 h-20 mx-auto text-[#8A95A5]/30 mb-4" />
                                <h3 className="text-xl font-bold text-[#1A2744] mb-2">
                                    {favorites.length === 0 ? "Belum ada favorit" : "Tidak ditemukan"}
                                </h3>
                                <p className="text-[#8A95A5] mb-6">
                                    {favorites.length === 0
                                        ? "Simpan venue favoritmu untuk akses cepat"
                                        : "Coba kata kunci lain"
                                    }
                                </p>
                                <Link href="/venues">
                                    <Button>Jelajahi Venue</Button>
                                </Link>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
