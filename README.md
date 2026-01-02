# KumpulMain.id

Platform booking lapangan olahraga dengan fitur Main Bareng (Joinan).

## Structure

```
kumpulmain.id/
├── booking-web/    # Frontend (Next.js) - Deploy to Vercel
├── booking-api/    # Backend (NestJS + Prisma) - Deploy to Railway
└── docs/           # Documentation
```

## Quick Start

### Development

```bash
# Install all dependencies
npm install

# Run frontend (Next.js)
npm run dev:web

# Run backend (NestJS) 
npm run dev:api
```

### Environment Variables

#### booking-web/.env.local
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### booking-api/.env
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/booking_db"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="7d"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

## Deployment

- **Frontend**: Vercel (auto-deploy from `booking-web` folder)
- **Backend**: Railway (auto-deploy from `booking-api` folder)

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: NestJS, Prisma, PostgreSQL
- **Payment**: Midtrans
