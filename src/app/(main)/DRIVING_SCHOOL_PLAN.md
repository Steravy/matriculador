# Driving School Registration System - Implementation Plan

## Overview

This document outlines the plan to extend the TaxiFatura platform to support driving schools in Cape Verde. The goal is to digitalize the student registration process while maintaining the existing taxi receipt functionality.

## System Architecture

### Multi-Tenant Approach
- Users can manage BOTH taxi vehicles AND a driving school
- Separate sections in the dashboard
- Shared authentication and user system
- Independent data models with clear separation

### Key Principles
1. **Reuse Existing Patterns** - Leverage current service layer, validation, and UI patterns
2. **Maintain Consistency** - Same Portuguese language, UI design, and UX patterns
3. **Progressive Enhancement** - Add features without breaking existing functionality
4. **Mobile-First** - Ensure registration works well on phones (QR code scanning scenario)

## Database Schema

### Core Entities

```prisma
model DrivingSchool {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique // URL-friendly for QR codes (e.g., "auto-escola-santiago")
  address       String?
  phone         String?
  email         String?
  logo          String?   // URL to logo
  
  // Business fields
  licenseNumber String?   // School license/registration number
  description   String?   // About the school
  
  // Audit fields
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // Soft delete
  
  // Relations
  userId        String
  user          User      @relation(fields: [userId], references: [id])
  plans         Plan[]
  students      Student[]
  registrations Registration[]
}

model Plan {
  id            String    @id @default(cuid())
  name          String    // "Carta Ligeira", "Carta Pesada", etc.
  code          String    // "CL", "CP", etc.
  description   String?
  
  // Pricing
  price         Decimal   @db.Decimal(10, 2)
  duration      Int       // Duration in days
  
  // Features as JSON or array
  features      String[]  // ["20 aulas teóricas", "30 aulas práticas", etc.]
  
  // Control fields
  isActive      Boolean   @default(true)
  maxStudents   Int?      // Optional enrollment limit
  
  // Audit fields
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  schoolId      String
  school        DrivingSchool @relation(fields: [schoolId], references: [id])
  registrations Registration[]
}

model Student {
  id            String    @id @default(cuid())
  
  // Personal information
  fullName      String
  email         String
  phone         String
  alternatePhone String?
  birthDate     DateTime
  
  // Identification
  idType        IdType    // BILHETE_IDENTIDADE, PASSAPORTE, etc.
  idNumber      String    
  idExpiryDate  DateTime?
  
  // Address
  address       String
  city          String
  island        String    // Santiago, São Vicente, etc.
  
  // Additional info
  photo         String?   // URL to photo
  
  // Audit fields
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  deletedAt     DateTime? // Soft delete
  
  // Relations
  schoolId      String
  school        DrivingSchool @relation(fields: [schoolId], references: [id])
  registrations Registration[]
  
  // Ensure unique email and ID per school
  @@unique([email, schoolId])
  @@unique([idNumber, schoolId])
}

model Registration {
  id                 String    @id @default(cuid())
  registrationNumber String    @unique // AUTO-2024-0001
  
  // Registration details
  status        RegistrationStatus @default(PENDING)
  startDate     DateTime
  expectedEndDate DateTime
  actualEndDate DateTime?
  
  // Academic progress
  theoryProgress    Int      @default(0) // Percentage
  practicalProgress Int      @default(0) // Percentage
  theoryExamDate    DateTime?
  practicalExamDate DateTime?
  
  // Financial
  totalAmount   Decimal   @db.Decimal(10, 2)
  paidAmount    Decimal   @db.Decimal(10, 2) @default(0)
  paymentMethod PaymentMethod?
  paymentNotes  String?
  
  // Documents
  documents     Json?     // Store document URLs and metadata
  
  // Notes
  internalNotes String?   // For school use only
  
  // Source tracking
  source        RegistrationSource @default(QR_CODE)
  sourceDetails String?   // Which QR code, campaign, etc.
  
  // Audit fields
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  completedAt   DateTime?
  cancelledAt   DateTime?
  
  // Relations
  studentId     String
  student       Student   @relation(fields: [studentId], references: [id])
  planId        String
  plan          Plan      @relation(fields: [planId], references: [id])
  schoolId      String
  school        DrivingSchool @relation(fields: [schoolId], references: [id])
}

// Enums
enum IdType {
  BILHETE_IDENTIDADE
  PASSAPORTE
  CARTAO_RESIDENCIA
  DIRE                // For foreign residents
}

enum RegistrationStatus {
  PENDING             // Initial registration, awaiting documents/payment
  ACTIVE              // Currently enrolled
  THEORY_COMPLETE     // Passed theory, doing practical
  SUSPENDED           // Temporarily inactive
  COMPLETED           // Successfully completed
  CANCELLED           // Cancelled by student or school
  FAILED              // Failed exams beyond retry limit
}

enum PaymentMethod {
  CASH
  BANK_TRANSFER
  VINTI4               // Local payment app
  INSTALLMENTS
}

enum RegistrationSource {
  QR_CODE
  WALK_IN
  WEBSITE
  REFERRAL
  SOCIAL_MEDIA
}
```

