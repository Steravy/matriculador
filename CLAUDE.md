# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaxiFatura is a Next.js application built for taxi drivers in Cape Verde to create professional invoices and receipts. The app offers two invoice creation methods: manual entry and QR code system where passengers fill in their own details.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run vercel-build` - Build for Vercel deployment (runs migrations and generates Prisma client)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linting
- `npm run postinstall` - Generate Prisma client (runs automatically after install)

## Tech Stack & Architecture

### Framework & UI
- **Next.js 15** with App Router (App directory structure)
- **React 19** for components
- **Tailwind CSS 4** for styling
- **shadcn/ui** components with "new-york" style variant
- **Lucide React** for icons

### Database & Auth
- **PostgreSQL** with **Prisma ORM**
- **Better Auth** for authentication with Prisma adapter
- Database schema includes User, Session, Account, Verification, Receipt, Vehicle, ReceiptRecipient, and WaitingList models
- Prisma client generated to `generated/prisma` (not src/generated)
- Soft delete pattern implemented for vehicles and receipts

### Key Libraries
- **Zod** for validation schemas
- **React Hook Form** with @hookform/resolvers
- **date-fns** for date handling
- **Recharts** for charting/analytics
- **Resend** for email sending
- **React Email** for email templates
- **React PDF** for PDF generation
- **qrcode/react-qr-code** for QR code generation

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (main)/            # Main route group
│   ├── actions/           # Server actions (invoice, receipt, vehicle)
│   ├── api/               # API routes
│   │   ├── auth/          # Better Auth endpoints ([...all])
│   │   └── receipts/      # Receipt API endpoints
│   ├── dashboard/         # Dashboard pages
│   ├── demo/              # Demo pages
│   ├── playground/        # Development playground
│   ├── receipt/           # Receipt view pages
│   └── v/                 # Vehicle QR code routes
├── components/
│   ├── auth/              # Auth forms and schemas
│   ├── forms/             # Invoice and vehicle forms
│   ├── home/              # Landing page components
│   ├── sidebar/           # Navigation components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── email/             # Email templates and actions
│   ├── services/          # Service layer (ReceiptService, VehicleService)
│   ├── validators/        # Zod validation schemas
│   │   └── sections/      # Resume/form section schemas
│   ├── auth.ts            # Better Auth configuration
│   ├── auth-client.ts     # Client-side auth utilities
│   ├── db.ts              # Database connection
│   ├── qr-utils.ts        # QR code utilities
│   ├── vehicle-utils.ts   # Vehicle slug generation
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## API Architecture

### Better Auth
- Authentication endpoints at `/api/auth/[...all]`
- Uses Next.js route handlers with `toNextJsHandler`
- Session management with database storage

### Server Actions
Located in `src/app/actions/`:
- `invoice.ts` - Invoice creation and management
- `receipt-email.ts` - Email sending for receipts
- `vehicle.ts` - Vehicle CRUD operations
- `public-receipt.ts` - Public receipt creation via QR code

## Service Layer

The application uses a service layer pattern for business logic:
- **ReceiptService** - Receipt creation, filtering, statistics
- **VehicleService** - Vehicle management with soft delete support

Key patterns:
- Soft delete using `deletedAt` timestamp
- Unique slug generation for vehicle QR codes
- Decimal precision (10,2) for monetary amounts

## Email Infrastructure

- **Resend** integration for transactional emails
- Email templates in `src/lib/email/templates/`
- Receipt recipient tracking with delivery status
- Email sending status: `emailSent`, `emailSentAt`, `emailDelivered`, `emailError`

## Database Schema

### Key Models
- **User**: Authentication and user management
- **Session**: User sessions with Better Auth
- **Account**: OAuth provider accounts
- **Vehicle**: Taxi vehicles with QR code slugs (soft delete)
- **Receipt**: Trip receipts with status tracking (soft delete)
- **ReceiptRecipient**: Email recipient tracking
- **WaitingList**: Beta access email collection

### Database Commands
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev` - Create migrations in development
- `npx prisma migrate deploy` - Apply migrations in production
- `npx prisma studio` - Open Prisma Studio GUI

## Validation System

Extensive Zod schemas for form validation located in `src/lib/validators/`:
- Invoice validation schemas
- Receipt validation schemas
- Vehicle validation schemas
- Auth schemas in components
- Resume/CV sections (awards, education, experience, etc.)
- Custom field validation

## Styling Guidelines

- Uses Tailwind CSS with CSS variables enabled
- Blue-to-cyan gradient brand colors (`from-blue-600 to-cyan-600`)
- Responsive design with mobile-first approach
- Portuguese language content for Cape Verde market
- shadcn/ui configuration in `components.json`

## Authentication Flow

- Better Auth with Prisma adapter
- Next.js cookies integration via `nextCookies` plugin
- Session management with database storage
- Support for OAuth providers via Account model
- Email/password authentication enabled

## Important Notes

- All content is in Portuguese for the Cape Verde market
- Focus on taxi driver workflow and professional invoice generation
- Mobile-responsive design crucial for in-vehicle usage
- QR code functionality for passenger self-service data entry
- Vehicle slugs are URL-friendly identifiers for QR code routes (`/v/[slug]`)
- Soft delete pattern preserves data integrity (check `deletedAt` field)
- Monetary amounts use Decimal type with 10,2 precision
- No test files currently exist in the codebase
- ESLint configured to ignore `generated/` directory