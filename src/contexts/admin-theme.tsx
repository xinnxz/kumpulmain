"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type Language = "id" | "en";

interface AdminThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

// Translations
const translations: Record<Language, Record<string, string>> = {
    id: {
        // Header
        "header.title": "Pusat Kontrol",
        "header.subtitle": "KumpulMain.id Admin",
        "header.lightMode": "Mode Terang",
        "header.darkMode": "Mode Gelap",
        "header.logout": "Keluar",

        // Menu
        "menu.dashboard": "Dashboard",
        "menu.users": "Pengguna",
        "menu.venues": "Venue",
        "menu.bookings": "Booking",
        "menu.payments": "Pembayaran",
        "menu.analytics": "Analitik",
        "menu.settings": "Pengaturan",

        // Dashboard
        "dashboard.welcome": "Selamat",
        "dashboard.morning": "Pagi",
        "dashboard.afternoon": "Siang",
        "dashboard.evening": "Malam",
        "dashboard.overview": "Ringkasan Dashboard",
        "dashboard.performance": "Performa platform secara keseluruhan",
        "dashboard.totalRevenue": "Total Pendapatan",
        "dashboard.thisMonth": "Bulan Ini",
        "dashboard.fromLastMonth": "dari bulan lalu",
        "dashboard.activeUsers": "Pengguna Aktif",
        "dashboard.activeVenues": "Venue Aktif",
        "dashboard.growth": "pertumbuhan",
        "dashboard.new": "baru",
        "dashboard.quickActions": "Aksi Cepat",
        "dashboard.liveActivity": "Aktivitas Langsung",
        "dashboard.todaysBookings": "Booking Hari Ini",
        "dashboard.dailyTarget": "dari target harian",
        "dashboard.performanceScore": "Skor Performa",
        "dashboard.activeCities": "Kota Aktif",

        // Users
        "users.title": "Manajemen Pengguna",
        "users.registered": "pengguna terdaftar",
        "users.search": "Cari nama atau email...",
        "users.all": "Semua",
        "users.contact": "Kontak",
        "users.role": "Role",
        "users.status": "Status",
        "users.bookings": "Booking",
        "users.actions": "Aksi",
        "users.active": "Aktif",
        "users.banned": "Diblokir",
        "users.showing": "Menampilkan",
        "users.of": "dari",

        // Venues
        "venues.title": "Manajemen Venue",
        "venues.registered": "venue terdaftar",
        "venues.search": "Cari venue...",
        "venues.active": "Aktif",
        "venues.pending": "Menunggu",
        "venues.rejected": "Ditolak",
        "venues.by": "oleh",
        "venues.perHour": "/jam",

        // Bookings
        "bookings.title": "Kelola Booking",
        "bookings.description": "Lihat semua booking di platform",
        "bookings.search": "Cari booking...",
        "bookings.all": "Semua",
        "bookings.pending": "Menunggu",
        "bookings.confirmed": "Terkonfirmasi",
        "bookings.completed": "Selesai",
        "bookings.cancelled": "Dibatalkan",

        // Payments
        "payments.title": "Pembayaran & Transaksi",
        "payments.description": "Monitor semua transaksi platform",
        "payments.search": "Cari user...",
        "payments.totalRevenue": "Total Pendapatan",
        "payments.todayTransactions": "Transaksi Hari Ini",
        "payments.pendingPayouts": "Payout Pending",
        "payments.all": "Semua",
        "payments.booking": "Booking",
        "payments.payout": "Payout",
        "payments.refund": "Refund",
        "payments.success": "Sukses",

        // Analytics
        "analytics.title": "Analitik Platform",
        "analytics.description": "Insight dan statistik performa",
        "analytics.totalRevenue": "Total Pendapatan",
        "analytics.totalBookings": "Total Booking",
        "analytics.activeUsers": "Pengguna Aktif",
        "analytics.activeVenues": "Venue Aktif",
        "analytics.revenueGrowth": "Pertumbuhan Pendapatan",
        "analytics.topVenues": "Venue Terbaik",

        // Settings
        "settings.title": "Pengaturan Platform",
        "settings.description": "Konfigurasi dan preferensi",
        "settings.general": "Umum",
        "settings.commission": "Komisi",
        "settings.features": "Fitur",
        "settings.notifications": "Notifikasi",
        "settings.language": "Bahasa",
        "settings.platformName": "Nama Platform",
        "settings.supportEmail": "Email Support",
        "settings.maxBookingDays": "Maks Booking (hari)",
        "settings.commissionRate": "Persentase Komisi (%)",
        "settings.minPayout": "Minimum Payout (Rp)",
        "settings.joinanEnabled": "Fitur Joinan",
        "settings.joinanDesc": "Aktifkan fitur main bareng",
        "settings.reviewsEnabled": "Review & Rating",
        "settings.reviewsDesc": "Izinkan user memberikan review",
        "settings.payoutsEnabled": "Pencairan Dana",
        "settings.payoutsDesc": "Aktifkan fitur payout",
        "settings.maintenanceMode": "Mode Pemeliharaan",
        "settings.maintenanceDesc": "Nonaktifkan sementara",
        "settings.newBooking": "Booking Baru",
        "settings.paymentReceived": "Pembayaran Diterima",
        "settings.newVenue": "Venue Baru",
        "settings.dailyReport": "Laporan Harian",
        "settings.save": "Simpan",
        "settings.saving": "Menyimpan...",
        "settings.selectLanguage": "Pilih Bahasa",
        "settings.indonesian": "Bahasa Indonesia",
        "settings.english": "English",
    },
    en: {
        // Header
        "header.title": "Command Center",
        "header.subtitle": "KumpulMain.id Admin",
        "header.lightMode": "Light Mode",
        "header.darkMode": "Dark Mode",
        "header.logout": "Logout",

        // Menu
        "menu.dashboard": "Dashboard",
        "menu.users": "Users",
        "menu.venues": "Venues",
        "menu.bookings": "Bookings",
        "menu.payments": "Payments",
        "menu.analytics": "Analytics",
        "menu.settings": "Settings",

        // Dashboard
        "dashboard.welcome": "Good",
        "dashboard.morning": "Morning",
        "dashboard.afternoon": "Afternoon",
        "dashboard.evening": "Evening",
        "dashboard.overview": "Dashboard Overview",
        "dashboard.performance": "Platform performance at a glance",
        "dashboard.totalRevenue": "Total Revenue",
        "dashboard.thisMonth": "This Month",
        "dashboard.fromLastMonth": "from last month",
        "dashboard.activeUsers": "Active Users",
        "dashboard.activeVenues": "Active Venues",
        "dashboard.growth": "growth",
        "dashboard.new": "new",
        "dashboard.quickActions": "Quick Actions",
        "dashboard.liveActivity": "Live Activity",
        "dashboard.todaysBookings": "Today's Bookings",
        "dashboard.dailyTarget": "of daily target",
        "dashboard.performanceScore": "Performance Score",
        "dashboard.activeCities": "Active Cities",

        // Users
        "users.title": "User Management",
        "users.registered": "users registered",
        "users.search": "Search name or email...",
        "users.all": "All",
        "users.contact": "Contact",
        "users.role": "Role",
        "users.status": "Status",
        "users.bookings": "Bookings",
        "users.actions": "Actions",
        "users.active": "Active",
        "users.banned": "Banned",
        "users.showing": "Showing",
        "users.of": "of",

        // Venues
        "venues.title": "Venue Management",
        "venues.registered": "venues registered",
        "venues.search": "Search venues...",
        "venues.active": "Active",
        "venues.pending": "Pending",
        "venues.rejected": "Rejected",
        "venues.by": "by",
        "venues.perHour": "/hour",

        // Bookings
        "bookings.title": "Manage Bookings",
        "bookings.description": "View all bookings on platform",
        "bookings.search": "Search bookings...",
        "bookings.all": "All",
        "bookings.pending": "Pending",
        "bookings.confirmed": "Confirmed",
        "bookings.completed": "Completed",
        "bookings.cancelled": "Cancelled",

        // Payments
        "payments.title": "Payments & Transactions",
        "payments.description": "Monitor all platform transactions",
        "payments.search": "Search user...",
        "payments.totalRevenue": "Total Revenue",
        "payments.todayTransactions": "Today's Transactions",
        "payments.pendingPayouts": "Pending Payouts",
        "payments.all": "All",
        "payments.booking": "Booking",
        "payments.payout": "Payout",
        "payments.refund": "Refund",
        "payments.success": "Success",

        // Analytics
        "analytics.title": "Platform Analytics",
        "analytics.description": "Performance insights and statistics",
        "analytics.totalRevenue": "Total Revenue",
        "analytics.totalBookings": "Total Bookings",
        "analytics.activeUsers": "Active Users",
        "analytics.activeVenues": "Active Venues",
        "analytics.revenueGrowth": "Revenue Growth",
        "analytics.topVenues": "Top Venues",

        // Settings
        "settings.title": "Platform Settings",
        "settings.description": "Configuration and preferences",
        "settings.general": "General",
        "settings.commission": "Commission",
        "settings.features": "Features",
        "settings.notifications": "Notifications",
        "settings.language": "Language",
        "settings.platformName": "Platform Name",
        "settings.supportEmail": "Support Email",
        "settings.maxBookingDays": "Max Booking Days",
        "settings.commissionRate": "Commission Rate (%)",
        "settings.minPayout": "Minimum Payout (Rp)",
        "settings.joinanEnabled": "Joinan Feature",
        "settings.joinanDesc": "Enable group play feature",
        "settings.reviewsEnabled": "Reviews & Rating",
        "settings.reviewsDesc": "Allow users to give reviews",
        "settings.payoutsEnabled": "Payouts",
        "settings.payoutsDesc": "Enable payout feature",
        "settings.maintenanceMode": "Maintenance Mode",
        "settings.maintenanceDesc": "Temporarily disable",
        "settings.newBooking": "New Booking",
        "settings.paymentReceived": "Payment Received",
        "settings.newVenue": "New Venue",
        "settings.dailyReport": "Daily Report",
        "settings.save": "Save",
        "settings.saving": "Saving...",
        "settings.selectLanguage": "Select Language",
        "settings.indonesian": "Bahasa Indonesia",
        "settings.english": "English",
    }
};

