"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        question: "Apa keuntungan booking venue di KumpulMain?",
        answer: "Dengan KumpulMain, kamu bisa booking venue olahraga kapan saja, dimana saja. Prosesnya cepat, mudah, dan langsung konfirmasi. Plus, kamu bisa ikut main bareng dengan pemain lain jika belum punya tim lengkap!"
    },
    {
        question: "Bagaimana cara memesan lapangan di KumpulMain?",
        answer: "Sangat mudah! Pilih venue yang kamu inginkan, pilih tanggal dan jam main, lakukan pembayaran, dan langsung dapat konfirmasi. Booking bisa dilakukan H-14 sampai hari H."
    },
    {
        question: "Apa jenis olahraga yang bisa di booking di KumpulMain?",
        answer: "Saat ini tersedia Futsal, Badminton, Basket, Tennis, dan berbagai olahraga lainnya. Kami terus menambah venue partner untuk lebih banyak pilihan olahraga."
    },
    {
        question: "Apakah bisa membatalkan pemesanan dan mendapat refund?",
        answer: "Kebijakan pembatalan tergantung masing-masing venue. Umumnya pembatalan H-1 atau lebih awal akan mendapat refund penuh. Silakan cek kebijakan venue sebelum booking."
    },
    {
        question: "Bagaimana cara menjadi partner venue di KumpulMain?",
        answer: "Tertarik mendaftarkan venue kamu? Klik menu 'Partner Venue' dan isi formulir pendaftaran. Tim kami akan menghubungi untuk proses verifikasi dan onboarding."
    },
    {
        question: "Bagaimana proses melakukan pembayaran booking untuk lapangan?",
        answer: "Kami menerima berbagai metode pembayaran: transfer bank, e-wallet (OVO, GoPay, DANA), dan kartu kredit/debit. Pembayaran dijamin aman dan terenkripsi."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5B800] to-[#FFD740] mb-6">
                        <HelpCircle className="h-8 w-8 text-[#344D7A]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#1A2744] mb-3">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-[#5A6A7E]">
                        Temukan jawaban untuk pertanyaan umum seputar KumpulMain
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqItems.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div
                                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                        ? "border-[#F5B800] bg-[#F5B800]/5 shadow-lg shadow-[#F5B800]/10"
                                        : "border-[#E4E8ED] bg-white hover:border-[#344D7A]/20"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <span className={`font-semibold transition-colors ${openIndex === index ? "text-[#344D7A]" : "text-[#1A2744]"
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center ${openIndex === index
                                                ? "bg-[#F5B800] text-[#344D7A]"
                                                : "bg-[#F7F8FA] text-[#5A6A7E]"
                                            }`}
                                    >
                                        <ChevronDown className="h-5 w-5" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-5 pb-5">
                                                <p className="text-[#5A6A7E] leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
