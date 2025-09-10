"use client"

import { Users, Car, GraduationCap, MapPin, Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SchoolCardProps {
  school: {
    id: string
    name: string
    location: string
    totalStudents: number
    activeStudents: number
    totalInstructors: number
    vehiclesCount: number
    createdAt: string
    status: string
  }
  onManageClick?: () => void
}

export function SchoolCard({ school, onManageClick }: SchoolCardProps) {
  const occupancyRate = school.totalStudents > 0 
    ? Math.round((school.activeStudents / school.totalStudents) * 100)
    : 0

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border bg-white overflow-hidden"
      onClick={onManageClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {school.name}
            </CardTitle>
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="w-4 h-4 mr-1" />
              {school.location}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center text-slate-600">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm">Alunos</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {school.activeStudents}
              <span className="text-sm font-normal text-slate-500">/{school.totalStudents}</span>
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center text-slate-600">
              <Car className="w-4 h-4 mr-2" />
              <span className="text-sm">Veículos</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{school.vehiclesCount}</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="pt-3 border-t space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-slate-600">
              <GraduationCap className="w-4 h-4 mr-1" />
              {school.totalInstructors} Instrutores
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Ativa
            </Badge>
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <Calendar className="w-4 h-4 mr-1" />
            Desde {new Date(school.createdAt).toLocaleDateString("pt-PT", { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Taxa de Ocupação</span>
            <span className="font-medium text-slate-900">
              {occupancyRate}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-500"
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2">
          <Button
            variant="ghost"
            className="w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={(e) => {
              e.stopPropagation()
              onManageClick?.()
            }}
          >
            Gerenciar Escola
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}