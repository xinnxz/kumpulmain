import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                <span className="text-xl font-bold text-white">K</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                kumpul<span className="text-emerald-400">main</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Platform booking lapangan dan main bareng #1 di Indonesia. Temukan lapangan terdekat,
                            buat undangan, dan main bareng teman baru!
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Layanan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/venues" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Cari Lapangan</Link></li>
                            <li><Link href="/joinan" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Main Bareng</Link></li>
                            <li><Link href="/register?role=pengelola" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Daftarkan Lapangan</Link></li>
                            <li><Link href="/pricing" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Harga</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Tentang Kami</Link></li>
                            <li><Link href="/careers" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Karir</Link></li>
                            <li><Link href="/blog" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Blog</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors text-sm">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Kontak</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-slate-400 text-sm">
                                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                <span>Jl. Sudirman No. 10, Jakarta Selatan</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400 text-sm">
                                <Phone className="h-5 w-5 text-emerald-500" />
                                <span>021-1234-5678</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400 text-sm">
                                <Mail className="h-5 w-5 text-emerald-500" />
                                <span>hello@kumpulmain.id</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-slate-500 text-sm">
                        © 2024 KumpulMain.id. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
