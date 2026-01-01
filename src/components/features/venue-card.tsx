"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Venue } from "@/types";

// Sport badge colors like ayo.co.id
const sportBadgeStyles: Record<string, string> = {
    futsal: "bg-green-50 text-green-700",
    badminton: "bg-blue-50 text-blue-700",
    basketball: "bg-orange-50 text-orange-700",
    tennis: "bg-pink-50 text-pink-700",
    default: "bg-gray-50 text-gray-700",
};

interface VenueCardProps {
    venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
    const imageUrl = venue.images?.[0] || "https://placehold.co/400x300/f3f4f6/9ca3af?text=Venue";
    const sportType = venue.venueType?.toLowerCase() || "default";
    const badgeStyle = sportBadgeStyles[sportType] || sportBadgeStyles.default;

    return (
        <Link href={`/venues/${venue.id}`}>
            <Card hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={venue.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Sport Badge */}
                    {venue.venueType && (
                        <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${badgeStyle}`}>
                                {venue.venueType}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                    {/* Location */}
                    <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="truncate">{venue.city || "Jakarta"}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight">
                        {venue.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-900">4.8</span>
                        <span className="text-sm text-gray-400">(128)</span>
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-0.5">Mulai dari</p>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-lg font-bold text-gray-900">
                                {formatCurrency(venue.pricePerHour)}
                            </span>
                            <span className="text-gray-400 text-sm">/sesi</span>
                        </div>
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
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Venue Populer</h2>
                        <p className="text-gray-500 mt-1">Rekomendasi venue terbaik untuk kamu</p>
                    </div>
                    <Link href="/venues">
                        <Button variant="outline" size="sm">
                            Lihat Semua
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayVenues.slice(0, 4).map((venue, index) => (
                        <motion.div
                            key={venue.id}
                            initial={{ opacity: 0, y: 20 }}
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
