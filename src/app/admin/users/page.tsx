"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users, Search, Filter, MoreVertical, Mail, Phone,
    Shield, ChevronLeft, ChevronRight, Eye, Ban, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockUsers = [
    { id: "1", name: "Ahmad Pratama", email: "ahmad@gmail.com", phone: "081234567890", role: "USER", status: "active", bookings: 12, joinedAt: "2025-01-15" },
    { id: "2", name: "Diana Sari", email: "diana@gmail.com", phone: "081234567891", role: "PENGELOLA", status: "active", bookings: 0, joinedAt: "2025-02-20" },
    { id: "3", name: "Budi Santoso", email: "budi@gmail.com", phone: "081234567892", role: "USER", status: "active", bookings: 5, joinedAt: "2025-03-10" },
    { id: "4", name: "Charlie Wilson", email: "charlie@gmail.com", phone: "081234567893", role: "USER", status: "banned", bookings: 2, joinedAt: "2025-04-01" },
    { id: "5", name: "Eva Maharani", email: "eva@gmail.com", phone: "081234567894", role: "PENGELOLA", status: "active", bookings: 0, joinedAt: "2025-05-05" },
];

const roleColors: Record<string, string> = {
    USER: "bg-blue-100 text-blue-700",
    PENGELOLA: "bg-purple-100 text-purple-700",
    ADMIN: "bg-orange-100 text-orange-700",
};

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    banned: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
};

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [users] = useState(mockUsers);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === "all" || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    return (
        <main className="min-h-screen bg-[#0D1520]">
            {/* Header */}
            <header className="bg-[#1A2744] border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 text-white/70 hover:text-white">
                            <ChevronLeft className="w-5 h-5" />
                            <span>Kembali ke Dashboard</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Users className="w-8 h-8 text-[#F5B800]" />
                            Manajemen Pengguna
                        </h1>
                        <p className="text-white/50 mt-1">{users.length} total pengguna terdaftar</p>
                    </div>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                        <input
                            type="text"
                            placeholder="Cari nama atau email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-[#F5B800] focus:ring-0"
                        />
                    </div>
                    <div className="flex gap-2">
                        {["all", "USER", "PENGELOLA"].map(role => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedRole === role
                                        ? "bg-[#F5B800] text-[#1A2744]"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                    }`}
                            >
                                {role === "all" ? "Semua" : role}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Users Table */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-white/5 border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Pengguna</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Kontak</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Role</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Status</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-white/50">Booking</th>
                                        <th className="text-right py-4 px-6 text-sm font-semibold text-white/50">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="border-t border-white/5 hover:bg-white/5">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#F5B800] flex items-center justify-center text-[#1A2744] font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">{user.name}</p>
                                                        <p className="text-sm text-white/50">ID: {user.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="text-white flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-white/30" />
                                                    {user.email}
                                                </p>
                                                <p className="text-white/50 text-sm flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    {user.phone}
                                                </p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                                                    {user.status === "active" ? "Aktif" : "Banned"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-white">
                                                {user.bookings}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-red-500/20 hover:text-red-400">
                                                        <Ban className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between p-4 border-t border-white/5">
                            <p className="text-white/50 text-sm">
                                Menampilkan {filteredUsers.length} dari {users.length} pengguna
                            </p>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="px-4 py-2 rounded-lg bg-[#F5B800] text-[#1A2744] font-medium">1</button>
                                <button className="px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10">2</button>
                                <button className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}
