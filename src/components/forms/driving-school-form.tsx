"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, GraduationCap } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { drivingSchoolInputSchema, type DrivingSchoolInput } from "@/lib/validators/driving-school.schema"
import { SerializedDrivingSchool } from "@/app/actions/types"

interface DrivingSchoolFormProps {
  drivingSchool?: SerializedDrivingSchool // For editing existing school
  onSuccess?: (drivingSchool: SerializedDrivingSchool) => void
  onCancel?: () => void
}

export function DrivingSchoolForm({ drivingSchool, onSuccess, onCancel }: DrivingSchoolFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!drivingSchool

  const form = useForm<DrivingSchoolInput>({
    resolver: zodResolver(drivingSchoolInputSchema),
    defaultValues: {
      name: drivingSchool?.name || "",
      location: drivingSchool?.location || "",
      phoneNumber: drivingSchool?.phoneNumber || "",
      email: drivingSchool?.email || "",
      address: drivingSchool?.address || "",
      description: drivingSchool?.description || "",
      instructorCapacity: drivingSchool?.instructorCapacity,
      studentCapacity: drivingSchool?.studentCapacity,
    },
  })

  async function onSubmit(data: DrivingSchoolInput) {
    try {
      setIsSubmitting(true)

      // For now, just log the data as requested
      console.log("Driving School Form Data:", data)
      
      // Mock success response
      toast.success(isEditing ? "Escola atualizada com sucesso!" : "Escola registada com sucesso!")
      
      // Mock driving school data for onSuccess callback
      const mockDrivingSchool: SerializedDrivingSchool = {
        id: isEditing ? drivingSchool.id : Date.now().toString(),
        ...data,
        instructorCapacity: parseInt(data.instructorCapacity as unknown as string),
        studentCapacity: parseInt(data.studentCapacity as unknown as string),
        totalStudents: 0,
        activeStudents: 0,
        totalInstructors: 0,
        vehiclesCount: 0,
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "mock-user-id",
        description: data.description || null,
      }
      
      if (!isEditing) {
        form.reset()
      }
      onSuccess?.(mockDrivingSchool)
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'registar'} escola`)
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Basic Information */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Escola</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Auto Escola Praia"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Praia"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: +238 261 1234"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ex: contato@autoescolapraia.cv"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Rua 5 de Julho, Plateau, Praia"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Capacity Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="instructorCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade de Instrutores</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 10"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Número máximo de instrutores
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade de Alunos</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 100"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Número máximo de alunos ativos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição (opcional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva os serviços e diferenciais da escola..."
                    className="resize-none"
                    rows={3}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>
                  Informações adicionais sobre a escola
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isEditing ? "Atualizando..." : "Registando..."}
              </>
            ) : (
              <>
                <GraduationCap className="w-4 h-4 mr-2" />
                {isEditing ? "Atualizar Escola" : "Registar Escola"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}