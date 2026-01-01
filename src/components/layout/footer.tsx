import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-[#1A2744] text-white">
            {/* CTA Section */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Siap untuk main?</h3>
                            <p className="text-white/70">Daftar sekarang dan dapatkan promo booking pertama!</p>
                        </div>
                        <Link href="/register">
                            <Button variant="accent" size="lg">
                                Daftar Gratis Sekarang
                                <Send className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-5">
                        <Link href="/" className="flex items-center space-x-3">
                            {/* Logo with white background for dark section */}
                            <div className="relative w-12 h-12 bg-white rounded-xl p-1.5">
                                <Image
                                    src="/logo.png"
                                    alt="KumpulMain"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold">
                                <span className="text-white">Kumpul</span>
                                <span className="text-[#F5B800]">Main</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Platform booking lapangan dan main bareng terpercaya di Indonesia. Temukan venue, booking instan, dan nikmati olahraga bersama!
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#F5B800] hover:text-[#1A2744] transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#F5B800] hover:text-[#1A2744] transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#F5B800] hover:text-[#1A2744] transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#F5B800] hover:text-[#1A2744] transition-all">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h4 className="text-[#F5B800] font-semibold mb-5 text-sm uppercase tracking-wider">Layanan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/venues" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Cari Venue</Link></li>
                            <li><Link href="/joinan" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Main Bareng</Link></li>
                            <li><Link href="/register?role=pengelola" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Daftarkan Venue</Link></li>
                            <li><Link href="/promo" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Promo & Diskon</Link></li>
                        </ul>
                    </div>

                    {/* Perusahaan */}
                    <div>
                        <h4 className="text-[#F5B800] font-semibold mb-5 text-sm uppercase tracking-wider">Perusahaan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Tentang Kami</Link></li>
                            <li><Link href="/careers" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Karir</Link></li>
                            <li><Link href="/blog" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">Blog</Link></li>
                            <li><Link href="/faq" className="text-white/60 hover:text-[#F5B800] transition-colors text-sm">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 className="text-[#F5B800] font-semibold mb-5 text-sm uppercase tracking-wider">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-white/60 text-sm">
                                <MapPin className="h-5 w-5 text-[#F5B800] flex-shrink-0 mt-0.5" />
                                <span>Jl. Sudirman No. 123<br />Jakarta Pusat, 10220</span>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60 text-sm">
                                <Phone className="h-5 w-5 text-[#F5B800]" />
                                <span>021-1234-5678</span>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60 text-sm">
                                <Mail className="h-5 w-5 text-[#F5B800]" />
                                <span>hello@kumpulmain.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-white/40 text-sm">
                        © 2024 KumpulMain.id. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors">Kebijakan Privasi</Link>
                        <Link href="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors">Syarat & Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
