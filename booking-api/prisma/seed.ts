/**
 * KumpulMain.id - Seed Data
 * 
 * Script untuk populate database dengan data awal:
 * - Admin user
 * - Pengelola user
 * - Customer users
 * - Sample venues dengan schedules
 */

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding KumpulMain.id database...\n');

    // =====================
    // CLEANUP EXISTING DATA
    // =====================
    console.log('🧹 Cleaning up existing venues...');
    try {
        await prisma.venueSchedule.deleteMany({});
        await prisma.venueBlockedDate.deleteMany({});
        await prisma.venue.deleteMany({});
        console.log('✅ Old venues deleted');
    } catch (e) {
        console.log('Note: Some tables may not exist yet, continuing...');
    }

    // =====================
    // CREATE USERS
    // =====================

    // Admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@kumpulmain.id' },
        update: {},
        create: {
            email: 'admin@kumpulmain.id',
            password: adminPassword,
            name: 'Administrator',
            phone: '081234567890',
            role: Role.ADMIN,
        },
    });
    console.log('✅ Admin created:', admin.email);

    // Pengelola 1
    const pengelolaPassword = await bcrypt.hash('pengelola123', 10);
    const pengelola1 = await prisma.user.upsert({
        where: { email: 'lapangan@kumpulmain.id' },
        update: {},
        create: {
            email: 'lapangan@kumpulmain.id',
            password: pengelolaPassword,
            name: 'Budi Santoso',
            phone: '081234567891',
            role: Role.PENGELOLA,
        },
    });
    console.log('✅ Pengelola 1 created:', pengelola1.email);

    // Pengelola 2
    const pengelola2 = await prisma.user.upsert({
        where: { email: 'arena@kumpulmain.id' },
        update: {},
        create: {
            email: 'arena@kumpulmain.id',
            password: pengelolaPassword,
            name: 'Dewi Lestari',
            phone: '081234567892',
            role: Role.PENGELOLA,
        },
    });
    console.log('✅ Pengelola 2 created:', pengelola2.email);

    // Customer users
    const userPassword = await bcrypt.hash('user123', 10);
    const users = [
        { email: 'andi@gmail.com', name: 'Andi Pratama', phone: '081111111111' },
        { email: 'bima@gmail.com', name: 'Bima Sakti', phone: '081222222222' },
        { email: 'citra@gmail.com', name: 'Citra Dewi', phone: '081333333333' },
    ];

    for (const u of users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                ...u,
                password: userPassword,
                role: Role.USER,
            },
        });
    }
    console.log('✅ 3 customer users created');

    // =====================
    // CREATE VENUES
    // =====================

    // Helper function to generate slug from name
    const generateSlug = (name: string): string => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    const venues = [
        // Jakarta Selatan - 8 venues
        {
            managerId: pengelola1.id,
            slug: generateSlug('Futsal Arena Senayan'),
            name: 'Futsal Arena Senayan',
            description: 'Lapangan futsal indoor premium dengan lantai vinyl FIFA standard. Dilengkapi dengan tribun penonton, ruang ganti AC, dan parkir luas.',
            address: 'Jl. Asia Afrika No. 10',
            city: 'Jakarta Selatan',
            pricePerHour: 300000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir Luas', 'Ruang Ganti AC', 'Toilet Bersih', 'Kantin', 'WiFi', 'Tribun Penonton'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Badminton Center GOR'),
            name: 'Badminton Center GOR',
            description: 'Gedung olahraga dengan 4 lapangan badminton standar internasional.',
            address: 'Jl. Gatot Subroto No. 55',
            city: 'Jakarta Selatan',
            pricePerHour: 100000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'Ruang Ganti', 'Toilet', 'Kantin'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Mini Soccer Field Kemang'),
            name: 'Mini Soccer Field Kemang',
            description: 'Lapangan mini soccer dengan rumput sintetis FIFA Quality Pro.',
            address: 'Jl. Kemang Raya No. 88',
            city: 'Jakarta Selatan',
            pricePerHour: 400000,
            capacity: 16,
            venueType: 'Soccer',
            images: [],
            facilities: ['Parkir Luas', 'Ruang Ganti', 'Shower', 'Cafe'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Tennis Court Premium'),
            name: 'Tennis Court Premium',
            description: 'Lapangan tenis dengan permukaan hard court berkualitas.',
            address: 'Jl. Senopati No. 12',
            city: 'Jakarta Selatan',
            pricePerHour: 150000,
            capacity: 4,
            venueType: 'Tennis',
            images: [],
            facilities: ['Parkir', 'Ruang Ganti', 'Ball Machine Rental'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Futsal Arena Manggarai'),
            name: 'Futsal Arena Manggarai',
            description: 'Lapangan futsal indoor standar dengan fasilitas lengkap.',
            address: 'Jl. Manggarai Raya No. 45',
            city: 'Jakarta Selatan',
            pricePerHour: 200000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir', 'Ruang Ganti', 'Toilet', 'Kantin'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Badminton Hall Kuningan'),
            name: 'Badminton Hall Kuningan',
            description: 'Gedung badminton dengan 6 lapangan standar BWF.',
            address: 'Jl. HR Rasuna Said No. 100',
            city: 'Jakarta Selatan',
            pricePerHour: 120000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'AC Sentral', 'Ruang Ganti', 'Pro Shop'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Basketball Arena TB Simatupang'),
            name: 'Basketball Arena TB Simatupang',
            description: 'Indoor basketball arena dengan kapasitas 500 penonton.',
            address: 'Jl. TB Simatupang No. 77',
            city: 'Jakarta Selatan',
            pricePerHour: 350000,
            capacity: 12,
            venueType: 'Basket',
            images: [],
            facilities: ['Parkir', 'Tribun', 'Locker Room', 'Shower'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Soccer Field Kemang Selatan'),
            name: 'Soccer Field Kemang Selatan',
            description: 'Lapangan soccer full size dengan rumput premium.',
            address: 'Jl. Kemang Selatan No. 55',
            city: 'Jakarta Selatan',
            pricePerHour: 500000,
            capacity: 22,
            venueType: 'Soccer',
            images: [],
            facilities: ['Parkir Luas', 'Lighting', 'Tribun', 'Ruang Ganti VIP'],
        },
        // Jakarta Pusat - 4 venues
        {
            managerId: pengelola2.id,
            slug: generateSlug('Basketball Court Elite'),
            name: 'Basketball Court Elite',
            description: 'Lapangan basket outdoor premium dengan ring standar NBA.',
            address: 'Jl. Sudirman Kav. 25',
            city: 'Jakarta Pusat',
            pricePerHour: 250000,
            capacity: 12,
            venueType: 'Basket',
            images: [],
            facilities: ['Parkir', 'Lighting', 'Scoring Board', 'Bench'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Tennis Club Menteng'),
            name: 'Tennis Club Menteng',
            description: 'Klub tenis ekslusif dengan 3 lapangan hard court.',
            address: 'Jl. Menteng Raya No. 20',
            city: 'Jakarta Pusat',
            pricePerHour: 200000,
            capacity: 4,
            venueType: 'Tennis',
            images: [],
            facilities: ['Parkir', 'Kolam Renang', 'Gym', 'Cafe'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Futsal Premium Thamrin'),
            name: 'Futsal Premium Thamrin',
            description: 'Lapangan futsal premium di jantung Jakarta.',
            address: 'Jl. MH Thamrin No. 50',
            city: 'Jakarta Pusat',
            pricePerHour: 350000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir Valet', 'Ruang Ganti VIP', 'Shower', 'Lounge'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Badminton Central Sarinah'),
            name: 'Badminton Central Sarinah',
            description: 'Badminton hall modern di area Sarinah.',
            address: 'Jl. Sabang No. 30',
            city: 'Jakarta Pusat',
            pricePerHour: 110000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'AC', 'Kantin', 'Pro Shop'],
        },
        // Bekasi - 5 venues
        {
            managerId: pengelola2.id,
            slug: generateSlug('Futsal Zone Bekasi'),
            name: 'Futsal Zone Bekasi',
            description: 'Pusat futsal terbesar di Bekasi dengan 8 lapangan.',
            address: 'Jl. Ahmad Yani No. 150',
            city: 'Bekasi',
            pricePerHour: 150000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir Gratis', 'Kantin', 'Mushola', 'WiFi'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Bekasi Sports Center'),
            name: 'Bekasi Sports Center',
            description: 'Pusat olahraga lengkap dengan berbagai fasilitas.',
            address: 'Jl. Harapan Indah Blok A1',
            city: 'Bekasi',
            pricePerHour: 180000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir Luas', 'Cafe', 'Gym', 'Swimming Pool'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Badminton Hall Summarecon'),
            name: 'Badminton Hall Summarecon',
            description: 'Hall badminton premium di Summarecon Bekasi.',
            address: 'Jl. Boulevard Ahmad Yani No. 88',
            city: 'Bekasi',
            pricePerHour: 95000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'AC', 'Ruang Ganti', 'Kantin'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Basket Arena Galaxy'),
            name: 'Basket Arena Galaxy',
            description: 'Lapangan basket indoor modern.',
            address: 'Jl. Raya Bekasi Timur No. 200',
            city: 'Bekasi',
            pricePerHour: 200000,
            capacity: 12,
            venueType: 'Basket',
            images: [],
            facilities: ['Parkir', 'AC', 'Scoreboard', 'Bench'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Tennis Court Bekasi'),
            name: 'Tennis Court Bekasi',
            description: 'Lapangan tenis outdoor dengan kualitas terbaik.',
            address: 'Jl. Cut Mutia No. 15',
            city: 'Bekasi',
            pricePerHour: 120000,
            capacity: 4,
            venueType: 'Tennis',
            images: [],
            facilities: ['Parkir', 'Lighting', 'Ruang Ganti'],
        },
        // Tangerang - 5 venues
        {
            managerId: pengelola1.id,
            slug: generateSlug('Badminton Plus Tangerang'),
            name: 'Badminton Plus Tangerang',
            description: 'Gedung badminton modern dengan 10 lapangan.',
            address: 'Jl. MH Thamrin Tangerang No. 80',
            city: 'Tangerang',
            pricePerHour: 90000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'AC', 'Ruang Ganti', 'Kantin'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Futsal Arena BSD'),
            name: 'Futsal Arena BSD',
            description: 'Lapangan futsal modern di kawasan BSD City.',
            address: 'Jl. Pahlawan Seribu No. 100',
            city: 'Tangerang',
            pricePerHour: 180000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir Luas', 'Ruang Ganti', 'Cafe', 'WiFi'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Soccer Field Alam Sutera'),
            name: 'Soccer Field Alam Sutera',
            description: 'Lapangan soccer berkualitas di Alam Sutera.',
            address: 'Jl. Alam Sutera Boulevard No. 50',
            city: 'Tangerang',
            pricePerHour: 450000,
            capacity: 22,
            venueType: 'Soccer',
            images: [],
            facilities: ['Parkir VIP', 'Tribun', 'Ruang Ganti', 'Shower'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Basketball Court Gading Serpong'),
            name: 'Basketball Court Gading Serpong',
            description: 'Lapangan basket outdoor premium.',
            address: 'Jl. Boulevard Gading Serpong No. 25',
            city: 'Tangerang',
            pricePerHour: 220000,
            capacity: 12,
            venueType: 'Basket',
            images: [],
            facilities: ['Parkir', 'Lighting', 'Scoring Board'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Tennis Club Tangerang'),
            name: 'Tennis Club Tangerang',
            description: 'Klub tenis dengan fasilitas lengkap.',
            address: 'Jl. Raya Serpong No. 75',
            city: 'Tangerang',
            pricePerHour: 140000,
            capacity: 4,
            venueType: 'Tennis',
            images: [],
            facilities: ['Parkir', 'Ruang Ganti', 'Cafe', 'Pro Shop'],
        },
        // Depok - 4 venues
        {
            managerId: pengelola2.id,
            slug: generateSlug('Futsal Corner Depok'),
            name: 'Futsal Corner Depok',
            description: 'Lapangan futsal favorit warga Depok.',
            address: 'Jl. Margonda Raya No. 200',
            city: 'Depok',
            pricePerHour: 140000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir', 'Ruang Ganti', 'Kantin', 'WiFi'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Badminton Hall UI'),
            name: 'Badminton Hall UI',
            description: 'Hall badminton dekat Universitas Indonesia.',
            address: 'Jl. Lenteng Agung No. 50',
            city: 'Depok',
            pricePerHour: 85000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'AC', 'Kantin', 'Mushola'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Basket Arena Depok'),
            name: 'Basket Arena Depok',
            description: 'Arena basket indoor terbaik di Depok.',
            address: 'Jl. Sawangan No. 80',
            city: 'Depok',
            pricePerHour: 180000,
            capacity: 12,
            venueType: 'Basket',
            images: [],
            facilities: ['Parkir', 'AC', 'Tribun', 'Locker'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Soccer Field Depok'),
            name: 'Soccer Field Depok',
            description: 'Lapangan sepak bola sintetis berkualitas.',
            address: 'Jl. Raya Bogor KM 30',
            city: 'Depok',
            pricePerHour: 380000,
            capacity: 22,
            venueType: 'Soccer',
            images: [],
            facilities: ['Parkir Luas', 'Lighting', 'Ruang Ganti'],
        },
        // Bogor - 4 venues
        {
            managerId: pengelola2.id,
            slug: generateSlug('Futsal Arena Bogor'),
            name: 'Futsal Arena Bogor',
            description: 'Lapangan futsal populer di Bogor.',
            address: 'Jl. Pajajaran No. 120',
            city: 'Bogor',
            pricePerHour: 130000,
            capacity: 14,
            venueType: 'Futsal',
            images: [],
            facilities: ['Parkir', 'Ruang Ganti', 'Kantin', 'Mushola'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Badminton Club Bogor'),
            name: 'Badminton Club Bogor',
            description: 'Klub badminton dengan suasana asri.',
            address: 'Jl. Surya Kencana No. 45',
            city: 'Bogor',
            pricePerHour: 80000,
            capacity: 4,
            venueType: 'Badminton',
            images: [],
            facilities: ['Parkir', 'AC', 'Cafe', 'Pro Shop'],
        },
        {
            managerId: pengelola2.id,
            slug: generateSlug('Tennis Garden Bogor'),
            name: 'Tennis Garden Bogor',
            description: 'Lapangan tenis di area hijau Bogor.',
            address: 'Jl. Raya Puncak No. 50',
            city: 'Bogor',
            pricePerHour: 110000,
            capacity: 4,
            venueType: 'Tennis',
            images: [],
            facilities: ['Parkir', 'View Pegunungan', 'Cafe', 'Ruang Ganti'],
        },
        {
            managerId: pengelola1.id,
            slug: generateSlug('Basketball Court Bogor'),
            name: 'Basketball Court Bogor',
            description: 'Lapangan basket outdoor di Bogor.',
            address: 'Jl. Bangbarung No. 30',
            city: 'Bogor',
            pricePerHour: 160000,
            capacity: 12,
            venueType: 'Basket',
            images: [],
            facilities: ['Parkir', 'Lighting', 'Bench', 'Water Station'],
        },
    ];

    for (const v of venues) {
        const venue = await prisma.venue.upsert({
            where: { id: v.name.toLowerCase().replace(/\s+/g, '-') },
            update: v,
            create: v,
        });

        // Create default schedules
        const scheduleData = [
            { dayOfWeek: 0, openTime: '07:00', closeTime: '22:00', isAvailable: true }, // Minggu
            { dayOfWeek: 1, openTime: '06:00', closeTime: '23:00', isAvailable: true }, // Senin
            { dayOfWeek: 2, openTime: '06:00', closeTime: '23:00', isAvailable: true }, // Selasa
            { dayOfWeek: 3, openTime: '06:00', closeTime: '23:00', isAvailable: true }, // Rabu
            { dayOfWeek: 4, openTime: '06:00', closeTime: '23:00', isAvailable: true }, // Kamis
            { dayOfWeek: 5, openTime: '06:00', closeTime: '24:00', isAvailable: true }, // Jumat
            { dayOfWeek: 6, openTime: '06:00', closeTime: '24:00', isAvailable: true }, // Sabtu
        ];

        for (const s of scheduleData) {
            await prisma.venueSchedule.upsert({
                where: { venueId_dayOfWeek: { venueId: venue.id, dayOfWeek: s.dayOfWeek } },
                update: s,
                create: { venueId: venue.id, ...s },
            });
        }
    }
    console.log(`✅ ${venues.length} venues created with schedules`);

    // =====================
    // SUMMARY
    // =====================

    console.log('\n🎉 Seeding completed!\n');
    console.log('📝 Test credentials:');
    console.log('   Admin:     admin@kumpulmain.id / admin123');
    console.log('   Pengelola: lapangan@kumpulmain.id / pengelola123');
    console.log('   Pengelola: arena@kumpulmain.id / pengelola123');
    console.log('   User:      andi@gmail.com / user123');
    console.log('   User:      bima@gmail.com / user123');
    console.log('   User:      citra@gmail.com / user123');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
