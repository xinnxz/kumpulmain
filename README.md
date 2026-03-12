<div align="center">
  <h1>🎯 KumpulMain.id</h1>
  <p><strong>Platform booking lapangan olahraga dengan fitur Main Bareng (Joinan).</strong></p>

  <!-- Badges -->
  <a href="https://github.com/xinnxz/kumpulmain/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg" alt="Node version">
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-14+-black.svg?style=flat&logo=next.js" alt="Next.js">
  </a>
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJS-10+-red.svg?style=flat&logo=nestjs" alt="NestJS">
  </a>
</div>

<br />

KumpulMain.id adalah platform inovatif yang memudahkan pengguna untuk melakukan booking lapangan olahraga dan mencari teman bermain (fitur *joinan* / main bareng). Proyek ini menggunakan arsitektur monorepo yang memisahkan antara frontend dan backend.

## ✨ Fitur Utama (Features)

- 🏟️ **Booking Lapangan**: Sistem pemesanan lapangan olahraga yang mudah dan cepat.
- 🤝 **Main Bareng (Joinan)**: Fitur sosial untuk mencari teman main jika anggota tim kurang.
- 💳 **Pembayaran Terintegrasi**: Integrasi dengan Midtrans untuk berbagai metode pembayaran.
- 📱 **Desain Responsif**: Antarmuka yang ramah pengguna baik di desktop maupun perangkat mobile.

## 🏗️ Struktur Proyek (Architecture)

Proyek ini menggunakan struktur monorepo:

```text
kumpulmain/
├── booking-web/    # Frontend (Next.js 14+, Tailwind CSS, Framer Motion)
├── booking-api/    # Backend (NestJS, Prisma, PostgreSQL)
└── docs/           # Dokumentasi tambahan API & Sistem
```

## 🚀 Memulai Pengembangan (Quick Start)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

### 1. Prasyarat (Prerequisites)
Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
- [PostgreSQL](https://www.postgresql.org/)
- Akun [Midtrans](https://midtrans.com/) (untuk payment gateway testing)

### 2. Instalasi (Installation)
Clone repositori ini dan instal semua dependensi untuk web dan api sekaligus:

```bash
git clone https://github.com/xinnxz/kumpulmain.git
cd kumpulmain
npm install
```

### 3. Konfigurasi Environment Variables
Buat file env `.env.local` untuk web dan `.env` untuk api di masing-masing direktori proyek.

**`booking-web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**`booking-api/.env`**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/booking_db"
JWT_SECRET="your-secret-key-super-aman"
JWT_EXPIRATION="7d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### 4. Menjalankan Server
Anda dapat menjalankan frontend dan backend secara bersamaan menggunakan script monorepo bawaan:

```bash
# Menjalankan frontend (Next.js - Port 3000)
npm run dev:web

# Menjalankan backend (NestJS - Port 3001)
npm run dev:api
```

## 🛠️ Stack Teknologi (Tech Stack)

| Bagian | Teknologi |
| ------ | --------- |
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | NestJS, Prisma ORM, PostgreSQL |
| **Payment Gateway** | Midtrans |
| **Deployment** | Vercel (Web), Railway (API) |

## 🌍 Deployment

- **Frontend**: Di-deploy secara otomatis ke Vercel melalui direktori `booking-web`.
- **Backend**: Di-deploy secara otomatis ke Railway melalui direktori `booking-api`.

## 🤝 Kontribusi (Contributing)

Kami sangat menyambut kontribusi dari siapa pun! Silakan baca [CONTRIBUTING.md](CONTRIBUTING.md) untuk detail mengenai kode etik kami, dan proses untuk mengirimkan *Pull Request* kepada kami.

## 📄 Lisensi (License)

Proyek ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detailnya.

---
*Dibuat dengan ❤️ oleh [xinnxz](https://github.com/xinnxz) dan kontributor.*
