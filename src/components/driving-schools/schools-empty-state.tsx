"use client"

import { GraduationCap, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SchoolsEmptyStateProps {
  onAddSchool: () => void
}

export function SchoolsEmptyState({ onAddSchool }: SchoolsEmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <GraduationCap className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">
        Nenhuma escola cadastrada
      </h3>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Comece adicionando sua primeira escola de condução para gerenciar alunos, instrutores e veículos
      </p>
      <Button
        size="lg"
        onClick={onAddSchool}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
      >
        <Plus className="w-5 h-5 mr-2" />
        Adicionar Primeira Escola
      </Button>
    </div>
  )
}