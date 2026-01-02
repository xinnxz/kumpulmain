"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trophy, ChevronRight } from "lucide-react";

const competitions = [
    {
        id: 1,
        title: "Liga Futsal Jakarta 2024",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80",
        category: "Futsal",
        teams: 16,
    },
    {
        id: 2,
        title: "Turnamen Badminton Cup",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&q=80",
        category: "Badminton",
        teams: 32,
    },
    {
        id: 3,
        title: "Basketball Champions",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
        category: "Basketball",
        teams: 12,
    },
    {
        id: 4,
        title: "Tennis Open Series",
        image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&q=80",
        category: "Tennis",
        teams: 24,
    },
];

export function CompetitionSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-[#F5B800]/10 text-[#344D7A] text-sm font-semibold mb-4"
                    >
                        🏆 Kompetisi
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-[#1A2744] mb-4"
                    >
                        Cari kompetisi terbaik untuk tim Anda!
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[#5A6A7E]"
                    >
                        Ikuti berbagai kompetisi olahraga dan buktikan kemampuan tim Anda
                    </motion.p>
                </div>

                {/* Competition Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {competitions.map((comp, index) => (
                        <motion.div
                            key={comp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/competitions/${comp.id}`} className="group block">
                                <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                    <Image
                                        src={comp.image}
                                        alt={comp.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A2744]/80 to-transparent" />

                                    {/* Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 rounded-lg bg-[#F5B800] text-[#1A2744] text-xs font-bold">
                                            {comp.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                        <h3 className="font-bold text-lg mb-1 line-clamp-1">{comp.title}</h3>
                                        <div className="flex items-center text-white/80 text-sm">
                                            <Trophy className="h-4 w-4 mr-1" />
                                            {comp.teams} Tim
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center">
                    <Link
                        href="/competitions"
                        className="inline-flex items-center text-[#344D7A] hover:text-[#F5B800] font-semibold transition-colors"
                    >
                        Lihat Semua Kompetisi
                        <ChevronRight className="h-5 w-5 ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
