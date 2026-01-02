"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar, Clock, MapPin, Users, ArrowLeft, Download, Share2,
    Loader2, CheckCircle, XCircle, Clock3, MessageCircle, Phone,
    CreditCard, Receipt, QrCode, AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookingsApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
    PENDING: { label: "Menunggu Pembayaran", color: "text-yellow-700", bgColor: "bg-yellow-50 border-yellow-200", icon: Clock3 },
    OPEN: { label: "Menunggu Peserta", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200", icon: Users },
    CONFIRMED: { label: "Terkonfirmasi", color: "text-green-700", bgColor: "bg-green-50 border-green-200", icon: CheckCircle },
    COMPLETED: { label: "Selesai", color: "text-gray-700", bgColor: "bg-gray-50 border-gray-200", icon: CheckCircle },
    CANCELLED: { label: "Dibatalkan", color: "text-red-700", bgColor: "bg-red-50 border-red-200", icon: XCircle },
};

export default function BookingDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchBooking();
        }
    }, [params.id]);

    const fetchBooking = async () => {
        try {
            const response = await bookingsApi.getById(params.id as string);
            setBooking(response.data);
        } catch (error) {
            console.error("Error fetching booking:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-24 flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-[#F5B800] animate-spin" />
                </div>
            </main>
        );
    }

    if (!booking) {
        return (
            <main className="min-h-screen bg-[#F7F8FA]">
                <Navbar />
                <div className="pt-24 pb-12">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <AlertCircle className="w-20 h-20 mx-auto text-red-400 mb-4" />
                        <h1 className="text-2xl font-bold text-[#1A2744] mb-2">Booking tidak ditemukan</h1>
                        <p className="text-[#8A95A5] mb-6">Booking yang kamu cari tidak ada atau sudah dihapus</p>
                        <Link href="/bookings">
                            <Button>Kembali ke Riwayat</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    const status = statusConfig[booking.status] || statusConfig.PENDING;
    const StatusIcon = status.icon;

    return (
        <main className="min-h-screen bg-[#F7F8FA]">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-6"
                    >
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-[#8A95A5] hover:text-[#1A2744] mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Kembali
                        </button>
                    </motion.div>

                    {/* Status Banner */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`p-6 rounded-2xl border-2 ${status.bgColor} mb-6`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${status.color} bg-white`}>
                                <StatusIcon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className={`text-sm ${status.color}`}>Status Booking</p>
                                <p className={`text-xl font-bold ${status.color}`}>{status.label}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Booking Info Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="p-6 mb-6">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#344D7A] to-[#1A2744] flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-10 h-10 text-[#F5B800]" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-[#1A2744]">{booking.venue?.name}</h1>
                                    <p className="text-[#8A95A5] flex items-center gap-2 mt-1">
                                        <MapPin className="w-4 h-4" />
                                        {booking.venue?.address}, {booking.venue?.city}
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                                    <Calendar className="w-5 h-5 text-[#344D7A]" />
                                    <div>
                                        <p className="text-xs text-[#8A95A5]">Tanggal</p>
                                        <p className="font-semibold text-[#1A2744]">{formatDate(booking.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                                    <Clock className="w-5 h-5 text-[#344D7A]" />
                                    <div>
                                        <p className="text-xs text-[#8A95A5]">Waktu</p>
                                        <p className="font-semibold text-[#1A2744]">{booking.startTime} - {booking.endTime}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Payment Details */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-6 mb-6">
                            <h2 className="text-lg font-bold text-[#1A2744] mb-4 flex items-center gap-2">
                                <Receipt className="w-5 h-5 text-[#F5B800]" />
                                Detail Pembayaran
                            </h2>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-[#8A95A5]">Harga Sewa</span>
                                    <span className="text-[#1A2744]">{formatCurrency(booking.totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#8A95A5]">Biaya Layanan</span>
                                    <span className="text-[#1A2744]">Rp 0</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="font-bold text-[#1A2744]">Total</span>
                                    <span className="font-bold text-[#F5B800] text-xl">{formatCurrency(booking.totalPrice)}</span>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* QR Code (if confirmed) */}
                    {booking.status === "CONFIRMED" && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6 mb-6 text-center">
                                <h2 className="text-lg font-bold text-[#1A2744] mb-4">QR Code Check-in</h2>
                                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                                    <QrCode className="w-24 h-24 text-[#344D7A]" />
                                </div>
                                <p className="text-sm text-[#8A95A5]">Tunjukkan QR code ini ke petugas venue saat check-in</p>
                            </Card>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-3"
                    >
                        {booking.status === "PENDING" && (
                            <Button size="lg" className="flex-1">
                                <CreditCard className="w-5 h-5 mr-2" />
                                Bayar Sekarang
                            </Button>
                        )}
                        <Button variant="outline" size="lg" className="flex-1">
                            <Download className="w-5 h-5 mr-2" />
                            Download Receipt
                        </Button>
                        <Button variant="outline" size="lg">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </motion.div>

                    {/* Contact Venue */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6"
                    >
                        <Card className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#1A2744]">Hubungi Venue</p>
                                    <p className="text-sm text-[#8A95A5]">Ada pertanyaan? Chat langsung</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                <Phone className="w-4 h-4 mr-2" />
                                Hubungi
                            </Button>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
