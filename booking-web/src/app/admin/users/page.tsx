"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Mail, Phone, ChevronLeft, ChevronRight, Eye, Ban } from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";

const mockUsers = [
    { id: "1", name: "Ahmad Pratama", email: "ahmad@gmail.com", phone: "081234567890", role: "USER", status: "active", bookings: 12 },
    { id: "2", name: "Diana Sari", email: "diana@gmail.com", phone: "081234567891", role: "PENGELOLA", status: "active", bookings: 0 },
    { id: "3", name: "Budi Santoso", email: "budi@gmail.com", phone: "081234567892", role: "USER", status: "active", bookings: 5 },
    { id: "4", name: "Charlie Wilson", email: "charlie@gmail.com", phone: "081234567893", role: "USER", status: "banned", bookings: 2 },
    { id: "5", name: "Eva Maharani", email: "eva@gmail.com", phone: "081234567894", role: "PENGELOLA", status: "active", bookings: 0 },
];

function UsersContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");

    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === "all" || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    const roleColors = {
        USER: isDark ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-blue-100 text-blue-700 border-blue-200",
        PENGELOLA: isDark ? "bg-purple-500/20 text-purple-400 border-purple-500/30" : "bg-purple-100 text-purple-700 border-purple-200",
        ADMIN: isDark ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-amber-100 text-amber-700 border-amber-200",
    };

    const statusColors = {
        active: isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-700",
        banned: isDark ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700",
    };

    return (
        <div className="max-w-[1600px] mx-auto px-6 py-8">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                <h1 className={`text-3xl font-bold ${styles.textPrimary} flex items-center gap-3`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    Manajemen Pengguna
                </h1>
                <p className={`${styles.textMuted} mt-2`}>{mockUsers.length} pengguna terdaftar</p>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${styles.textDimmed}`} />
                    <input type="text" placeholder="Cari nama atau email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none transition-all`} />
                </div>
                <div className="flex gap-2">
                    {["all", "USER", "PENGELOLA"].map(role => (
                        <button key={role} onClick={() => setSelectedRole(role)}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedRole === role ? styles.buttonActive : styles.buttonInactive}`}>
                            {role === "all" ? "Semua" : role}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className={`${styles.cardBg} border rounded-2xl overflow-hidden`}>
                    <table className="w-full">
                        <thead className={`${styles.tableHeader} border-b`}>
                            <tr>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Pengguna</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Kontak</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Role</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Status</th>
                                <th className={`text-left py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Booking</th>
                                <th className={`text-right py-4 px-6 text-sm font-semibold ${styles.textMuted}`}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, i) => (
                                <motion.tr key={user.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                                    className={`border-t ${styles.tableRow} transition-colors`}>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${styles.textPrimary}`}>{user.name}</p>
                                                <p className={`text-sm ${styles.textDimmed}`}>ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className={`${styles.textSecondary} flex items-center gap-2`}><Mail className={`w-4 h-4 ${styles.textDimmed}`} />{user.email}</p>
                                        <p className={`${styles.textDimmed} text-sm flex items-center gap-2`}><Phone className="w-4 h-4" />{user.phone}</p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${roleColors[user.role as keyof typeof roleColors]}`}>{user.role}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status as keyof typeof statusColors]}`}>
                                            {user.status === "active" ? "Aktif" : "Banned"}
                                        </span>
                                    </td>
                                    <td className={`py-4 px-6 font-medium ${styles.textPrimary}`}>{user.bookings}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-end gap-2">
                                            <button className={`p-2 rounded-lg ${isDark ? "bg-white/5 text-white/50 hover:bg-indigo-500/20 hover:text-indigo-400" : "bg-slate-100 text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"} transition-colors`}>
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className={`p-2 rounded-lg ${isDark ? "bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400" : "bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600"} transition-colors`}>
                                                <Ban className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={`flex items-center justify-between p-4 border-t ${styles.tableHeader}`}>
                        <p className={`${styles.textDimmed} text-sm`}>Menampilkan {filteredUsers.length} dari {mockUsers.length}</p>
                        <div className="flex gap-2">
                            <button className={`p-2 rounded-lg ${styles.buttonInactive}`}><ChevronLeft className="w-5 h-5" /></button>
                            <button className={`px-4 py-2 rounded-lg ${styles.buttonActive}`}>1</button>
                            <button className={`px-4 py-2 rounded-lg ${styles.buttonInactive}`}>2</button>
                            <button className={`p-2 rounded-lg ${styles.buttonInactive}`}><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function AdminUsersPage() {
    return (
        <AdminLayout>
            <UsersContent />
        </AdminLayout>
    );
}
