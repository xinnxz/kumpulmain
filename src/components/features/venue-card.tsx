"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Star, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Venue } from "@/types";

interface VenueCardProps {
    venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
    const imageUrl = venue.images?.[0] || "https://placehold.co/400x300/1a1a2e/ffffff?text=Venue";

    return (
        <Link href={`/venues/${venue.id}`}>
            <Card hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="relative aspect-[4/3] -m-6 mb-4 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    {/* Badge */}
                    {venue.venueType && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-semibold uppercase">
                                {venue.venueType}
                            </span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="absolute bottom-4 right-4">
                        <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-sm text-emerald-400 font-bold text-sm">
                            {formatCurrency(venue.pricePerHour)}/jam
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                        {venue.name}
                    </h3>

                    <div className="flex items-center text-slate-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1.5 text-emerald-500" />
                        <span className="line-clamp-1">{venue.city || venue.address}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                        <div className="flex items-center text-slate-400 text-sm">
                            <Users className="h-4 w-4 mr-1.5" />
                            <span>Max {venue.capacity}</span>
                        </div>

                        <div className="flex items-center text-yellow-400 text-sm">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400" />
                            <span className="font-semibold">4.8</span>
                        </div>
                    </div>

                    {/* Facilities preview */}
                    {venue.facilities && venue.facilities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {venue.facilities.slice(0, 3).map((facility) => (
                                <span
                                    key={facility}
                                    className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-xs"
                                >
                                    {facility}
                                </span>
                            ))}
                            {venue.facilities.length > 3 && (
                                <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-500 text-xs">
                                    +{venue.facilities.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </Link>
    );
}
