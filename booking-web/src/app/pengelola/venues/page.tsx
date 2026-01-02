"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2, Plus, Edit, Trash2, Eye, MoreVertical, MapPin,
    Star, Calendar, TrendingUp, ChevronRight, Search, Filter
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

// Mock data
const mockVenues = [
    {
        id: "1",
        name: "Lapangan Futsal A",
        address: "Jl. Sudirman No. 123, Jakarta",
        pricePerHour: 150000,
        venueType: "futsal",
        isActive: true,
        rating: 4.8,
        totalBookings: 124,
        image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=300&h=200&fit=crop"
    },
    {
        id: "2",
        name: "Lapangan Futsal B",
        address: "Jl. Sudirman No. 123, Jakarta",
        pricePerHour: 150000,
        venueType: "futsal",
        isActive: true,
        rating: 4.6,
        totalBookings: 98,
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop"
    },
];

export default function PengelolaVenuesPage() {
    const [venues] = useState(mockVenues);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                                <Building2 className="w-8 h-8 text-[#F5B800]" />
                                Venue Saya
                            </h1>
                            <p className="text-[#8A95A5] mt-1">{venues.length} venue terdaftar</p>
                        </div>
                        <Link href="/pengelola/venues/create">
                            <Button className="mt-4 md:mt-0">
                                <Plus className="w-5 h-5 mr-2" />
                                Tambah Venue Baru
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="relative max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                            <input
                                type="text"
                                placeholder="Cari venue..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 transition-colors"
                            />
                        </div>
                    </motion.div>

                    {/* Venues Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {venues.map((venue, i) => (
                            <motion.div
                                key={venue.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <Card hover className="overflow-hidden">
                                    <div className="flex">
                                        <div className="w-40 h-40 flex-shrink-0">
                                            <img
                                                src={venue.image}
                                                alt={venue.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-bold text-lg text-[#1A2744]">{venue.name}</h3>
                                                    <p className="text-sm text-[#8A95A5] flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {venue.address}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${venue.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}>
                                                    {venue.isActive ? "Aktif" : "Nonaktif"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-3 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                                    <span className="font-semibold text-[#1A2744]">{venue.rating}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-[#8A95A5]">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{venue.totalBookings} booking</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <p className="font-bold text-[#F5B800]">
                                                    {formatCurrency(venue.pricePerHour)}
                                                    <span className="text-[#8A95A5] font-normal text-sm">/jam</span>
                                                </p>
                                                <div className="flex gap-2">
                                                    <Link href={`/venues/${venue.id}`}>
                                                        <button className="p-2 rounded-lg bg-gray-100 text-[#8A95A5] hover:bg-gray-200">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/pengelola/venues/${venue.id}/edit`}>
                                                        <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {venues.length === 0 && (
                        <Card className="p-12 text-center">
                            <Building2 className="w-20 h-20 mx-auto text-[#8A95A5]/30 mb-4" />
                            <h3 className="text-xl font-bold text-[#1A2744] mb-2">Belum ada venue</h3>
                            <p className="text-[#8A95A5] mb-6">Mulai tambahkan venue pertamamu!</p>
                            <Link href="/pengelola/venues/create">
                                <Button>
                                    <Plus className="w-5 h-5 mr-2" />
                                    Tambah Venue
                                </Button>
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
