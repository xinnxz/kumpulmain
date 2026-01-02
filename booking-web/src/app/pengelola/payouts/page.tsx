"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Wallet, ArrowLeft, ArrowUpRight, CheckCircle, Clock,
    XCircle, Download, Building2, Filter
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const payouts = [
    {
        id: "PAY-001",
        amount: 2500000,
        bank: "BCA",
        accountNumber: "****1234",
        accountName: "Ahmad Pratama",
        status: "success",
        requestDate: "2026-01-14",
        completedDate: "2026-01-15",
    },
    {
        id: "PAY-002",
        amount: 3000000,
        bank: "BCA",
        accountNumber: "****1234",
        accountName: "Ahmad Pratama",
        status: "pending",
        requestDate: "2026-01-15",
        completedDate: null,
    },
    {
        id: "PAY-003",
        amount: 1800000,
        bank: "BCA",
        accountNumber: "****1234",
        accountName: "Ahmad Pratama",
        status: "success",
        requestDate: "2026-01-07",
        completedDate: "2026-01-08",
    },
    {
        id: "PAY-004",
        amount: 2200000,
        bank: "BCA",
        accountNumber: "****1234",
        accountName: "Ahmad Pratama",
        status: "success",
        requestDate: "2025-12-30",
        completedDate: "2025-12-31",
    },
    {
        id: "PAY-005",
        amount: 500000,
        bank: "BCA",
        accountNumber: "****1234",
        accountName: "Ahmad Pratama",
        status: "failed",
        requestDate: "2025-12-25",
        completedDate: null,
        failedReason: "Nomor rekening tidak valid",
    },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
    success: { label: "Berhasil", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle },
    pending: { label: "Diproses", color: "text-orange-600", bgColor: "bg-orange-100", icon: Clock },
    failed: { label: "Gagal", color: "text-red-600", bgColor: "bg-red-100", icon: XCircle },
};

export default function PengelolaPayoutsPage() {
    const [filter, setFilter] = useState("all");

    const totalPayout = payouts.filter(p => p.status === "success").reduce((sum, p) => sum + p.amount, 0);
    const pendingPayout = payouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);

    const filteredPayouts = filter === "all" ? payouts : payouts.filter(p => p.status === filter);

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
                            href="/pengelola/finance"
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali ke Keuangan
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-[#1A2744] flex items-center gap-3">
                                    <Wallet className="w-8 h-8 text-[#F5B800]" />
                                    Riwayat Pencairan
                                </h1>
                                <p className="text-[#8A95A5] mt-1">Semua pencairan dana venue kamu</p>
                            </div>
                            <Button variant="outline" className="mt-4 md:mt-0">
                                <Download className="w-5 h-5 mr-2" />
                                Export
                            </Button>
                        </div>
                    </motion.div>

                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#8A95A5]">Total Dicairkan</p>
                                        <p className="text-2xl font-bold text-[#1A2744]">{formatCurrency(totalPayout)}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#8A95A5]">Sedang Diproses</p>
                                        <p className="text-2xl font-bold text-[#1A2744]">{formatCurrency(pendingPayout)}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Filter */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-2 mb-6"
                    >
                        {["all", "success", "pending", "failed"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === f
                                        ? "bg-[#F5B800] text-[#1A2744]"
                                        : "bg-white text-[#8A95A5] hover:bg-gray-100"
                                    }`}
                            >
                                {f === "all" ? "Semua" : statusConfig[f]?.label || f}
                            </button>
                        ))}
                    </motion.div>

                    {/* Payouts List */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="divide-y">
                            {filteredPayouts.map((payout) => {
                                const status = statusConfig[payout.status];
                                const StatusIcon = status.icon;

                                return (
                                    <div key={payout.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bgColor}`}>
                                            <ArrowUpRight className={`w-5 h-5 ${status.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-[#1A2744]">{formatCurrency(payout.amount)}</p>
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                                                    <StatusIcon className="w-3 h-3" />
                                                    {status.label}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#8A95A5]">
                                                {payout.bank} {payout.accountNumber} • {payout.accountName}
                                            </p>
                                            {payout.status === "failed" && payout.failedReason && (
                                                <p className="text-sm text-red-500 mt-1">{payout.failedReason}</p>
                                            )}
                                        </div>
                                        <div className="text-right text-sm text-[#8A95A5]">
                                            <p>Request: {payout.requestDate}</p>
                                            {payout.completedDate && <p>Selesai: {payout.completedDate}</p>}
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#8A95A5]">{payout.id}</p>
                                        </div>
                                    </div>
                                );
                            })}

                            {filteredPayouts.length === 0 && (
                                <div className="p-12 text-center">
                                    <Wallet className="w-12 h-12 text-[#8A95A5] mx-auto mb-4" />
                                    <p className="text-[#8A95A5]">Tidak ada data pencairan</p>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
