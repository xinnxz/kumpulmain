"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search, Eye, CheckCircle, XCircle, MapPin, Star } from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";
import { formatCurrency } from "@/lib/utils";

const mockVenues = [
    { id: "1", name: "Futsal Arena Jakarta", owner: "Ahmad", city: "Jakarta", type: "futsal", price: 150000, status: "active", rating: 4.8 },
    { id: "2", name: "Badminton Center Bandung", owner: "Diana", city: "Bandung", type: "badminton", price: 80000, status: "pending", rating: 0 },
    { id: "3", name: "Basketball Court Bogor", owner: "Budi", city: "Bogor", type: "basketball", price: 120000, status: "active", rating: 4.5 },
    { id: "4", name: "Tennis Center Surabaya", owner: "Charlie", city: "Surabaya", type: "tennis", price: 100000, status: "rejected", rating: 0 },
];

function VenuesContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const statusConfig = {
        active: { label: "Aktif", color: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700", border: isDark ? "border-emerald-500/30" : "border-emerald-200" },
        pending: { label: "Menunggu", color: isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700", border: isDark ? "border-amber-500/30" : "border-amber-200" },
        rejected: { label: "Ditolak", color: isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700", border: isDark ? "border-red-500/30" : "border-red-200" },
    };

    const filteredVenues = mockVenues.filter(venue => {
        const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || venue.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                <h1 className={`text-3xl font-bold ${styles.textPrimary} flex items-center gap-3`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    Manajemen Venue
                </h1>
                <p className={`${styles.textMuted} mt-2`}>{mockVenues.length} venue terdaftar</p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${styles.textDimmed}`} />
                    <input type="text" placeholder="Cari venue..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none transition-all`} />
                </div>
                <div className="flex gap-2">
                    {["all", "active", "pending", "rejected"].map(status => (
                        <button key={status} onClick={() => setStatusFilter(status)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${statusFilter === status ? styles.buttonActive : styles.buttonInactive}`}>
                            {status === "all" ? "Semua" : statusConfig[status as keyof typeof statusConfig]?.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredVenues.map((venue, i) => {
                    const config = statusConfig[venue.status as keyof typeof statusConfig];
                    return (
                        <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            whileHover={{ y: -4 }}
                            className={`${styles.cardBg} border ${config?.border} rounded-2xl overflow-hidden group ${styles.cardHover} transition-all`}
                        >
                            <div className={`aspect-video flex items-center justify-center relative ${isDark ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20" : "bg-gradient-to-br from-purple-100 to-pink-100"}`}>
                                <Building2 className={`w-16 h-16 ${isDark ? "text-white/20" : "text-purple-300"}`} />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${config?.color}`}>{config?.label}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className={`font-bold ${styles.textPrimary} mb-1 group-hover:text-purple-500 transition-colors`}>{venue.name}</h3>
                                <p className={`text-sm ${styles.textDimmed} mb-3`}>oleh {venue.owner}</p>
                                <div className={`flex items-center gap-3 text-sm ${styles.textMuted} mb-3`}>
                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{venue.city}</span>
                                    {venue.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{venue.rating}</span>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className={`font-bold ${isDark ? "text-purple-400" : "text-purple-600"}`}>{formatCurrency(venue.price)}/jam</p>
                                    <div className="flex gap-2">
                                        <button className={`p-2 rounded-lg ${isDark ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}><Eye className="w-4 h-4" /></button>
                                        {venue.status === "pending" && (
                                            <>
                                                <button className={`p-2 rounded-lg ${isDark ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`}><CheckCircle className="w-4 h-4" /></button>
                                                <button className={`p-2 rounded-lg ${isDark ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-red-100 text-red-600 hover:bg-red-200"}`}><XCircle className="w-4 h-4" /></button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

export default function AdminVenuesPage() {
    return (
        <AdminLayout>
            <VenuesContent />
        </AdminLayout>
    );
}
