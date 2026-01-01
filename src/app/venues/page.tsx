"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, X, Loader2, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { VenueCard } from "@/components/features/venue-card";
import { FAQSection } from "@/components/features/faq-section";
import { Button } from "@/components/ui/button";
import { venuesApi } from "@/lib/api";
import type { Venue } from "@/types";

const ITEMS_PER_PAGE = 12;

export default function VenuesPage() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [cities, setCities] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchVenues();
        fetchFilters();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchVenues();
            setCurrentPage(1); // Reset to page 1 on filter change
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
        setCurrentPage(1);
    };

    const hasActiveFilters = search || selectedCity || selectedType;

    // Pagination logic
    const totalPages = Math.ceil(venues.length / ITEMS_PER_PAGE);
    const paginatedVenues = venues.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 400, behavior: "smooth" });
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            {/* Hero Banner */}
            <section className="pt-20 relative overflow-hidden">
                <div className="bg-gradient-to-br from-[#344D7A] via-[#3D5A8A] to-[#2A3D5F] py-16 relative">
                    {/* Pattern Overlay */}
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />

                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-[#F5B800]/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F5B800]/10 rounded-full blur-3xl" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/20 text-[#F5B800] text-sm font-semibold mb-4 backdrop-blur-sm">
                                🏟️ Venue Terlengkap
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                                Booking Lapangan Online
                                <span className="block text-[#F5B800] mt-2">Terbaik</span>
                            </h1>
                            <p className="text-white/80 text-lg max-w-2xl mx-auto">
                                Temukan dan booking lapangan olahraga favoritmu dengan mudah dan cepat
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Search Widget */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white rounded-2xl shadow-2xl shadow-[#344D7A]/10 p-6 border border-[#E4E8ED]"
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
                                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-[#F7F8FA] border-2 border-transparent text-[#1A2744] placeholder:text-[#8A95A5] focus:border-[#F5B800] focus:bg-white outline-none transition-all text-lg"
                                />
                            </div>

                            {/* City Filter */}
                            <div className="relative min-w-[200px]">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F5B800]" />
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full h-14 pl-12 pr-10 rounded-xl bg-[#F7F8FA] border-2 border-transparent text-[#1A2744] focus:border-[#F5B800] focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="">Semua Kota</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5] rotate-90 pointer-events-none" />
                            </div>

                            {/* Type Filter */}
                            <div className="relative min-w-[200px]">
                                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#344D7A]" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full h-14 pl-12 pr-10 rounded-xl bg-[#F7F8FA] border-2 border-transparent text-[#1A2744] focus:border-[#F5B800] focus:bg-white outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="">Semua Olahraga</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8A95A5] rotate-90 pointer-events-none" />
                            </div>

                            {/* Search Button */}
                            <Button variant="accent" className="h-14 px-10 text-lg font-semibold shadow-lg shadow-[#F5B800]/30">
                                <Search className="h-5 w-5 mr-2" />
                                Cari
                            </Button>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <div className="flex items-center flex-wrap gap-2 mt-4 pt-4 border-t border-[#E4E8ED]">
                                <span className="text-[#5A6A7E] text-sm">Filter aktif:</span>
                                {search && (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#344D7A]/10 text-[#344D7A] text-sm font-medium">
                                        "{search}"
                                        <button onClick={() => setSearch("")} className="ml-2 hover:bg-[#344D7A]/10 rounded-full p-0.5"><X className="h-3 w-3" /></button>
                                    </span>
                                )}
                                {selectedCity && (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-medium">
                                        <MapPin className="h-3 w-3 mr-1" />
                                        {selectedCity}
                                        <button onClick={() => setSelectedCity("")} className="ml-2 hover:bg-[#F5B800]/10 rounded-full p-0.5"><X className="h-3 w-3" /></button>
                                    </span>
                                )}
                                {selectedType && (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#344D7A]/10 text-[#344D7A] text-sm font-medium">
                                        {selectedType}
                                        <button onClick={() => setSelectedType("")} className="ml-2 hover:bg-[#344D7A]/10 rounded-full p-0.5"><X className="h-3 w-3" /></button>
                                    </span>
                                )}
                                <button
                                    onClick={clearFilters}
                                    className="text-[#344D7A] text-sm font-semibold hover:underline ml-2"
                                >
                                    Reset semua
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Results */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-[#1A2744]">
                                {loading ? "Memuat..." : `${venues.length} Venue Tersedia`}
                            </h2>
                            {!loading && totalPages > 1 && (
                                <p className="text-[#5A6A7E] text-sm mt-1">
                                    Halaman {currentPage} dari {totalPages}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <Loader2 className="h-8 w-8 text-[#344D7A] animate-spin" />
                                </div>
                                <p className="text-[#5A6A7E] font-medium">Mencari venue...</p>
                            </div>
                        </div>
                    ) : paginatedVenues.length > 0 ? (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {paginatedVenues.map((venue, index) => (
                                    <motion.div
                                        key={venue.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <VenueCard venue={venue} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center mt-12 gap-2">
                                    {/* Prev Button */}
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentPage === 1
                                                ? "bg-[#F7F8FA] text-[#8A95A5] cursor-not-allowed"
                                                : "bg-white text-[#344D7A] hover:bg-[#344D7A] hover:text-white shadow-sm border border-[#E4E8ED]"
                                            }`}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>

                                    {/* Page Numbers */}
                                    {getPageNumbers().map((page, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof page === "number" && goToPage(page)}
                                            disabled={page === "..."}
                                            className={`min-w-[40px] h-10 px-3 rounded-xl font-medium transition-all ${page === currentPage
                                                    ? "bg-[#F5B800] text-[#344D7A] shadow-lg shadow-[#F5B800]/30"
                                                    : page === "..."
                                                        ? "text-[#8A95A5] cursor-default"
                                                        : "bg-white text-[#5A6A7E] hover:bg-[#344D7A] hover:text-white shadow-sm border border-[#E4E8ED]"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentPage === totalPages
                                                ? "bg-[#F7F8FA] text-[#8A95A5] cursor-not-allowed"
                                                : "bg-white text-[#344D7A] hover:bg-[#344D7A] hover:text-white shadow-sm border border-[#E4E8ED]"
                                            }`}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-[#E4E8ED]">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F5B800]/20 to-[#FFD740]/20 flex items-center justify-center mx-auto mb-6">
                                <MapPin className="h-10 w-10 text-[#F5B800]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1A2744] mb-2">Tidak ada venue ditemukan</h3>
                            <p className="text-[#5A6A7E] mb-6">Coba ubah filter atau kata kunci pencarian</p>
                            <Button variant="accent" onClick={clearFilters}>Reset Filter</Button>
                        </div>
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            <Footer />
        </main>
    );
}
