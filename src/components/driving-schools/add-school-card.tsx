"use client"

import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AddSchoolCardProps {
  onClick: () => void
}

export function AddSchoolCard({ onClick }: AddSchoolCardProps) {
  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-white"
      onClick={onClick}
    >
      <CardContent className="h-full flex flex-col items-center justify-center py-12 px-6 min-h-[400px]">
        <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mb-4 transition-colors">
          <Plus className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Adicionar Nova Escola
        </h3>
        <p className="text-sm text-slate-600 text-center">
          Registre uma nova escola de condução para começar a gerenciar alunos
        </p>
      </CardContent>
    </Card>
  )
}