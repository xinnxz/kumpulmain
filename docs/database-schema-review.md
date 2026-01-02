# Database Schema Review - KumpulMain.id
**Tanggal:** 2 Januari 2026  
**Versi:** 1.0

---

## 📊 Ringkasan Schema Saat Ini

### Models yang Ada

| Model | Tujuan | Keterangan |
|-------|--------|------------|
| **User** | User accounts | 3 role: USER, PENGELOLA, ADMIN |
| **Venue** | Data lapangan | Termasuk harga, fasilitas, gambar |
| **VenueSchedule** | Jam operasional | Per hari dalam seminggu |
| **VenueBlockedDate** | Tanggal tutup | Untuk hari libur khusus |
| **Booking** | Booking lapangan | Include fitur joinan |
| **BookingParticipant** | Peserta joinan | Track pembayaran per orang |
| **Payment** | Transaksi | Integrasi Midtrans |
| **Notification** | Notifikasi | Push notification |
| **ChatRoom** | Chat room | Per booking |
| **Message** | Pesan chat | Dalam chat room |

**Total: 10 Models**

---

## ✅ Hal yang Sudah Baik

1. **UUID untuk Primary Keys** - Bagus untuk distributed system dan scalability
2. **Proper Indexes** - Sudah ada index untuk city, venueType, date
3. **Composite Unique Constraints** - Contoh: BookingParticipant(bookingId, userId)
4. **Soft Delete Pattern** - Field `isActive` untuk User dan Venue
5. **Cascade Deletes** - Relasi dependency sudah tepat
6. **Invite Code System** - Unique code untuk private invitation

---

## ⚠️ Area yang Perlu Perbaikan untuk Scale Up

### 1. Payment Gateway - Single Provider

**Kondisi Saat Ini:**
```prisma
model Payment {
  midtransOrderId String @unique
  snapToken       String?
  paymentType     String?
}
```

**Masalah:**
- Hanya mendukung Midtrans
- Jika ingin menambah Xendit, GoPay, OVO = perlu refactor besar

**Solusi yang Disarankan:**
```prisma
enum PaymentProvider {
  MIDTRANS
  XENDIT
  MANUAL   // Transfer Bank / pembayaran di tempat
}

model Payment {
  provider        PaymentProvider
  externalOrderId String  // ID generik untuk semua gateway
  externalData    Json?   // Data spesifik per provider
}
```

**Prioritas:** 🟡 Medium

---

### 2. Review & Rating System - Tidak Ada

**Kondisi Saat Ini:** Tidak ada model untuk review/rating.

**Dampak:**
- User tidak bisa melihat kualitas venue sebelum booking
- Venue tidak punya social proof
- Search ranking tidak bisa berdasarkan rating
- Sulit membedakan venue berkualitas

**Solusi yang Disarankan:**
```prisma
model Review {
  id            String   @id @default(uuid())
  userId        String
  venueId       String
  bookingId     String   @unique  // 1 booking = 1 review
  rating        Int      // 1-5
  comment       String?
  photos        String[]
  isVerified    Boolean  @default(false)
  createdAt     DateTime @default(now())
  
  user    User    @relation(fields: [userId], references: [id])
  venue   Venue   @relation(fields: [venueId], references: [id])
  booking Booking @relation(fields: [bookingId], references: [id])
  
  @@index([venueId, rating])
  @@index([createdAt])
}

// Tambahan di Venue
model Venue {
  // ... field yang sudah ada
  avgRating     Float?   // Denormalized untuk performa
  totalReviews  Int      @default(0)
}
```

**Prioritas:** 🟡 Medium

---

### 3. Payout System - Tidak Ada

**Kondisi Saat Ini:** Tidak ada tracking pencairan dana ke pengelola.

**Dampak:**
- Tidak bisa audit berapa yang sudah dibayar ke pengelola
- Tidak ada history transaksi keluar
- Sulit untuk laporan keuangan
- Potensi dispute dengan pengelola

**Solusi yang Disarankan:**
```prisma
enum PayoutStatus {
  PENDING     // Menunggu diproses
  PROCESSING  // Sedang diproses
  COMPLETED   // Sudah transfer
  FAILED      // Gagal
}

model Payout {
  id            String       @id @default(uuid())
  managerId     String       // Pengelola
  amount        Int          // Total booking
  platformFee   Int          // Komisi platform
  netAmount     Int          // Yang diterima pengelola
  bankAccount   String?      // Nomor rekening
  bankName      String?      // Nama bank
  status        PayoutStatus @default(PENDING)
  processedAt   DateTime?
  proofImage    String?      // Bukti transfer
  notes         String?
  createdAt     DateTime     @default(now())
  
  bookings      PayoutBooking[]
  manager       User         @relation(fields: [managerId], references: [id])
  
  @@index([managerId])
  @@index([status])
}

model PayoutBooking {
  payoutId    String
  bookingId   String
  amount      Int
  
  payout      Payout  @relation(fields: [payoutId], references: [id])
  booking     Booking @relation(fields: [bookingId], references: [id])
  
  @@id([payoutId, bookingId])
}
```

**Prioritas:** 🔴 High

---

### 4. Commission/Fee Configuration - Hardcoded

**Kondisi Saat Ini:** Tidak ada model untuk menyimpan rate komisi platform.

**Masalah:**
- Komisi hardcoded di kode
- Sulit jika komisi berbeda per venue/kategori
- Tidak ada history perubahan rate
- Admin tidak bisa ubah tanpa deploy ulang

