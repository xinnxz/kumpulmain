"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X, Loader2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VenueCard } from "@/components/features/venue-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { venuesApi } from "@/lib/api";
import type { Venue } from "@/types";

export default function VenuesPage() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [cities, setCities] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchVenues();
        fetchFilters();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchVenues();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, selectedCity, selectedType]);

    const fetchVenues = async () => {
        try {
            setLoading(true);
            const params: Record<string, string> = {};
            if (search) params.search = search;
            if (selectedCity) params.city = selectedCity;
            if (selectedType) params.venueType = selectedType;

            const res = await venuesApi.getAll(params);
            setVenues(res.data.data);
        } catch (error) {
            console.error("Error fetching venues:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilters = async () => {
        try {
            const [citiesRes, typesRes] = await Promise.all([
                venuesApi.getCities(),
                venuesApi.getTypes(),
            ]);
            setCities(citiesRes.data);
            setTypes(typesRes.data);
        } catch (error) {
            console.error("Error fetching filters:", error);
        }
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedCity("");
        setSelectedType("");
    };

    const hasActiveFilters = search || selectedCity || selectedType;

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
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Temukan Lapangan{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                Favoritmu
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Cari dan booking lapangan untuk berbagai olahraga di kotamu
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-8 max-w-2xl mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Cari nama lapangan atau alamat..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 md:hidden"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-5 w-5" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`mt-6 flex flex-wrap gap-3 justify-center ${showFilters ? "block" : "hidden md:flex"}`}
                    >
                        {/* City Filter */}
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="h-10 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:border-emerald-500 outline-none transition-all cursor-pointer"
                        >
                            <option value="">Semua Kota</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="h-10 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:border-emerald-500 outline-none transition-all cursor-pointer"
                        >
                            <option value="">Semua Jenis</option>
                            {types.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                <X className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Results */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-slate-400">
                            {loading ? "Memuat..." : `${venues.length} lapangan ditemukan`}
                        </p>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                        </div>
                    ) : venues.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {venues.map((venue, index) => (
                                <motion.div
                                    key={venue.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <VenueCard venue={venue} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <MapPin className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Tidak ada lapangan ditemukan</h3>
                            <p className="text-slate-400 mb-6">Coba ubah filter atau kata kunci pencarian</p>
                            <Button onClick={clearFilters}>Reset Filter</Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
