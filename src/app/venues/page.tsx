"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X, Loader2, SlidersHorizontal } from "lucide-react";
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
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <section className="pt-20 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Cari Venue</h1>
                        <p className="text-gray-500">Temukan venue olahraga terbaik di kotamu</p>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama venue..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#A30D2D] focus:ring-1 focus:ring-[#A30D2D] outline-none transition-all"
                            />
                        </div>

                        {/* City Filter */}
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:border-[#A30D2D] outline-none cursor-pointer min-w-[150px]"
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
                            className="h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 focus:border-[#A30D2D] outline-none cursor-pointer min-w-[150px]"
                        >
                            <option value="">Semua Jenis</option>
                            {types.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        {hasActiveFilters && (
                            <Button variant="ghost" onClick={clearFilters} className="h-12">
                                <X className="h-4 w-4 mr-1" />
                                Reset
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600 text-sm">
                            {loading ? "Memuat..." : `Menampilkan ${venues.length} venue`}
                        </p>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 text-[#A30D2D] animate-spin" />
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
                        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada venue ditemukan</h3>
                            <p className="text-gray-500 mb-6">Coba ubah filter atau kata kunci pencarian</p>
                            <Button onClick={clearFilters}>Reset Filter</Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