const AdminThemeContext = createContext<AdminThemeContextType | undefined>(undefined);

export function AdminThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [language, setLanguageState] = useState<Language>("id");

    useEffect(() => {
        const savedTheme = localStorage.getItem("adminTheme") as Theme;
        const savedLang = localStorage.getItem("adminLanguage") as Language;
        if (savedTheme) setTheme(savedTheme);
        if (savedLang) setLanguageState(savedLang);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("adminTheme", newTheme);
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("adminLanguage", lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <AdminThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark", language, setLanguage, t }}>
            {children}
        </AdminThemeContext.Provider>
    );
}

export function useAdminTheme() {
    const context = useContext(AdminThemeContext);
    if (!context) {
        throw new Error("useAdminTheme must be used within AdminThemeProvider");
    }
    return context;
}

// Theme styles
export const adminThemeStyles = {
    dark: {
        pageBg: "bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950",
        cardBg: "bg-white/5 backdrop-blur-xl border-white/10",
        cardHover: "hover:bg-white/10",
        headerBg: "bg-white/5 backdrop-blur-xl border-white/10",
        textPrimary: "text-white",
        textSecondary: "text-white/70",
        textMuted: "text-white/50",
        textDimmed: "text-white/30",
        inputBg: "bg-white/5 border-white/10 text-white placeholder-white/30",
        inputFocus: "focus:border-indigo-500/50 focus:bg-white/10",
        buttonActive: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30",
        buttonInactive: "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white",
        tableHeader: "bg-white/5 border-white/10",
        tableRow: "border-white/5 hover:bg-white/5",
        success: "bg-emerald-500/20 text-emerald-400",
        warning: "bg-amber-500/20 text-amber-400",
        error: "bg-red-500/20 text-red-400",
        info: "bg-blue-500/20 text-blue-400",
    },
    light: {
        pageBg: "bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30",
        cardBg: "bg-white/80 backdrop-blur-xl border-slate-200/80 shadow-lg shadow-slate-200/50",
        cardHover: "hover:bg-white hover:shadow-xl",
        headerBg: "bg-white/80 backdrop-blur-xl border-slate-200/80 shadow-sm",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-700",
        textMuted: "text-slate-500",
        textDimmed: "text-slate-400",
        inputBg: "bg-white border-slate-200 text-slate-900 placeholder-slate-400",
        inputFocus: "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
        buttonActive: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30",
        buttonInactive: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900",
        tableHeader: "bg-slate-50 border-slate-200",
        tableRow: "border-slate-100 hover:bg-slate-50",
        success: "bg-emerald-100 text-emerald-700",
        warning: "bg-amber-100 text-amber-700",
        error: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700",
    }
};
