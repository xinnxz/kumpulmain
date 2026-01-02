"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Building2, ArrowLeft, Upload, Plus, X, Save, Loader2, MapPin,
    Clock, DollarSign, Users, Image as ImageIcon
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const venueTypes = [
    { value: "futsal", label: "Futsal" },
    { value: "badminton", label: "Badminton" },
    { value: "basketball", label: "Basketball" },
    { value: "tennis", label: "Tennis" },
    { value: "volleyball", label: "Volleyball" },
    { value: "soccer", label: "Mini Soccer" },
];

const facilities = [
    "Parkir Gratis", "WiFi", "Toilet", "Musholla", "Kantin",
    "Ruang Ganti", "Shower", "Tribun Penonton", "AC", "Sound System"
];

export default function CreateVenuePage() {
    const router = useRouter();
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
    const [images, setImages] = useState<string[]>([]);

    const handleFacilityToggle = (facility: string) => {
        setFormData(prev => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter(f => f !== facility)
                : [...prev.facilities, facility]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push("/pengelola/venues");
        } catch (error) {
            console.error("Error creating venue:", error);
        } finally {
            setSaving(false);
        }
    };

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
                            Tambah Venue Baru
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Isi informasi venue untuk mulai menerima booking</p>
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
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0"
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
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0"
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
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0"
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
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0"
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
                                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0 min-h-[100px]"
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
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0"
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
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F5B800] focus:ring-0"
                                                placeholder="22"
                                                required
                                            />
                                        </div>
                                    </div>
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
                                    <button
                                        type="button"
                                        className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-[#8A95A5] hover:border-[#F5B800] hover:text-[#F5B800] transition-colors"
                                    >
                                        <Upload className="w-8 h-8" />
                                        <span className="text-sm">Upload Foto</span>
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
                                        Simpan Venue
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
