"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2, Search, Filter, Eye, CheckCircle, XCircle,
    ChevronLeft, ChevronRight, MapPin, Star, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const mockVenues = [
    { id: "1", name: "Futsal Arena Jakarta", owner: "Ahmad", city: "Jakarta", type: "futsal", price: 150000, status: "active", rating: 4.8, createdAt: "2025-01-15" },
    { id: "2", name: "Badminton Center Bandung", owner: "Diana", city: "Bandung", type: "badminton", price: 80000, status: "pending", rating: 0, createdAt: "2026-01-01" },
    { id: "3", name: "Basketball Court Bogor", owner: "Budi", city: "Bogor", type: "basketball", price: 120000, status: "active", rating: 4.5, createdAt: "2025-06-20" },
    { id: "4", name: "Tennis Center Surabaya", owner: "Charlie", city: "Surabaya", type: "tennis", price: 100000, status: "rejected", rating: 0, createdAt: "2025-12-01" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
    active: { label: "Aktif", color: "bg-green-100 text-green-700" },
    pending: { label: "Menunggu Approval", color: "bg-yellow-100 text-yellow-700" },
    rejected: { label: "Ditolak", color: "bg-red-100 text-red-700" },
};

export default function AdminVenuesPage() {
    const [venues] = useState(mockVenues);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredVenues = venues.filter(venue => {
        const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.owner.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || venue.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <main className="min-h-screen bg-[#0D1520]">
            {/* Header */}
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 text-white/70 hover:text-white">
                            <ChevronLeft className="w-5 h-5" />
                            <span>Kembali ke Dashboard</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-[#F5B800]" />
                        Manajemen Venue
                    </h1>
                    <p className="text-white/50 mt-1">{venues.length} venue terdaftar</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                            type="text"
                            placeholder="Cari nama venue atau owner..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5B800] focus:ring-0"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "active", "pending", "rejected"].map(status => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${statusFilter === status
                                        ? "bg-[#F5B800] text-[#1A2744]"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                    }`}
                            >
                                {status === "all" ? "Semua" : statusConfig[status]?.label || status}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Venues Grid */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredVenues.map((venue) => (
                            <Card key={venue.id} className="bg-white/5 border-white/10 overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center">
                                    <Building2 className="w-16 h-16 text-white/20" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-white">{venue.name}</h3>
                                            <p className="text-sm text-white/50">oleh {venue.owner}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig[venue.status]?.color}`}>
                                            {statusConfig[venue.status]?.label}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm text-white/50 mb-3">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {venue.city}
                                        </span>
                                        <span className="capitalize">{venue.type}</span>
                                        {venue.rating > 0 && (
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-[#F5B800]" />
                                                {venue.rating}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-[#F5B800]">
                                            {formatCurrency(venue.price)}/jam
                                        </p>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            {venue.status === "pending" && (
                                                <>
                                                    <button className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30">
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
