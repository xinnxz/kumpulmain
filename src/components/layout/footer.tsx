import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-[#A30D2D] flex items-center justify-center">
                                <span className="text-lg font-bold text-white">K</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Kumpul<span className="text-[#A30D2D]">Main</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Platform booking lapangan dan main bareng terpercaya di Indonesia.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#A30D2D] hover:text-white transition-all">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#A30D2D] hover:text-white transition-all">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#A30D2D] hover:text-white transition-all">
                                <Facebook className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4 text-sm">Layanan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/venues" className="text-gray-500 hover:text-[#A30D2D] transition-colors text-sm">Cari Venue</Link></li>
                            <li><Link href="/joinan" className="text-gray-500 hover:text-[#A30D2D] transition-colors text-sm">Main Bareng</Link></li>
                            <li><Link href="/register?role=pengelola" className="text-gray-500 hover:text-[#A30D2D] transition-colors text-sm">Daftarkan Venue</Link></li>
                        </ul>
                    </div>

                    {/* Perusahaan */}
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4 text-sm">Perusahaan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-gray-500 hover:text-[#A30D2D] transition-colors text-sm">Tentang Kami</Link></li>
                            <li><Link href="/contact" className="text-gray-500 hover:text-[#A30D2D] transition-colors text-sm">Hubungi Kami</Link></li>
                            <li><Link href="/faq" className="text-gray-500 hover:text-[#A30D2D] transition-colors text-sm">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4 text-sm">Kontak</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2 text-gray-500 text-sm">
                                <MapPin className="h-4 w-4 mt-0.5 text-[#A30D2D] flex-shrink-0" />
                                <span>Jakarta, Indonesia</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-500 text-sm">
                                <Phone className="h-4 w-4 text-[#A30D2D]" />
                                <span>021-1234-5678</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-500 text-sm">
                                <Mail className="h-4 w-4 text-[#A30D2D]" />
                                <span>hello@kumpulmain.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <p className="text-gray-400 text-sm">
                        © 2024 KumpulMain.id. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-gray-400 hover:text-gray-600 text-sm">Kebijakan Privasi</Link>
                        <Link href="/terms" className="text-gray-400 hover:text-gray-600 text-sm">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
