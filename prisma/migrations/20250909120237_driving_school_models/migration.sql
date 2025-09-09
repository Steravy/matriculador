-- CreateEnum
CREATE TYPE "id_type" AS ENUM ('BILHETE_IDENTIDADE', 'PASSAPORTE', 'CARTAO_RESIDENCIA', 'DIRE');

-- CreateEnum
CREATE TYPE "registration_status" AS ENUM ('PENDING', 'ACTIVE', 'THEORY_COMPLETE', 'SUSPENDED', 'COMPLETED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "payment_method" AS ENUM ('CASH', 'BANK_TRANSFER', 'VINTI4');

-- CreateEnum
CREATE TYPE "payment_type" AS ENUM ('FULL', 'INSTALLMENTS');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "registration_source" AS ENUM ('QR_CODE', 'WALK_IN', 'WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA');

-- CreateTable
CREATE TABLE "driving_school" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "driving_school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "duration" INTEGER NOT NULL,
    "features" TEXT[],
    "maxStudents" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "idType" "id_type" NOT NULL,
    "idNumber" TEXT NOT NULL,
    "idExpiryDate" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "island" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration" (
    "id" TEXT NOT NULL,
    "status" "registration_status" NOT NULL DEFAULT 'PENDING',
    "expectedEndDate" TIMESTAMP(3) NOT NULL,
    "theoryExamDate" TIMESTAMP(3),
    "practicalExamDate" TIMESTAMP(3),
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paymentType" "payment_type" NOT NULL DEFAULT 'FULL',
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "studentId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "payment_method" NOT NULL,
    "status" "payment_status" NOT NULL DEFAULT 'PENDING',
    "reference" TEXT,
    "notes" TEXT,
    "proofUrl" TEXT,
    "paidAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "registrationId" TEXT NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driving_school_slug_key" ON "driving_school"("slug");

-- CreateIndex
CREATE INDEX "driving_school_userId_idx" ON "driving_school"("userId");

-- CreateIndex
CREATE INDEX "driving_school_slug_idx" ON "driving_school"("slug");

-- CreateIndex
CREATE INDEX "driving_school_deletedAt_idx" ON "driving_school"("deletedAt");

-- CreateIndex
CREATE INDEX "plan_schoolId_idx" ON "plan"("schoolId");

-- CreateIndex
CREATE INDEX "plan_isActive_idx" ON "plan"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "plan_code_schoolId_key" ON "plan"("code", "schoolId");

-- CreateIndex
CREATE INDEX "student_schoolId_idx" ON "student"("schoolId");

-- CreateIndex
CREATE INDEX "student_email_idx" ON "student"("email");

-- CreateIndex
CREATE INDEX "student_deletedAt_idx" ON "student"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_schoolId_key" ON "student"("email", "schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "student_idNumber_schoolId_key" ON "student"("idNumber", "schoolId");

-- CreateIndex
CREATE INDEX "registration_studentId_idx" ON "registration"("studentId");

-- CreateIndex
CREATE INDEX "registration_planId_idx" ON "registration"("planId");

-- CreateIndex
CREATE INDEX "registration_status_idx" ON "registration"("status");

-- CreateIndex
CREATE INDEX "registration_createdAt_idx" ON "registration"("createdAt");

-- CreateIndex
CREATE INDEX "payment_registrationId_idx" ON "payment"("registrationId");

-- CreateIndex
CREATE INDEX "payment_status_idx" ON "payment"("status");

-- CreateIndex
CREATE INDEX "payment_paidAt_idx" ON "payment"("paidAt");

-- AddForeignKey
ALTER TABLE "driving_school" ADD CONSTRAINT "driving_school_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "driving_school"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "driving_school"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
