"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Star, ArrowLeft, MessageCircle, ThumbsUp, TrendingUp,
    Filter, ChevronDown
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const reviews = [
    {
        id: "1",
        customer: { name: "Ahmad Pratama", avatar: "A" },
        venue: "Lapangan Futsal A",
        rating: 5,
        comment: "Lapangan sangat bagus dan bersih! Rumput sintetisnya nyaman, fasilitas lengkap. Pasti akan booking lagi!",
        date: "2026-01-15",
        replied: false,
    },
    {
        id: "2",
        customer: { name: "Budi Santoso", avatar: "B" },
        venue: "Lapangan Futsal B",
        rating: 4,
        comment: "Overall oke, tapi AC di ruang gantinya agak kurang dingin. Lapangannya sih mantap.",
        date: "2026-01-14",
        replied: true,
        reply: "Terima kasih feedbacknya! Kami akan segera perbaiki AC nya.",
    },
    {
        id: "3",
        customer: { name: "Charlie Wijaya", avatar: "C" },
        venue: "Lapangan Badminton",
        rating: 5,
        comment: "Top banget! Lantai bersih, pencahayaan bagus, dan lokasinya strategis.",
        date: "2026-01-13",
        replied: false,
    },
    {
        id: "4",
        customer: { name: "David Hadiyanto", avatar: "D" },
        venue: "Lapangan Futsal A",
        rating: 3,
        comment: "Lumayan, tapi parkir agak susah kalau weekend. Lapangannya bagus.",
        date: "2026-01-10",
        replied: true,
        reply: "Terima kasih! Kami sedang berupaya menambah area parkir.",
    },
];

const ratingBreakdown = [
    { stars: 5, count: 45, percentage: 60 },
    { stars: 4, count: 22, percentage: 29 },
    { stars: 3, count: 6, percentage: 8 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 0, percentage: 0 },
];

export default function PengelolaReviewsPage() {
    const [filter, setFilter] = useState("all");
    const [replyText, setReplyText] = useState<Record<string, string>>({});
    const [showReplyFor, setShowReplyFor] = useState<string | null>(null);

    const averageRating = 4.5;
    const totalReviews = 75;

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
                            <Star className="w-8 h-8 text-[#F5B800]" />
                            Review Pelanggan
                        </h1>
                        <p className="text-[#8A95A5] mt-1">Lihat dan tanggapi review dari pelanggan</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Rating Summary */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-6">
                                <div className="text-center mb-6">
                                    <p className="text-5xl font-bold text-[#1A2744]">{averageRating}</p>
                                    <div className="flex justify-center gap-1 my-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-5 h-5 ${star <= Math.round(averageRating) ? "text-[#F5B800] fill-[#F5B800]" : "text-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[#8A95A5] text-sm">{totalReviews} review</p>
                                </div>

                                <div className="space-y-2">
                                    {ratingBreakdown.map((item) => (
                                        <div key={item.stars} className="flex items-center gap-2">
                                            <span className="text-sm text-[#8A95A5] w-4">{item.stars}</span>
                                            <Star className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#F5B800] rounded-full"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-[#8A95A5] w-8">{item.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Reviews List */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-2 space-y-4"
                        >
                            {/* Filter */}
                            <div className="flex gap-2">
                                {["all", "unreplied", "5", "4", "3"].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f
                                                ? "bg-[#F5B800] text-[#1A2744]"
                                                : "bg-white text-[#8A95A5] hover:bg-gray-100"
                                            }`}
                                    >
                                        {f === "all" ? "Semua" : f === "unreplied" ? "Belum Dibalas" : `${f} ⭐`}
                                    </button>
                                ))}
                            </div>

                            {/* Review Cards */}
                            {reviews.map((review) => (
                                <Card key={review.id} className="p-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] flex items-center justify-center text-[#1A2744] font-bold flex-shrink-0">
                                            {review.customer.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <div>
                                                    <p className="font-semibold text-[#1A2744]">{review.customer.name}</p>
                                                    <p className="text-sm text-[#8A95A5]">{review.venue}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`w-4 h-4 ${star <= review.rating ? "text-[#F5B800] fill-[#F5B800]" : "text-gray-200"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-[#8A95A5] mt-1">{review.date}</p>
                                                </div>
                                            </div>
                                            <p className="text-[#1A2744] mt-2">{review.comment}</p>

                                            {/* Reply Section */}
                                            {review.replied && review.reply && (
                                                <div className="mt-3 p-3 bg-[#F7F8FA] rounded-xl">
                                                    <p className="text-sm font-medium text-[#344D7A]">Balasan Anda:</p>
                                                    <p className="text-sm text-[#8A95A5]">{review.reply}</p>
                                                </div>
                                            )}

                                            {!review.replied && (
                                                <>
                                                    {showReplyFor === review.id ? (
                                                        <div className="mt-3">
                                                            <textarea
                                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-[#F5B800] outline-none text-sm resize-none"
                                                                rows={2}
                                                                placeholder="Tulis balasan..."
                                                                value={replyText[review.id] || ""}
                                                                onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                                                            />
                                                            <div className="flex gap-2 mt-2">
                                                                <Button variant="outline" size="sm" onClick={() => setShowReplyFor(null)}>
                                                                    Batal
                                                                </Button>
                                                                <Button size="sm">Kirim Balasan</Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => setShowReplyFor(review.id)}
                                                            className="mt-3 flex items-center gap-1 text-sm text-[#344D7A] hover:text-[#F5B800] font-medium"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            Balas
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </main>
    );
}
