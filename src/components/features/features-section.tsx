"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Users, CreditCard, Shield, MessageCircle } from "lucide-react";

const features = [
    {
        icon: Search,
        title: "Cari Venue",
        description: "Temukan venue olahraga terdekat dengan filter lokasi dan jenis.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Calendar,
        title: "Booking Online",
        description: "Booking langsung online tanpa perlu telepon atau datang ke lokasi.",
        color: "bg-green-50 text-green-600",
    },
    {
        icon: Users,
        title: "Main Bareng",
        description: "Buat atau join undangan main bareng dengan pemain lain.",
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: CreditCard,
        title: "Bayar Mudah",
        description: "Pembayaran online yang aman dan mudah via berbagai metode.",
        color: "bg-orange-50 text-orange-600",
    },
];

export function FeaturesSection() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Kenapa KumpulMain?
                    </h2>
                    <p className="text-gray-500">
                        Platform booking lapangan yang memudahkan aktivitas olahragamu
                    </p>
                </div>

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center p-6"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
