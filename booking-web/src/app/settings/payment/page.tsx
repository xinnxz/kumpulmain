"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    CreditCard, ArrowLeft, Plus, Trash2, Wallet,
    CheckCircle, Building2, Smartphone
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const savedMethods = [
    {
        id: "1",
        type: "card",
        name: "Visa",
        number: "•••• •••• •••• 4532",
        expiry: "12/27",
        isDefault: true,
        icon: CreditCard,
    },
    {
        id: "2",
        type: "ewallet",
        name: "GoPay",
        number: "0812****5678",
        isDefault: false,
        icon: Wallet,
    },
    {
        id: "3",
        type: "bank",
        name: "BCA Virtual Account",
        number: "•••• •••• 1234",
        isDefault: false,
        icon: Building2,
    },
];

const availableMethods = [
    { name: "Kartu Kredit/Debit", icon: CreditCard, description: "Visa, Mastercard, JCB" },
    { name: "GoPay", icon: Wallet, description: "Saldo GoPay atau GoPayLater" },
    { name: "OVO", icon: Smartphone, description: "Bayar dengan saldo OVO" },
    { name: "DANA", icon: Smartphone, description: "Bayar dengan DANA" },
    { name: "ShopeePay", icon: Smartphone, description: "Bayar dengan ShopeePay" },
    { name: "Virtual Account", icon: Building2, description: "BCA, BNI, BRI, Mandiri" },
];

export default function PaymentSettingsPage() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [methods, setMethods] = useState(savedMethods);

    const handleSetDefault = (id: string) => {
        setMethods(methods.map(m => ({
            ...m,
            isDefault: m.id === id
        })));
    };

    const handleDelete = (id: string) => {
        setMethods(methods.filter(m => m.id !== id));
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
                        className="mb-8"
                    >
                        <Link
                            href="/settings"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Pengaturan
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                                    <CreditCard className="w-8 h-8 text-[#F5B800]" />
                                    Metode Pembayaran
                                </h1>
                                <p className="text-[#8A95A5] mt-1">Kelola kartu dan e-wallet kamu</p>
                            </div>
                            <Button onClick={() => setShowAddModal(true)}>
                                <Plus className="w-5 h-5 mr-2" />
                                Tambah Baru
                            </Button>
                        </div>
                    </motion.div>

                    {/* Saved Methods */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="mb-8"
                    >
                        <h2 className="text-sm font-semibold text-[#8A95A5] uppercase tracking-wider mb-3">
                            Metode Tersimpan
                        </h2>
                        <div className="space-y-3">
                            {methods.map((method) => (
                                <Card key={method.id} className={`p-4 ${method.isDefault ? "ring-2 ring-[#F5B800]" : ""}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.type === "card" ? "bg-blue-100" :
                                                method.type === "ewallet" ? "bg-green-100" : "bg-purple-100"
                                            }`}>
                                            <method.icon className={`w-6 h-6 ${method.type === "card" ? "text-blue-600" :
                                                    method.type === "ewallet" ? "text-green-600" : "text-purple-600"
                                                }`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-[#1A2744]">{method.name}</p>
                                                {method.isDefault && (
                                                    <span className="px-2 py-0.5 bg-[#F5B800]/20 text-[#B8860B] text-xs rounded-full font-medium flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Utama
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[#8A95A5]">
                                                {method.number}
                                                {method.expiry && ` • Exp ${method.expiry}`}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {!method.isDefault && (
                                                <button
                                                    onClick={() => handleSetDefault(method.id)}
                                                    className="text-sm text-[#344D7A] hover:text-[#1A2744] font-medium"
                                                >
                                                    Jadikan Utama
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(method.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Add Payment Method Modal Simulation */}
                    {showAddModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            onClick={() => setShowAddModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white rounded-2xl w-full max-w-md p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-xl font-bold text-[#1A2744] mb-4">Tambah Metode Pembayaran</h3>
                                <div className="space-y-3">
                                    {availableMethods.map((method) => (
                                        <button
                                            key={method.name}
                                            className="w-full p-4 flex items-center gap-4 border rounded-xl hover:border-[#F5B800] hover:bg-[#F5B800]/5 transition-all"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                <method.icon className="w-5 h-5 text-[#344D7A]" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="font-medium text-[#1A2744]">{method.name}</p>
                                                <p className="text-sm text-[#8A95A5]">{method.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="w-full mt-4 py-3 text-[#8A95A5] hover:text-[#1A2744] font-medium"
                                >
                                    Batal
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Info Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-6 bg-gradient-to-br from-[#1A2744] to-[#344D7A]">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-[#F5B800]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Pembayaran Aman</h3>
                                    <p className="text-white/70 text-sm mt-1">
                                        Semua transaksi dienkripsi dan diproses melalui payment gateway yang tersertifikasi PCI-DSS.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