## Component Structure

### Dashboard Components (`/components/driving-school/`)

```
driving-school/
├── management/
│   ├── student-management.tsx       # Main student list/grid
│   ├── student-modal.tsx            # Create/edit student
│   ├── student-details-sheet.tsx    # View full student details
│   ├── plan-management.tsx          # Manage course plans
│   ├── plan-modal.tsx               # Create/edit plans
│   ├── registration-list.tsx        # All registrations view
│   └── registration-details.tsx     # Single registration view
├── settings/
│   ├── school-settings.tsx          # School profile settings
│   ├── school-qr-modal.tsx          # Generate/view QR codes
│   └── school-branding.tsx          # Logo, colors, etc.
├── widgets/
│   ├── registration-stats.tsx       # Dashboard statistics
│   ├── recent-registrations.tsx    # Latest sign-ups
│   └── payment-overview.tsx         # Financial summary
└── shared/
    ├── student-badge.tsx            # Reusable student status badge
    ├── plan-card.tsx                # Plan display card
    └── registration-timeline.tsx     # Progress timeline
```

### Public Components (`/components/public/`)

```
public/
├── registration/
│   ├── public-registration-form.tsx  # Multi-step registration
│   ├── plan-selection-step.tsx      # Choose course plan
│   ├── student-info-step.tsx        # Personal details
│   ├── document-upload-step.tsx     # Upload ID, photo
│   └── payment-info-step.tsx        # Payment details
├── school/
│   ├── school-header.tsx            # School branding
│   ├── school-info-card.tsx         # Contact, about
│   └── plan-comparison.tsx          # Compare available plans
└── success/
    ├── registration-success.tsx      # Success page
    └── next-steps-card.tsx          # What happens next
```

## User Flows

### School Owner Flow
1. **Initial Setup**
   - Create driving school profile
   - Add school details (name, address, license)
   - Upload logo and branding
   - Generate unique QR code

2. **Plan Creation**
   - Create course plans (Carta Ligeira, etc.)
   - Set prices and duration
   - List included features
   - Activate/deactivate plans

3. **Student Management**
   - View all students (active, pending, completed)
   - Search and filter students
   - Edit student details
   - Track individual progress

4. **Registration Processing**
   - Review new registrations from QR scans
   - Verify documents
   - Confirm payments
   - Update registration status

### Student Flow
1. **Registration via QR Code**
   - Scan school's QR code
   - Land on school's branded page
   - View available plans and prices
   - Select desired plan

2. **Form Completion**
   - Enter personal information
   - Upload ID document
   - Provide contact details
   - Review and submit

3. **Confirmation**
   - Receive success message
   - Get registration number
   - Email confirmation sent
   - Instructions for next steps

## Technical Implementation Details

### Service Layer Pattern

Following the existing pattern, we'll create:

```typescript
// src/lib/services/driving-school.service.ts
export class DrivingSchoolService {
  static async create(data: CreateDrivingSchoolData)
  static async findBySlug(slug: string)
  static async update(id: string, data: UpdateDrivingSchoolData)
  static async delete(id: string) // Soft delete
  static async generateSlug(name: string)
}

// src/lib/services/student.service.ts  
export class StudentService {
  static async create(data: CreateStudentData)
  static async findMany(filters: StudentFilters)
  static async findById(id: string)
  static async update(id: string, data: UpdateStudentData)
  static async delete(id: string) // Soft delete
  static async checkDuplicate(email: string, idNumber: string, schoolId: string)
}

// src/lib/services/registration.service.ts
export class RegistrationService {
  static async create(data: CreateRegistrationData)
  static async updateStatus(id: string, status: RegistrationStatus)
  static async updatePayment(id: string, amount: number)
  static async getStats(schoolId: string, dateRange?: DateRange)
  static async generateRegistrationNumber(schoolId: string)
}
```

### Validation Schemas

```typescript
// src/lib/validators/driving-school.schema.ts
export const drivingSchoolSchema = z.object({
  name: z.string().min(3).max(100),
  address: z.string().optional(),
  phone: z.string().regex(/^\d{7,9}$/), // Cape Verde format
  email: z.string().email(),
  licenseNumber: z.string().optional(),
})

// src/lib/validators/student.schema.ts
export const studentSchema = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\d{7,9}$/),
  birthDate: z.date().max(new Date()), // Must be in past
  idType: z.nativeEnum(IdType),
  idNumber: z.string().min(5).max(20),
  // Validate minimum age for driving (18 years)
}).refine(data => {
  const age = differenceInYears(new Date(), data.birthDate)
  return age >= 18
}, {
  message: "Deve ter pelo menos 18 anos",
  path: ["birthDate"]
})
```

