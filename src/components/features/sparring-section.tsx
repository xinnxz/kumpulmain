"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageCircle, Handshake, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SparringSection() {
    return (
        <section className="py-20 bg-[#F7F8FA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                            🤝 Main Bareng
                        </span>
                        <h2 className="text-3xl font-bold text-[#1A2744] mb-4">
                            Cari lawan sparring
                            <br />
                            <span className="text-[#F5B800]">simpel.</span>
                        </h2>
                        <p className="text-[#5A6A7E] mb-8 leading-relaxed">
                            Buat undangan main bareng, cari teman olahraga baru, bisa patungan juga. Dengan fitur Main Bareng, olahraga jadi lebih hemat!
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { icon: Users, text: "Cari teman main", color: "bg-blue-100 text-blue-600" },
                                { icon: MessageCircle, text: "Chat langsung", color: "bg-purple-100 text-purple-600" },
                                { icon: Handshake, text: "Patungan biaya", color: "bg-emerald-100 text-emerald-600" },
                                { icon: Zap, text: "Join instan", color: "bg-[#F5B800]/20 text-[#D99A00]" },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
                                    <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center`}>
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[#1A2744] text-sm font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/joinan">
                            <Button variant="accent" size="lg">
                                Cari Teman Main
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Right - Image with Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 relative"
                    >
                        {/* Phone Mockup */}
                        <div className="relative mx-auto w-72">
                            <div className="bg-[#1A2744] rounded-[3rem] p-2 shadow-2xl">
                                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                                    <Image
                                        src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80"
                                        alt="Main Bareng App"
                                        width={280}
                                        height={560}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -left-8 top-20 bg-white rounded-xl p-4 shadow-lg border border-[#E4E8ED]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5B800] to-[#FFD740] border-2 border-white flex items-center justify-center">
                                                <span className="text-[#1A2744] text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-[#1A2744] text-sm font-bold">+5 Lagi</p>
                                        <p className="text-[#8A95A5] text-xs">mau join</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute -right-8 bottom-32 bg-[#F5B800] rounded-xl p-4 shadow-lg"
                            >
                                <p className="text-[#1A2744] font-bold">Futsal Sore</p>
                                <p className="text-[#1A2744]/70 text-sm">4/10 slot terisi</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
