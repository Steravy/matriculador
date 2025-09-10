"use client"

import { SchoolsHeader } from "@/components/driving-schools/schools-header"
import { SchoolsGrid } from "@/components/driving-schools/schools-grid"

// Mock data for demonstration
const mockDrivingSchools = [
  {
    id: "1",
    name: "Auto Escola Praia",
    location: "Praia",
    totalStudents: 145,
    activeStudents: 32,
    totalInstructors: 8,
    vehiclesCount: 12,
    createdAt: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    name: "Escola de Condução São Vicente",
    location: "Mindelo",
    totalStudents: 87,
    activeStudents: 18,
    totalInstructors: 5,
    vehiclesCount: 8,
    createdAt: "2024-03-22",
    status: "active"
  }
]

interface SchoolsDashboardProps {
  schools?: typeof mockDrivingSchools
}

export default function SchoolsDashboard({ schools = mockDrivingSchools }: SchoolsDashboardProps) {
  // Calculate stats
  const activeStudentsCount = schools.reduce((sum, school) => sum + school.activeStudents, 0)
  const totalInstructorsCount = schools.reduce((sum, school) => sum + school.totalInstructors, 0)

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SchoolsHeader
        schoolsCount={schools.length}
        activeStudentsCount={activeStudentsCount}
        totalInstructorsCount={totalInstructorsCount}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-full xl:max-w-[1600px]">
        <SchoolsGrid initialSchools={schools} />
      </div>
    </div>
  )
}