### Server Actions

```typescript
// src/app/actions/driving-school.ts
export async function createDrivingSchool(data: DrivingSchoolInput)
export async function updateDrivingSchool(id: string, data: DrivingSchoolInput)
export async function getDrivingSchool()
export async function deleteDrivingSchool(id: string)

// src/app/actions/student.ts
export async function createStudent(data: StudentInput)
export async function getStudents(search?: string)
export async function updateStudent(id: string, data: StudentInput)
export async function deleteStudent(id: string)

// src/app/actions/registration.ts
export async function createRegistration(data: RegistrationInput)
export async function getRegistrations(filters: RegistrationFilters)
export async function updateRegistrationStatus(id: string, status: RegistrationStatus)
export async function recordPayment(id: string, amount: number)
```

### Route Structure

```
/dashboard/
├── escola/                          # School dashboard home
├── escola/configuracoes            # School settings
├── escola/alunos                   # Student management
├── escola/planos                   # Plan management  
├── escola/matriculas               # Registration management
└── escola/relatorios               # Reports and analytics

/escola/[slug]/                      # Public school page
├── registar                         # Registration form
├── sucesso/[registrationId]        # Success page
└── planos                          # View all plans
```

### QR Code Implementation

Following the vehicle QR pattern:

```typescript
// Generate unique slug for school
function generateSchoolSlug(name: string): string {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]/g, '-')      // Replace non-alphanumeric
    .replace(/-+/g, '-')             // Collapse multiple dashes
    .replace(/^-|-$/g, '')           // Remove leading/trailing dashes
    
  const random = Math.random().toString(36).substring(2, 6)
  return `${base}-${random}`
}

// QR code content
const qrCodeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/escola/${school.slug}/registar`
```

## Implementation Phases

### Phase 1: Database Setup
- [ ] Create Prisma schema for new models
- [ ] Generate migrations
- [ ] Update Prisma client
- [ ] Test database connections

### Phase 2: School Management
- [ ] School settings page
- [ ] School creation/editing
- [ ] QR code generation
- [ ] Basic school dashboard

### Phase 3: Plan Management
- [ ] Plan CRUD operations
- [ ] Plan listing/grid view
- [ ] Plan activation/deactivation
- [ ] Plan validation

### Phase 4: Student Management
- [ ] Student list view
- [ ] Student creation form
- [ ] Student details view
- [ ] Student search/filter
- [ ] Duplicate checking

### Phase 5: Public Registration
- [ ] Public school page
- [ ] Multi-step registration form
- [ ] Plan selection
- [ ] Form validation
- [ ] Success flow

### Phase 6: Registration Management
- [ ] Registration dashboard
- [ ] Status management
- [ ] Payment tracking
- [ ] Progress tracking
- [ ] Email notifications

### Phase 7: Analytics & Reports
- [ ] Registration statistics
- [ ] Financial overview
- [ ] Student progress reports
- [ ] Export functionality

## Design Decisions

### Why Extend Rather Than Separate?
1. **Shared Infrastructure** - Reuse auth, database, email systems
2. **Cost Efficiency** - Single deployment, shared resources
3. **User Convenience** - One account for multiple services
4. **Code Reuse** - Leverage existing patterns and components

### Multi-Tenant Considerations
1. **Data Isolation** - Clear foreign key relationships
2. **Permission Scoping** - Users only see their own school data
3. **Flexible Navigation** - Show/hide features based on what user has
4. **Independent Features** - School and taxi features don't interfere

### Mobile-First Design
1. **QR Code Priority** - Optimize for scanning and quick registration
2. **Responsive Forms** - Easy to fill on phones
3. **Touch-Friendly** - Large buttons, proper spacing
4. **Progressive Enhancement** - Works on basic devices

## Security Considerations

1. **Data Privacy**
   - Student data encrypted at rest
   - Secure document upload/storage
   - GDPR-style data handling

2. **Access Control**
   - School owners only see their students
   - Public pages show limited information
   - Rate limiting on registration endpoint

3. **Validation**
   - Server-side validation for all inputs
   - ID number format validation
   - Age verification for licensing

## Future Enhancements

1. **Phase 2 Features**
   - Instructor management
   - Class scheduling
   - Exam result tracking
   - Certificate generation

2. **Integrations**
   - SMS notifications (Twilio)
   - Payment gateways
   - Government ID verification
   - Calendar sync

3. **Mobile App**
   - Student app for progress tracking
   - Instructor app for lessons
   - Push notifications

## Notes for Implementation

1. **Language** - All UI text in Portuguese (pt-PT variant)
2. **Currency** - CVE (Cape Verde Escudo) formatting
3. **Phone Format** - Cape Verde format validation
4. **Date Format** - DD/MM/YYYY throughout
5. **Time Zone** - Cape Verde Time (CVT)

This plan provides a comprehensive blueprint for adding driving school functionality while maintaining consistency with the existing TaxiFatura architecture.