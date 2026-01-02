"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    CreditCard, Search, CheckCircle, Clock, XCircle,
    Shield, Bell, LogOut, ArrowUpRight, ArrowDownLeft, RefreshCw, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const payments = [
    { id: "PAY001", customer: "Ahmad Pratama", venue: "Futsal Arena Jakarta", amount: 150000, method: "GoPay", status: "SUCCESS", date: "2026-01-15", time: "19:32", type: "booking" },
    { id: "PAY002", customer: "Budi Santoso", venue: "Badminton Center", amount: 100000, method: "BCA VA", status: "PENDING", date: "2026-01-15", time: "18:15", type: "booking" },
    { id: "PAY003", customer: "System", venue: "Futsal Arena Jakarta", amount: 2500000, method: "BCA Transfer", status: "SUCCESS", date: "2026-01-14", time: "10:00", type: "payout" },
    { id: "PAY004", customer: "Charlie Wijaya", venue: "Basketball Court", amount: 175000, method: "Mandiri VA", status: "SUCCESS", date: "2026-01-14", time: "17:45", type: "booking" },
    { id: "PAY005", customer: "David Hadiyanto", venue: "Tennis Club", amount: 200000, method: "DANA", status: "FAILED", date: "2026-01-13", time: "20:10", type: "booking" },
    { id: "PAY006", customer: "Eva Susanti", venue: "Mini Soccer Bekasi", amount: 250000, method: "OVO", status: "REFUNDED", date: "2026-01-12", time: "15:30", type: "refund" },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
    SUCCESS: { label: "Berhasil", color: "text-green-600", bgColor: "bg-green-100" },
    PENDING: { label: "Pending", color: "text-yellow-600", bgColor: "bg-yellow-100" },
    FAILED: { label: "Gagal", color: "text-red-600", bgColor: "bg-red-100" },
    REFUNDED: { label: "Refund", color: "text-blue-600", bgColor: "bg-blue-100" },
};

export default function AdminPaymentsPage() {
    const router = useRouter();
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPayments = payments.filter(p => {
        if (filter !== "all" && p.status !== filter) return false;
        if (searchQuery && !p.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const totalRevenue = payments.filter(p => p.status === "SUCCESS" && p.type === "booking").reduce((sum, p) => sum + p.amount, 0);
    const totalPayout = payments.filter(p => p.type === "payout" && p.status === "SUCCESS").reduce((sum, p) => sum + p.amount, 0);

    return (
        <main className="min-h-screen bg-[#0D1520]">
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Shield className="w-8 h-8 text-[#F5B800]" />
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-white/70 hover:text-white"><Bell className="w-6 h-6" /></button>
                            <button onClick={() => router.push("/admin/login")} className="p-2 text-white/70 hover:text-red-400"><LogOut className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div>
                        <Link href="/admin/dashboard" className="text-white/50 hover:text-white text-sm mb-2 inline-block">← Kembali ke Dashboard</Link>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <CreditCard className="w-8 h-8 text-[#F5B800]" />
                            Kelola Pembayaran
                        </h1>
                        <p className="text-white/50 mt-1">Monitor dan kelola semua transaksi</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <Download className="w-4 h-4 mr-2" /> Export
                        </Button>
                    </div>
                </motion.div>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Card className="p-5 bg-white/5 border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                    <ArrowDownLeft className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/50">Total Pendapatan</p>
                                    <p className="text-xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <Card className="p-5 bg-white/5 border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <ArrowUpRight className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/50">Total Payout</p>
                                    <p className="text-xl font-bold text-white">{formatCurrency(totalPayout)}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        <Card className="p-5 bg-white/5 border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#F5B800]/20 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-[#F5B800]" />
                                </div>
                                <div>
                                    <p className="text-sm text-white/50">Net Revenue</p>
                                    <p className="text-xl font-bold text-white">{formatCurrency(totalRevenue - totalPayout)}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="flex gap-2 flex-wrap">
                        {["all", "SUCCESS", "PENDING", "FAILED", "REFUNDED"].map((status) => (
                            <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === status ? "bg-[#F5B800] text-[#1A2744]" : "bg-white/5 text-white/70 hover:bg-white/10"}`}>
                                {status === "all" ? "Semua" : statusConfig[status]?.label || status}
                            </button>
                        ))}
                    </div>
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input type="text" placeholder="Cari transaksi..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:border-[#F5B800] outline-none" />
                    </div>
                </div>

                {/* Payments Table */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                    <Card className="bg-white/5 border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">ID</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Customer</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Venue</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Method</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Jumlah</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Status</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Waktu</th>
                                        <th className="text-right py-4 px-6 text-sm font-semibold text-white/50">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayments.map((payment) => {
                                        const status = statusConfig[payment.status];
                                        return (
                                            <tr key={payment.id} className="border-t border-white/10 hover:bg-white/5">
                                                <td className="py-4 px-6 text-white/70 font-mono text-sm">{payment.id}</td>
                                                <td className="py-4 px-6 text-white">{payment.customer}</td>
                                                <td className="py-4 px-6 text-white/70">{payment.venue}</td>
                                                <td className="py-4 px-6 text-white/70">{payment.method}</td>
                                                <td className="py-4 px-6">
                                                    <span className={payment.type === "payout" || payment.type === "refund" ? "text-red-400" : "text-green-400"}>
                                                        {payment.type === "payout" || payment.type === "refund" ? "-" : "+"}{formatCurrency(payment.amount)}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.color}`}>{status.label}</span>
                                                </td>
                                                <td className="py-4 px-6 text-white/50 text-sm">{payment.date} {payment.time}</td>
                                                <td className="py-4 px-6 text-right">
                                                    {payment.status === "FAILED" && (
                                                        <Button size="sm" variant="ghost" className="text-white/70"><RefreshCw className="w-4 h-4" /></Button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}
