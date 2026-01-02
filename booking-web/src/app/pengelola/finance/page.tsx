"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    CreditCard, Wallet, ArrowUpRight, ArrowDownLeft,
    ArrowLeft, TrendingUp, Building2, Clock, CheckCircle, AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const transactions = [
    { id: "1", type: "income", description: "Booking - Lapangan Futsal A", amount: 150000, date: "2026-01-15", time: "19:32", status: "success" },
    { id: "2", type: "income", description: "Booking - Lapangan Futsal B", amount: 150000, date: "2026-01-15", time: "18:15", status: "success" },
    { id: "3", type: "payout", description: "Pencairan ke BCA ****1234", amount: 2500000, date: "2026-01-14", time: "10:00", status: "success" },
    { id: "4", type: "income", description: "Booking - Lapangan Badminton", amount: 100000, date: "2026-01-14", time: "17:45", status: "success" },
    { id: "5", type: "income", description: "Joinan - Lapangan Futsal A", amount: 175000, date: "2026-01-13", time: "20:10", status: "success" },
    { id: "6", type: "payout", description: "Pencairan ke BCA ****1234", amount: 3000000, date: "2026-01-07", time: "10:00", status: "pending" },
];

export default function PengelolaFinancePage() {
    const [showPayoutModal, setShowPayoutModal] = useState(false);

    const balance = 4875000;
    const pendingPayout = 3000000;
    const totalIncome = 8250000;

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8"
                    >
                        <Link
                            href="/pengelola/dashboard"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                            <CreditCard className="w-8 h-8 text-[#F5B800]" />
                            Keuangan
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Kelola saldo dan pencairan dana venue kamu</p>
                    </motion.div>

                    {/* Balance Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-6 bg-gradient-to-br from-[#1A2744] to-[#344D7A]">
                                <div className="flex items-center justify-between mb-4">
                                    <Wallet className="w-8 h-8 text-[#F5B800]" />
                                    <span className="text-white/60 text-sm">Saldo Tersedia</span>
                                </div>
                                <p className="text-3xl font-bold text-white mb-4">{formatCurrency(balance)}</p>
                                <Button
                                    variant="accent"
                                    className="w-full"
                                    onClick={() => setShowPayoutModal(true)}
                                >
                                    Cairkan Dana
                                </Button>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <Clock className="w-8 h-8 text-orange-500" />
                                    <span className="text-[#8A95A5] text-sm">Menunggu Pencairan</span>
                                </div>
                                <p className="text-2xl font-bold text-[#1A2744]">{formatCurrency(pendingPayout)}</p>
                                <p className="text-sm text-[#8A95A5] mt-2">Estimasi 1-3 hari kerja</p>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <TrendingUp className="w-8 h-8 text-green-500" />
                                    <span className="text-[#8A95A5] text-sm">Total Pendapatan</span>
                                </div>
                                <p className="text-2xl font-bold text-[#1A2744]">{formatCurrency(totalIncome)}</p>
                                <p className="text-sm text-green-600 mt-2">+18% dari bulan lalu</p>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Bank Account */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <Card className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#1A2744]">Bank BCA</p>
                                        <p className="text-[#8A95A5]">•••• •••• •••• 1234 • Ahmad Pratama</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Ubah
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Transaction History */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#1A2744]">Riwayat Transaksi</h2>
                            <Link href="/pengelola/payouts" className="text-[#344D7A] hover:text-[#F5B800] font-medium text-sm">
                                Lihat Semua →
                            </Link>
                        </div>
                        <Card className="divide-y">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="p-4 flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === "income" ? "bg-green-100" : "bg-blue-100"
                                        }`}>
                                        {tx.type === "income" ? (
                                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <ArrowUpRight className="w-5 h-5 text-blue-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-[#1A2744]">{tx.description}</p>
                                        <p className="text-sm text-[#8A95A5]">{tx.date} • {tx.time}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${tx.type === "income" ? "text-green-600" : "text-[#1A2744]"}`}>
                                            {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                                        </p>
                                        <span className={`inline-flex items-center gap-1 text-xs ${tx.status === "success" ? "text-green-600" : "text-orange-600"
                                            }`}>
                                            {tx.status === "success" ? (
                                                <><CheckCircle className="w-3 h-3" /> Berhasil</>
                                            ) : (
                                                <><AlertCircle className="w-3 h-3" /> Pending</>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </motion.div>

                    {/* Payout Modal */}
                    {showPayoutModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            onClick={() => setShowPayoutModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white rounded-2xl w-full max-w-md p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-xl font-bold text-[#1A2744] mb-4">Cairkan Dana</h3>
                                <div className="p-4 bg-[#F7F8FA] rounded-xl mb-4">
                                    <p className="text-sm text-[#8A95A5]">Saldo Tersedia</p>
                                    <p className="text-2xl font-bold text-[#1A2744]">{formatCurrency(balance)}</p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-[#1A2744] mb-2">
                                        Jumlah Pencairan
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Masukkan jumlah"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F5B800] outline-none"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1" onClick={() => setShowPayoutModal(false)}>
                                        Batal
                                    </Button>
                                    <Button variant="accent" className="flex-1">
                                        Cairkan
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    );
}
