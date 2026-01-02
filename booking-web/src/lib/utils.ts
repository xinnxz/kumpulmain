import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}

export function formatTime(time: string): string {
    return time;
}

export function generateInviteLink(code: string): string {
    return `https://kumpulmain.id/join/${code}`;
}

/**
 * Generate URL-friendly slug from venue name and city
 * Example: "Futsal Arena Jakarta" + "Jakarta" => "futsal-arena-jakarta"
 */
export function generateSlug(name: string, city?: string): string {
    const text = city ? `${name} ${city}` : name;
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-')          // Replace spaces with hyphens
        .replace(/-+/g, '-')           // Replace multiple hyphens with single
        .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
}

/**
 * Get venue URL using slug only for clean, SEO-friendly URLs
 * Format: /venues/{slug}
 * Backend supports lookup by slug directly
 */
export function getVenueUrl(venue: { name: string; city?: string | null; slug?: string }): string {
    return `/venues/${venue.slug || generateSlug(venue.name, venue.city || undefined)}`;
}

