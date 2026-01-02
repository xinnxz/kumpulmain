"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Building2, ArrowLeft, Upload, X, Save, Loader2,
    DollarSign, Users, Trash2, Clock
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pengelolaApi } from "@/lib/api";

const venueTypes = [
    { value: "futsal", label: "Futsal" },
    { value: "badminton", label: "Badminton" },
    { value: "basketball", label: "Basketball" },
    { value: "basket", label: "Basket" },
    { value: "tennis", label: "Tennis" },
    { value: "volleyball", label: "Volleyball" },
    { value: "soccer", label: "Mini Soccer" },
];

const facilities = [
    "Parkir Gratis", "WiFi", "Toilet", "Musholla", "Kantin",
    "Ruang Ganti", "Shower", "Tribun Penonton", "AC", "Sound System"
];

const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

interface Schedule {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isAvailable: boolean;
}

export default function EditVenuePage() {
    const router = useRouter();
    const params = useParams();
    const venueId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        venueType: "",
        pricePerHour: "",
        capacity: "",
        facilities: [] as string[],
    });
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [images, setImages] = useState<string[]>([]);

    // Fetch venue data on mount
    useEffect(() => {
        fetchVenueData();
    }, [venueId]);

    const fetchVenueData = async () => {
        try {
            setLoading(true);
            const res = await pengelolaApi.getVenue(venueId);
            const venue = res.data;

            setFormData({
                name: venue.name || "",
                description: venue.description || "",
                address: venue.address || "",
                city: venue.city || "",
                venueType: venue.venueType?.toLowerCase() || "",
                pricePerHour: venue.pricePerHour?.toString() || "",
                capacity: venue.capacity?.toString() || "",
                facilities: venue.facilities || [],
            });

            setSchedules(venue.schedules || []);
            setImages(venue.images || []);
        } catch (error) {
            console.error("Error fetching venue:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFacilityToggle = (facility: string) => {
        setFormData(prev => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...prev.facilities, facility]
        }));
    };

    const handleScheduleChange = (dayOfWeek: number, field: keyof Schedule, value: string | boolean) => {
        setSchedules(prev => prev.map(s =>
            s.dayOfWeek === dayOfWeek ? { ...s, [field]: value } : s
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await pengelolaApi.updateVenue(venueId, {
                ...formData,
                pricePerHour: parseInt(formData.pricePerHour),
                capacity: parseInt(formData.capacity),
            });
            router.push("/pengelola/venues");
        } catch (error) {
            console.error("Error updating venue:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-20 flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-[#F5B800] mx-auto mb-4" />
                        <p className="text-[#8A95A5]">Memuat data venue...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <Link
                            href="/pengelola/venues"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Venue Saya
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-[#F5B800]" />
                            Edit Venue
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Perbarui informasi venue kamu</p>
                    </motion.div>

                    <form onSubmit={handleSubmit}>
                        {/* Basic Info */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-6 mb-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4">Informasi Dasar</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Nama Venue *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors"
                                            placeholder="Contoh: Futsal Arena Jakarta"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Tipe Venue *
                                        </label>
                                        <select
                                            value={formData.venueType}
                                            onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors"
                                            required
                                        >
                                            <option value="">Pilih Tipe</option>
                                            {venueTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Kota *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors"
                                            placeholder="Contoh: Jakarta"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Alamat Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors"
                                            placeholder="Jl. Contoh No. 123, Kelurahan, Kecamatan"
                                            required
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Deskripsi
                                        </label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors min-h-[100px] resize-none"
                                            placeholder="Ceritakan tentang venue kamu..."
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Pricing */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6 mb-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4">Harga & Kapasitas</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Harga per Jam (Rp) *
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                            <input
                                                type="number"
                                                value={formData.pricePerHour}
                                                onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors"
                                                placeholder="150000"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#1A2744] mb-2">
                                            Kapasitas (orang) *
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A95A5]" />
                                            <input
                                                type="number"
                                                value={formData.capacity}
                                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 outline-none transition-colors"
                                                placeholder="22"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Schedule */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            <Card className="p-6 mb-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#F5B800]" />
                                    Jadwal Operasional
                                </h2>

                                <div className="space-y-3">
                                    {schedules.length > 0 ? schedules.sort((a, b) => a.dayOfWeek - b.dayOfWeek).map(schedule => (
                                        <div key={schedule.dayOfWeek} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                            <div className="w-24">
                                                <span className="font-medium text-[#1A2744]">
                                                    {dayNames[schedule.dayOfWeek]}
                                                </span>
                                            </div>

                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={schedule.isAvailable}
                                                    onChange={(e) => handleScheduleChange(schedule.dayOfWeek, 'isAvailable', e.target.checked)}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#F5B800] focus:ring-[#F5B800]"
                                                />
                                                <span className="text-sm text-[#5A6A7E]">Buka</span>
                                            </label>

                                            {schedule.isAvailable && (
                                                <>
                                                    <input
                                                        type="time"
                                                        value={schedule.openTime}
                                                        onChange={(e) => handleScheduleChange(schedule.dayOfWeek, 'openTime', e.target.value)}
                                                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F5B800] outline-none"
                                                    />
                                                    <span className="text-[#8A95A5]">-</span>
                                                    <input
                                                        type="time"
                                                        value={schedule.closeTime}
                                                        onChange={(e) => handleScheduleChange(schedule.dayOfWeek, 'closeTime', e.target.value)}
                                                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F5B800] outline-none"
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )) : (
                                        <p className="text-[#8A95A5] text-center py-4">Jadwal belum diatur</p>
                                    )}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Facilities */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6 mb-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4">Fasilitas</h2>
                                <div className="flex flex-wrap gap-2">
                                    {facilities.map(facility => (
                                        <button
                                            key={facility}
                                            type="button"
                                            onClick={() => handleFacilityToggle(facility)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.facilities.includes(facility)
                                                ? "bg-[#F5B800] text-[#1A2744]"
                                                : "bg-gray-100 text-[#8A95A5] hover:bg-gray-200"
                                                }`}
                                        >
                                            {facility}
                                        </button>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Images */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="p-6 mb-6">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4">Foto Venue</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Existing images */}
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                                            <img src={img} alt={`Venue ${idx + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    {/* Upload button */}
                                    <button
                                        type="button"
                                        className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-[#8A95A5] hover:border-[#F5B800] hover:text-[#F5B800] transition-colors"
                                    >
                                        <Upload className="w-8 h-8" />
                                        <span className="text-sm">Upload</span>
                                    </button>
                                </div>
                                <p className="text-sm text-[#8A95A5] mt-2">
                                    Maksimal 10 foto, format JPG/PNG, ukuran max 5MB
                                </p>
                            </Card>
                        </motion.div>

                        {/* Submit */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-4"
                        >
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.back()}
                            >
                                Batal
                            </Button>
                            <Button type="submit" className="flex-1" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5 mr-2" />
                                        Simpan Perubahan
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </form>
                </div>
            </div>
        </main>
    );
}
