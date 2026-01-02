"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Percent, ToggleLeft, Mail, Save, Loader2, ChevronRight } from "lucide-react";
import { AdminLayout, useAdminTheme, adminThemeStyles } from "@/components/layout/admin-header";
import { Button } from "@/components/ui/button";

const settingsCategories = [
    { id: "general", label: "Umum", icon: Settings, color: "from-slate-500 to-slate-600" },
    { id: "commission", label: "Komisi", icon: Percent, color: "from-amber-500 to-orange-500" },
    { id: "features", label: "Fitur", icon: ToggleLeft, color: "from-indigo-500 to-purple-500" },
    { id: "notifications", label: "Notifikasi", icon: Mail, color: "from-emerald-500 to-teal-500" },
];

function SettingsContent() {
    const { isDark } = useAdminTheme();
    const styles = adminThemeStyles[isDark ? "dark" : "light"];
    const [activeCategory, setActiveCategory] = useState("general");
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        platformName: "KumpulMain.id", supportEmail: "support@kumpulmain.id",
        commissionRate: 10, minPayout: 100000, maxBookingDays: 30,
        joinanEnabled: true, reviewsEnabled: true, payoutsEnabled: true, maintenanceMode: false,
        emailNewBooking: true, emailPaymentReceived: true, emailNewVenue: true, emailDailyReport: false,
    });

    const handleSave = async () => { setSaving(true); await new Promise(r => setTimeout(r, 1500)); setSaving(false); };
    const activeConfig = settingsCategories.find(c => c.id === activeCategory);

    const Toggle = ({ checked, onChange, danger }: { checked: boolean; onChange: () => void; danger?: boolean }) => (
        <button onClick={onChange}
            className={`relative w-12 h-7 rounded-full transition-colors ${checked ? (danger ? "bg-red-500" : "bg-indigo-500") : (isDark ? "bg-white/20" : "bg-slate-300")}`}>
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
        </button>
    );

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                <h1 className={`text-3xl font-bold ${styles.textPrimary} flex items-center gap-3`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Settings className="w-6 h-6 text-white" />
                    </div>
                    Pengaturan Platform
                </h1>
                <p className={`${styles.textMuted} mt-2`}>Kelola pengaturan dan konfigurasi platform</p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <div className={`${styles.cardBg} border rounded-2xl p-2 space-y-1`}>
                        {settingsCategories.map((cat) => (
                            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${activeCategory === cat.id
                                    ? (isDark ? "bg-white/10 text-white border border-white/20" : "bg-indigo-50 text-indigo-700 border border-indigo-200")
                                    : styles.textMuted + " hover:" + styles.textPrimary}`}>
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                                    <cat.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-medium flex-1">{cat.label}</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="md:col-span-3">
                    <div className={`${styles.cardBg} border rounded-2xl p-6`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeConfig?.color} flex items-center justify-center`}>
                                {activeConfig && <activeConfig.icon className="w-5 h-5 text-white" />}
                            </div>
                            <h2 className={`text-lg font-bold ${styles.textPrimary}`}>{activeConfig?.label}</h2>
                        </div>

                        {activeCategory === "general" && (
                            <div className="space-y-4">
                                {[{ label: "Nama Platform", key: "platformName", type: "text" }, { label: "Email Dukungan", key: "supportEmail", type: "email" }, { label: "Maks Hari Booking", key: "maxBookingDays", type: "number" }].map((f) => (
                                    <div key={f.key}>
                                        <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>{f.label}</label>
                                        <input type={f.type} value={settings[f.key as keyof typeof settings] as string | number}
                                            onChange={(e) => setSettings({ ...settings, [f.key]: f.type === "number" ? parseInt(e.target.value) : e.target.value })}
                                            className={`w-full px-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none`} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeCategory === "commission" && (
                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>Rate Komisi Platform</label>
                                    <div className="relative">
                                        <input type="number" value={settings.commissionRate} onChange={(e) => setSettings({ ...settings, commissionRate: parseInt(e.target.value) })}
                                            className={`w-full px-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none`} />
                                        <Percent className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${styles.textDimmed}`} />
                                    </div>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium ${styles.textSecondary} mb-2`}>Minimum Pencairan (Rp)</label>
                                    <input type="number" value={settings.minPayout} onChange={(e) => setSettings({ ...settings, minPayout: parseInt(e.target.value) })}
                                        className={`w-full px-4 py-3 rounded-xl ${styles.inputBg} border ${styles.inputFocus} outline-none`} />
                                </div>
                            </div>
                        )}

                        {activeCategory === "features" && (
                            <div className="space-y-3">
                                {[{ key: "joinanEnabled", label: "Fitur Joinan/Main Bareng", desc: "Izinkan user untuk buat dan join undangan" }, { key: "reviewsEnabled", label: "Sistem Review", desc: "Izinkan user memberikan rating & review" }, { key: "payoutsEnabled", label: "Pencairan Dana", desc: "Aktifkan fitur pencairan untuk pengelola" }, { key: "maintenanceMode", label: "Mode Maintenance", desc: "Nonaktifkan akses publik sementara", danger: true }].map((f) => (
                                    <div key={f.key} className={`flex items-center justify-between p-4 rounded-xl ${f.danger ? (isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-200") : (isDark ? "bg-white/5" : "bg-slate-50")}`}>
                                        <div>
                                            <p className={`font-medium ${f.danger ? "text-red-500" : styles.textPrimary}`}>{f.label}</p>
                                            <p className={`text-sm ${styles.textDimmed}`}>{f.desc}</p>
                                        </div>
                                        <Toggle checked={settings[f.key as keyof typeof settings] as boolean} onChange={() => setSettings({ ...settings, [f.key]: !settings[f.key as keyof typeof settings] })} danger={f.danger} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeCategory === "notifications" && (
                            <div className="space-y-3">
                                {[{ key: "emailNewBooking", label: "Email Booking Baru" }, { key: "emailPaymentReceived", label: "Email Pembayaran Diterima" }, { key: "emailNewVenue", label: "Email Venue Baru Terdaftar" }, { key: "emailDailyReport", label: "Email Laporan Harian" }].map((n) => (
                                    <div key={n.key} className={`flex items-center justify-between py-3 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
                                        <span className={styles.textSecondary}>{n.label}</span>
                                        <Toggle checked={settings[n.key as keyof typeof settings] as boolean} onChange={() => setSettings({ ...settings, [n.key]: !settings[n.key as keyof typeof settings] })} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6">
                            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4 mr-2" /> Simpan Perubahan</>}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function AdminSettingsPage() {
    return <AdminLayout><SettingsContent /></AdminLayout>;
}
