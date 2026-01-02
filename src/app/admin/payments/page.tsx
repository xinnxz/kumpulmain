"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";
import { formatCurrency } from "@/lib/utils";

const transactions = [
    { id: "1", type: "booking", user: "Ahmad Pratama", venue: "Futsal Arena Jakarta", amount: 150000, status: "success", date: "2026-01-15 19:30" },
    { id: "2", type: "booking", user: "Budi Santoso", venue: "Badminton Center", amount: 100000, status: "success", date: "2026-01-15 18:15" },
    { id: "3", type: "payout", user: "John Doe (Venue)", venue: "Futsal Arena Jakarta", amount: -500000, status: "success", date: "2026-01-14 10:00" },
    { id: "4", type: "booking", user: "Charlie Wijaya", venue: "Basketball Court", amount: 175000, status: "pending", date: "2026-01-14 20:45" },
    { id: "5", type: "refund", user: "Eva Susanti", venue: "Tennis Club", amount: -200000, status: "success", date: "2026-01-13 14:30" },
];

function PaymentsContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const summaryCards = [
        { label: "Total Revenue", value: "Rp 45.6 Jt", change: "+18%", color: "from-amber-500 to-orange-500" },
        { label: "Transaksi Hari Ini", value: "23", change: "+5", color: "from-emerald-500 to-teal-500" },
        { label: "Pending Payouts", value: "Rp 12.3 Jt", change: "5 venue", color: "from-indigo-500 to-purple-500" },
    ];

    const filteredTransactions = transactions.filter(t => {
        if (filter !== "all" && t.type !== filter) return false;
        if (searchQuery && !t.user.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                <h1 className={`text-3xl font-bold ${styles.textPrimary} flex items-center gap-3`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    Pembayaran & Transaksi
                </h1>
                <p className={`${styles.textMuted} mt-2`}>Monitor semua transaksi platform</p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {summaryCards.map((card, i) => (
                    <motion.div key={card.label} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 * i }}>
                        <div className={`p-5 bg-gradient-to-br ${card.color} rounded-2xl relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            <p className="text-white/80 text-sm mb-1">{card.label}</p>
                            <p className="text-3xl font-bold text-white mb-2">{card.value}</p>
                            <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs font-medium">{card.change}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${styles.textDimmed}`} />
                    <input type="text" placeholder="Cari user..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none`} />
                </div>
                <div className="flex gap-2">
                    {["all", "booking", "payout", "refund"].map(type => (
                        <button key={type} onClick={() => setFilter(type)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${filter === type ? styles.buttonActive : styles.buttonInactive}`}>
                            {type === "all" ? "Semua" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className={`${styles.cardBg} border rounded-2xl overflow-hidden`}>
                    <table className="w-full">
                        <thead className={`${styles.tableHeader} border-b`}>
                            <tr>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Transaksi</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>User</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Venue</th>
                                <th className={`text-right py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Amount</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx, i) => (
                                <motion.tr key={tx.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.05 }}
                                    className={`border-t ${styles.tableRow}`}>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.amount > 0 ? (isDark ? "bg-emerald-500/20" : "bg-emerald-100") : (isDark ? "bg-red-500/20" : "bg-red-100")}`}>
                                                {tx.amount > 0 ? <ArrowDownRight className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} /> : <ArrowUpRight className={`w-4 h-4 ${isDark ? "text-red-400" : "text-red-600"}`} />}
                                            </div>
                                            <div>
                                                <p className={`font-medium ${styles.textPrimary} capitalize`}>{tx.type}</p>
                                                <p className={`text-xs ${styles.textDimmed}`}>{tx.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`py-4 px-6 ${styles.textSecondary}`}>{tx.user}</td>
                                    <td className={`py-4 px-6 ${styles.textMuted}`}>{tx.venue}</td>
                                    <td className={`py-4 px-6 text-right font-bold ${tx.amount > 0 ? (isDark ? "text-emerald-400" : "text-emerald-600") : (isDark ? "text-red-400" : "text-red-600")}`}>
                                        {tx.amount > 0 ? "+" : ""}{formatCurrency(Math.abs(tx.amount))}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tx.status === "success" ? (isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700") : (isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-700")}`}>
                                            {tx.status === "success" ? "Sukses" : "Pending"}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminPaymentsPage() {
    return (
        <AdminLayout>
            <PaymentsContent />
        </AdminLayout>
    );
}
