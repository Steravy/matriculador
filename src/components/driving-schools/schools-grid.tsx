"use client"

import { useState } from "react"
import { SchoolCard } from "./school-card"
import { AddSchoolCard } from "./add-school-card"
import { SchoolsEmptyState } from "./schools-empty-state"
import { DrivingSchoolModal } from "@/components/driving-school-modal"
import { SerializedDrivingSchool } from "@/app/actions/types"

interface SchoolsGridProps {
  initialSchools: Array<{
    id: string
    name: string
    location: string
    totalStudents: number
    activeStudents: number
    totalInstructors: number
    vehiclesCount: number
    createdAt: string
    status: string
  }>
}

export function SchoolsGrid({ initialSchools }: SchoolsGridProps) {
  const [schools, setSchools] = useState(initialSchools)
  const [showSchoolModal, setShowSchoolModal] = useState(false)

  const handleSchoolCreated = (newSchool: SerializedDrivingSchool) => {
    // For now, just add the new school to the list
    setSchools([...schools, {
      id: newSchool.id,
      name: newSchool.name,
      location: newSchool.location,
      totalStudents: newSchool.studentCapacity,
      activeStudents: 0,
      totalInstructors: newSchool.instructorCapacity,
      vehiclesCount: 0,
      createdAt: newSchool.createdAt.toISOString(),
      status: newSchool.status as "active"
    }])
  }

  const handleManageSchool = (schoolId: string) => {
    // TODO: Navigate to school management page
    console.log("Managing school:", schoolId)
  }

  if (schools.length === 0) {
    return (
      <>
        <SchoolsEmptyState onAddSchool={() => setShowSchoolModal(true)} />
        <DrivingSchoolModal
          open={showSchoolModal}
          onOpenChange={setShowSchoolModal}
          onSuccess={handleSchoolCreated}
        />
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {schools.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            onManageClick={() => handleManageSchool(school.id)}
          />
        ))}
        <AddSchoolCard onClick={() => setShowSchoolModal(true)} />
      </div>

      <DrivingSchoolModal
        open={showSchoolModal}
        onOpenChange={setShowSchoolModal}
        onSuccess={handleSchoolCreated}
      />
    </>
  )
}