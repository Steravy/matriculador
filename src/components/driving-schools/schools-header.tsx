interface SchoolsHeaderProps {
  schoolsCount: number
  activeStudentsCount: number
  totalInstructorsCount: number
}

export function SchoolsHeader({ 
  schoolsCount, 
  activeStudentsCount, 
  totalInstructorsCount 
}: SchoolsHeaderProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-full xl:max-w-[1600px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Minhas Escolas
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Gerencie suas escolas e acompanhe o progresso dos alunos
            </p>
          </div>

          {/* Stats Summary */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{schoolsCount}</p>
              <p className="text-sm text-slate-600">Escolas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {activeStudentsCount}
              </p>
              <p className="text-sm text-slate-600">Alunos Ativos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {totalInstructorsCount}
              </p>
              <p className="text-sm text-slate-600">Instrutores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}