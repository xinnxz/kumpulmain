"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X, Loader2, SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VenueCard } from "@/components/features/venue-card";
import { Button } from "@/components/ui/button";
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
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Header */}
            <section className="pt-24 pb-8 bg-gradient-to-b from-white to-[#F7F8FA]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4">
                            🏟️ Temukan Venue
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2744] mb-3">
                            Cari Venue Olahraga
                        </h1>
                        <p className="text-[#5A6A7E] max-w-lg mx-auto">
                            Pilih venue terbaik di kotamu. Booking mudah, main langsung!
                        </p>
                    </motion.div>

                    {/* Search & Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg shadow-[#344D7A]/5 p-4 border border-[#E4E8ED]"
                    >
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5]" />
                                <input
                                    type="text"
                                    placeholder="Cari nama venue..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:bg-white outline-none transition-all"
                                />
                            </div>

                            {/* Divider */}
                            <div className="hidden lg:block w-px bg-[#E4E8ED]" />

                            {/* City Filter */}
                            <div className="relative min-w-[180px]">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5B800]" />
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] focus:border-[#F5B800] focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="">Semua Kita</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="relative min-w-[180px]">
                                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#344D7A]" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F7F8FA] border border-transparent text-[#1A2744] focus:border-[#F5B800] focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="">Semua Jenis</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Search Button */}
                            <Button variant="accent" className="h-12 px-8">
                                <Search className="h-5 w-5 mr-2" />
                                Cari
                            </Button>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <div className="flex items-center flex-wrap gap-2 mt-4 pt-4 border-t border-[#E4E8ED]">
                                <span className="text-[#5A6A7E] text-sm">Filter aktif:</span>
                                {search && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#344D7A]/10 text-[#344D7A] text-sm">
                                        "{search}"
                                        <button onClick={() => setSearch("")} className="ml-2"><X className="h-3 w-3" /></button>
                                    </span>
                                )}
                                {selectedCity && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm">
                                        {selectedCity}
                                        <button onClick={() => setSelectedCity("")} className="ml-2"><X className="h-3 w-3" /></button>
                                    </span>
                                )}
                                {selectedType && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#344D7A]/10 text-[#344D7A] text-sm">
                                        {selectedType}
                                        <button onClick={() => setSelectedType("")} className="ml-2"><X className="h-3 w-3" /></button>
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="text-[#344D7A] text-sm font-medium hover:underline ml-2"
                                >
                                    Reset semua
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Results */}
            <section className="pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-[#5A6A7E]">
                            {loading ? "Memuat..." : `Menampilkan ${venues.length} venue`}
                        </p>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <Loader2 className="h-10 w-10 text-[#F5B800] animate-spin mx-auto mb-4" />
                                <p className="text-[#5A6A7E]">Mencari venue...</p>
                            </div>
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
                        <div className="text-center py-20 bg-white rounded-2xl border border-[#E4E8ED]">
                            <div className="w-20 h-20 rounded-full bg-[#F7F8FA] flex items-center justify-center mx-auto mb-6">
                                <MapPin className="h-10 w-10 text-[#8A95A5]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1A2744] mb-2">Tidak ada venue ditemukan</h3>
                            <p className="text-[#5A6A7E] mb-6">Coba ubah filter atau kata kunci pencarian</p>
                            <Button variant="accent" onClick={clearFilters}>Reset Filter</Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
