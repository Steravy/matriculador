"use client"

import React from "react"
import { GraduationCap } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { DrivingSchoolForm } from "@/components/forms/driving-school-form"
import { useMediaQuery } from "@/hooks/use-media-query"
import { SerializedDrivingSchool } from "@/app/actions/types"

interface DrivingSchoolModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  drivingSchool?: SerializedDrivingSchool // For editing existing school
  onSuccess?: (drivingSchool: SerializedDrivingSchool) => void
}

export function DrivingSchoolModal({ open, onOpenChange, drivingSchool, onSuccess }: DrivingSchoolModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isEditing = !!drivingSchool

  const handleSuccess = (updatedDrivingSchool: SerializedDrivingSchool) => {
    onSuccess?.(updatedDrivingSchool)
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {isEditing ? "Editar Escola de Condução" : "Registar Escola de Condução"}
            </DialogTitle>
          </DialogHeader>
          <div className="px-1 max-h-[calc(100vh-200px)] overflow-y-auto">
            <DrivingSchoolForm 
              drivingSchool={drivingSchool} 
              onSuccess={handleSuccess} 
              onCancel={handleCancel} 
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[96vh]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {isEditing ? "Editar Escola de Condução" : "Registar Escola de Condução"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-8 max-h-[calc(100vh-120px)] overflow-y-auto">
            <DrivingSchoolForm 
              drivingSchool={drivingSchool} 
              onSuccess={handleSuccess} 
              onCancel={handleCancel} 
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}