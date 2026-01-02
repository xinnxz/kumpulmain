"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2, Search, Eye, CheckCircle, XCircle, MapPin, Star
} from "lucide-react";
import { AdminHeader } from "@/components/layout/admin-header";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const mockVenues = [
    { id: "1", name: "Futsal Arena Jakarta", owner: "Ahmad", city: "Jakarta", type: "futsal", price: 150000, status: "active", rating: 4.8, createdAt: "2025-01-15" },
    { id: "2", name: "Badminton Center Bandung", owner: "Diana", city: "Bandung", type: "badminton", price: 80000, status: "pending", rating: 0, createdAt: "2026-01-01" },
    { id: "3", name: "Basketball Court Bogor", owner: "Budi", city: "Bogor", type: "basketball", price: 120000, status: "active", rating: 4.5, createdAt: "2025-06-20" },
    { id: "4", name: "Tennis Center Surabaya", owner: "Charlie", city: "Surabaya", type: "tennis", price: 100000, status: "rejected", rating: 0, createdAt: "2025-12-01" },
];

const statusConfig: Record<string, { label: string; color: string; borderColor: string }> = {
    active: { label: "Aktif", color: "bg-emerald-100 text-emerald-700", borderColor: "border-emerald-200" },
    pending: { label: "Menunggu", color: "bg-amber-100 text-amber-700", borderColor: "border-amber-200" },
    rejected: { label: "Ditolak", color: "bg-red-100 text-red-700", borderColor: "border-red-200" },
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
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <AdminHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        Manajemen Venue
                    </h1>
                    <p className="text-slate-500 mt-1">{venues.length} venue terdaftar</p>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Cari nama venue atau owner..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                    </div>
                    <div className="flex gap-2">
                        {["all", "active", "pending", "rejected"].map(status => (
                            <button key={status} onClick={() => setStatusFilter(status)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${statusFilter === status
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"}`}>
                                {status === "all" ? "Semua" : statusConfig[status]?.label || status}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredVenues.map((venue) => (
                            <Card key={venue.id} className={`bg-white border ${statusConfig[venue.status]?.borderColor || 'border-slate-200'} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
                                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                    <Building2 className="w-16 h-16 text-indigo-300" />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{venue.name}</h3>
                                            <p className="text-sm text-slate-500">oleh {venue.owner}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConfig[venue.status]?.color}`}>
                                            {statusConfig[venue.status]?.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{venue.city}</span>
                                        <span className="capitalize px-2 py-0.5 bg-slate-100 rounded-full">{venue.type}</span>
                                        {venue.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" />{venue.rating}</span>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-indigo-600">{formatCurrency(venue.price)}/jam</p>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600"><Eye className="w-4 h-4" /></button>
                                            {venue.status === "pending" && (
                                                <>
                                                    <button className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200"><CheckCircle className="w-4 h-4" /></button>
                                                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"><XCircle className="w-4 h-4" /></button>
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