**Solusi yang Disarankan:**
```prisma
model PlatformConfig {
  id              String   @id @default(uuid())
  key             String   @unique  // e.g., "commission_rate"
  value           String
  description     String?
  updatedAt       DateTime @updatedAt
  updatedBy       String?
}

// Atau per-venue commission
model Venue {
  // ... field yang sudah ada
  commissionRate  Float    @default(0.10)  // 10% default
}
```

**Prioritas:** 🟢 Low

---

### 5. Audit Trail - Tidak Ada

**Kondisi Saat Ini:** Tidak ada logging untuk aksi admin/sistem.

**Masalah:**
- Tidak ada log siapa approve/reject venue
- Tidak ada track perubahan status booking oleh admin
- Sulit debugging masalah
- Tidak ada accountability

**Solusi yang Disarankan:**
```prisma
model AuditLog {
  id          String   @id @default(uuid())
  userId      String   // Siapa yang melakukan aksi
  action      String   // "VENUE_APPROVED", "BOOKING_CANCELLED", dll
  entityType  String   // "Venue", "Booking", "User"
  entityId    String   // ID dari entity
  oldValue    Json?    // Nilai sebelum
  newValue    Json?    // Nilai sesudah
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id])
  
  @@index([entityType, entityId])
  @@index([userId])
  @@index([createdAt])
  @@index([action])
}
```

**Prioritas:** 🟡 Medium

---

### 6. Sport Categories - String Based

**Kondisi Saat Ini:**
```prisma
venueType String?  // futsal, badminton, basket, dll
```

**Masalah:**
- Typo beda-beda: "futsal" vs "Futsal" vs "FUTSAL"
- Tidak konsisten
- Tidak bisa tambah metadata per kategori (icon, durasi default, dll)
- Sulit untuk filtering yang akurat

**Solusi yang Disarankan:**
```prisma
model SportType {
  id              String   @id @default(uuid())
  name            String   @unique  // "futsal" (slug)
  displayName     String   // "Futsal" (tampilan)
  icon            String?  // URL icon
  defaultDuration Int      @default(60)  // Default 60 menit
  minPlayers      Int?     // Minimum pemain
  maxPlayers      Int?     // Maximum pemain
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  
  venues          Venue[]
}

// Perubahan di Venue
model Venue {
  // Ganti dari: venueType String?
  sportTypeId   String?
  sportType     SportType? @relation(fields: [sportTypeId], references: [id])
}
```

**Prioritas:** 🟢 Low

---

### 7. Location/Geo Data - Basic Only

**Kondisi Saat Ini:**
```prisma
address  String
city     String?
```

**Masalah:**
- Tidak bisa search "venue terdekat"
- Tidak bisa filter by provinsi/kecamatan
- Tidak bisa integrasi maps

**Solusi yang Disarankan:**
```prisma
model Venue {
  // ... field yang sudah ada
  
  // Tambahan geo data
  latitude      Float?
  longitude     Float?
  province      String?    // Provinsi
  district      String?    // Kecamatan
  postalCode    String?    // Kode pos
  
  @@index([city])
  @@index([province])
  @@index([latitude, longitude])
}
```

**Prioritas:** 🟢 Low (untuk fitur maps nanti)

---

## 📋 Ringkasan Prioritas

| No | Issue | Priority | Effort | Impact |
|----|-------|----------|--------|--------|
| 1 | Payout System | 🔴 High | Medium | Keuangan & Trust |
| 2 | Review System | 🟡 Medium | Medium | User Experience |
| 3 | Audit Trail | 🟡 Medium | Low | Compliance |
| 4 | Multi Payment | 🟡 Medium | High | Flexibility |
| 5 | Commission Config | 🟢 Low | Low | Admin Control |
| 6 | Sport Categories | 🟢 Low | Low | Data Quality |
| 7 | Geo Location | 🟢 Low | Low | Future Feature |

---

## 🎯 Rekomendasi Tahapan

### Phase 1: Pre-Launch (Critical)
✅ **Payout System** - Wajib ada sebelum launch untuk tracking keuangan

### Phase 2: Growth Phase
✅ **Review System** - Untuk social proof dan user trust  
✅ **Audit Trail** - Untuk compliance dan debugging

### Phase 3: Scale Phase
✅ **Multi Payment Gateway** - Jika Midtrans tidak cukup  
✅ **Geo Search** - Jika expand ke banyak kota  
✅ **Sport Categories** - Untuk better filtering

---

## ❓ Pertanyaan Diskusi

1. **Pencairan Dana:** Bagaimana pengelola menerima uang saat ini? Manual transfer atau ada sistem?

2. **Review Priority:** Apakah fitur review/rating masuk MVP atau nanti?

3. **Payment Gateway:** Selain Midtrans, ada rencana pakai Xendit, GoPay, OVO?

4. **Lokasi:** Apakah fitur "venue terdekat" / map integration diperlukan?

5. **Admin Logging:** Untuk keperluan audit, perlu track semua aksi admin?

---

## 📝 Notes

- Schema saat ini sudah cukup solid untuk MVP
- Perubahan di atas bisa dilakukan incremental
- Tidak ada breaking changes yang major
- Fokus utama: **Payout System** karena menyangkut uang

---

*Document Version: 1.0*  
*Generated: 2 Januari 2026*
