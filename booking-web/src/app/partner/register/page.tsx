"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Building2, User, Phone, Mail, MapPin, CreditCard,
    ArrowLeft, ArrowRight, Check, Upload, Building
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const steps = [
    { id: 1, title: "Info Pemilik", icon: User },
    { id: 2, title: "Info Bisnis", icon: Building2 },
    { id: 3, title: "Rekening Bank", icon: CreditCard },
];

export default function PartnerRegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        // Owner Info
        ownerName: "",
        ownerEmail: "",
        ownerPhone: "",
        ownerKtp: "",
        // Business Info
        businessName: "",
        businessType: "",
        businessAddress: "",
        businessCity: "",
        // Bank Info
        bankName: "",
        bankAccountNumber: "",
        bankAccountName: "",
    });

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        router.push("/pengelola/dashboard");
    };

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8 text-center"
                    >
                        <Link
                            href="/partner"
                            className="inline-flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1A2744]">
                            Daftar Sebagai Pengelola Venue
                        </h1>
                        <p className="text-[#8A95A5] mt-2">
                            Isi data di bawah untuk mendaftarkan venue kamu ke KumpulMain.id
                        </p>
                    </motion.div>

                    {/* Progress Steps */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between">
                            {steps.map((step, i) => (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentStep >= step.id
                                                ? "bg-[#F5B800] text-[#1A2744]"
                                                : "bg-gray-200 text-gray-500"
                                            }`}>
                                            {currentStep > step.id ? (
                                                <Check className="w-6 h-6" />
                                            ) : (
                                                <step.icon className="w-6 h-6" />
                                            )}
                                        </div>
                                        <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? "text-[#1A2744]" : "text-gray-400"
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className={`w-20 sm:w-32 h-1 mx-2 rounded ${currentStep > step.id ? "bg-[#F5B800]" : "bg-gray-200"
                                            }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        key={currentStep}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                    >
                        <Card className="p-6">
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-[#1A2744] mb-4">Informasi Pemilik</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Nama Lengkap
                                        </label>
                                        <Input
                                            value={formData.ownerName}
                                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <Mail className="w-4 h-4 inline mr-2" />
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            value={formData.ownerEmail}
                                            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <Phone className="w-4 h-4 inline mr-2" />
                                            Nomor Telepon
                                        </label>
                                        <Input
                                            value={formData.ownerPhone}
                                            onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <CreditCard className="w-4 h-4 inline mr-2" />
                                            Nomor KTP
                                        </label>
                                        <Input
                                            value={formData.ownerKtp}
                                            onChange={(e) => setFormData({ ...formData, ownerKtp: e.target.value })}
                                            placeholder="16 digit nomor KTP"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-[#1A2744] mb-4">Informasi Bisnis</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <Building2 className="w-4 h-4 inline mr-2" />
                                            Nama Bisnis / Venue
                                        </label>
                                        <Input
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            placeholder="Nama venue atau usaha"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            Jenis Venue
                                        </label>
                                        <select
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800] outline-none"
                                            value={formData.businessType}
                                            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                                        >
                                            <option value="">Pilih jenis venue</option>
                                            <option value="futsal">Lapangan Futsal</option>
                                            <option value="badminton">Lapangan Badminton</option>
                                            <option value="basket">Lapangan Basket</option>
                                            <option value="tennis">Lapangan Tenis</option>
                                            <option value="soccer">Lapangan Sepak Bola</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Alamat Lengkap
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800] outline-none resize-none"
                                            rows={3}
                                            value={formData.businessAddress}
                                            onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                                            placeholder="Alamat lengkap venue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            Kota
                                        </label>
                                        <Input
                                            value={formData.businessCity}
                                            onChange={(e) => setFormData({ ...formData, businessCity: e.target.value })}
                                            placeholder="Kota lokasi venue"
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-[#1A2744] mb-4">Rekening Bank</h2>
                                    <p className="text-[#8A95A5] text-sm mb-4">
                                        Rekening ini akan digunakan untuk pencairan dana dari hasil booking.
                                    </p>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            <Building className="w-4 h-4 inline mr-2" />
                                            Nama Bank
                                        </label>
                                        <select
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#F5B800] focus:ring-1 focus:ring-[#F5B800] outline-none"
                                            value={formData.bankName}
                                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                        >
                                            <option value="">Pilih bank</option>
                                            <option value="bca">BCA</option>
                                            <option value="bni">BNI</option>
                                            <option value="bri">BRI</option>
                                            <option value="mandiri">Mandiri</option>
                                            <option value="cimb">CIMB Niaga</option>
                                            <option value="permata">Permata</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            Nomor Rekening
                                        </label>
                                        <Input
                                            value={formData.bankAccountNumber}
                                            onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                                            placeholder="Nomor rekening bank"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                            Nama Pemilik Rekening
                                        </label>
                                        <Input
                                            value={formData.bankAccountName}
                                            onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                                            placeholder="Nama sesuai buku tabungan"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {currentStep > 1 ? (
                                    <Button variant="outline" onClick={handleBack}>
                                        <ArrowLeft className="w-5 h-5 mr-2" />
                                        Kembali
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < 3 ? (
                                    <Button onClick={handleNext}>
                                        Lanjut
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                ) : (
                                    <Button variant="accent" onClick={handleSubmit} isLoading={isLoading}>
                                        <Check className="w-5 h-5 mr-2" />
                                        Daftar Sekarang
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
