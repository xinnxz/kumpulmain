"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Users, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Venue } from "@/types";

// Sport badge styles with gradients
const sportBadgeStyles: Record<string, string> = {
    futsal: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
    badminton: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    basketball: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
    tennis: "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
    "mini soccer": "bg-gradient-to-r from-teal-500 to-teal-600 text-white",
    minisoccer: "bg-gradient-to-r from-teal-500 to-teal-600 text-white",
    default: "bg-gradient-to-r from-[#344D7A] to-[#4A6699] text-white",
};

// Venue type images mapping
const venueTypeImages: Record<string, string> = {
    futsal: "/images/venue-futsal.png",
    badminton: "/images/venue-badminton.png",
    basketball: "/images/venue-basketball.png",
    tennis: "/images/venue-tennis.png",
    "mini soccer": "/images/venue-minisoccer.png",
    minisoccer: "/images/venue-minisoccer.png",
};

// Helper to capitalize sport type name
function capitalizeType(type: string): string {
    return type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

interface VenueCardProps {
    venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
    const sportType = venue.venueType?.toLowerCase() || "default";
    const imageUrl = venue.images?.[0] || venueTypeImages[sportType] || "/images/venue-futsal.png";
    const badgeStyle = sportBadgeStyles[sportType] || sportBadgeStyles.default;

    return (
        <Link href={`/venues/${venue.id}`}>
            <Card hover variant="elevated" className="overflow-hidden h-full group">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={venue.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Sport Badge */}
                    {venue.venueType && (
                        <div className="absolute top-4 left-4">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase shadow-lg ${badgeStyle}`}>
                                {capitalizeType(venue.venueType)}
                            </span>
                        </div>
                    )}

                    {/* Quick View Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                            <ArrowUpRight className="h-5 w-5 text-[#344D7A]" />
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Location */}
                    <div className="flex items-center text-[#5A6A7E] text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1.5 text-[#F5B800]" />
                        <span className="truncate">{venue.city || "Jakarta"}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-[#1A2744] text-lg line-clamp-2 leading-tight mb-3 group-hover:text-[#344D7A] transition-colors">
                        {venue.name}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-[#F5B800] fill-[#F5B800]" />
                            <span className="font-semibold text-[#1A2744]">4.8</span>
                            <span className="text-[#8A95A5]">(128)</span>
                        </div>
                        <div className="flex items-center text-[#5A6A7E]">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Max {venue.capacity}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="pt-4 border-t border-[#E4E8ED] flex items-center justify-between">
                        <div>
                            <p className="text-[#8A95A5] text-xs mb-0.5">Mulai dari</p>
                            <p className="text-xl font-bold text-[#344D7A]">
                                {formatCurrency(venue.pricePerHour)}
                                <span className="text-[#8A95A5] text-sm font-normal">/jam</span>
                            </p>
                        </div>
                        <Button variant="accent" size="sm">
                            Booking
                        </Button>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

// Featured venues section for homepage
interface FeaturedVenuesSectionProps {
    venues?: Venue[];
}

export function FeaturedVenuesSection({ venues = [] }: FeaturedVenuesSectionProps) {
    // Mock data if no venues provided
    const mockVenues: Venue[] = [
        {
            id: "1",
            managerId: "1",
            name: "Lapangan Futsal Arena Senayan",
            address: "Jl. Sudirman No. 10",
            city: "Jakarta Selatan",
            pricePerHour: 150000,
            capacity: 10,
            images: ["https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400"],
            facilities: ["Parkir", "Toilet", "Mushola"],
            venueType: "Futsal",
            isActive: true,
            createdAt: "",
        },
        {
            id: "2",
            managerId: "1",
            name: "Badminton Center Kuningan",
            address: "Jl. HR Rasuna Said",
            city: "Jakarta Selatan",
            pricePerHour: 80000,
            capacity: 4,
            images: ["https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400"],
            facilities: ["Parkir", "AC"],
            venueType: "Badminton",
            isActive: true,
            createdAt: "",
        },
        {
            id: "3",
            managerId: "1",
            name: "Basketball Court Premium",
            address: "Jl. Gatot Subroto",
            city: "Jakarta Pusat",
            pricePerHour: 200000,
            capacity: 10,
            images: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400"],
            facilities: ["Parkir", "Kantin"],
            venueType: "Basketball",
            isActive: true,
            createdAt: "",
        },
        {
            id: "4",
            managerId: "1",
            name: "Tennis Court Kemang",
            address: "Jl. Kemang Raya",
            city: "Jakarta Selatan",
            pricePerHour: 120000,
            capacity: 4,
            images: ["https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400"],
            facilities: ["Parkir", "Toilet"],
            venueType: "Tennis",
            isActive: true,
            createdAt: "",
        },
    ];

    const displayVenues = venues.length > 0 ? venues : mockVenues;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-3"
                        >
                            ✨ Venue Populer
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl font-bold text-[#1A2744]"
                        >
                            Rekomendasi Venue Terbaik
                        </motion.h2>
                    </div>
                    <Link href="/venues">
                        <Button variant="outline">
                            Lihat Semua Venue
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayVenues.slice(0, 4).map((venue, index) => (
                        <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <VenueCard venue={venue} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
