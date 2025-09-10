import { z } from "zod"

// Input schema - what the form sends
export const drivingSchoolInputSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo")
    .trim(),
  
  location: z
    .string()
    .min(2, "Localização deve ter pelo menos 2 caracteres")
    .max(100, "Localização muito longa")
    .trim(),
  
  phoneNumber: z
    .string()
    .min(7, "Número de telefone deve ter pelo menos 7 dígitos")
    .max(15, "Número de telefone muito longo")
    .trim()
    .regex(/^\+?[0-9\s-]+$/, "Formato de telefone inválido"),
  
  email: z
    .string()
    .email("Email inválido")
    .max(100, "Email muito longo")
    .trim()
    .toLowerCase(),
  
  address: z
    .string()
    .min(5, "Endereço deve ter pelo menos 5 caracteres")
    .max(200, "Endereço muito longo")
    .trim(),
  
  description: z
    .string()
    .max(500, "Descrição muito longa")
    .optional(),
  
  instructorCapacity: z
    .string()
    .min(1, "Capacidade de instrutores é obrigatória")
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val > 0, {
      message: "Capacidade de instrutores deve ser maior que 0"
    }),
  
  studentCapacity: z
    .string()
    .min(1, "Capacidade de alunos é obrigatória")
    .transform(val => parseInt(val, 10))
    .refine(val => !isNaN(val) && val > 0, {
      message: "Capacidade de alunos deve ser maior que 0"
    })
})

// Processing schema - transforms and validates the input
export const drivingSchoolProcessingSchema = drivingSchoolInputSchema.transform((data) => ({
  name: data.name,
  location: data.location,
  phoneNumber: data.phoneNumber,
  email: data.email,
  address: data.address,
  description: data.description?.trim() || undefined,
  instructorCapacity: data.instructorCapacity,
  studentCapacity: data.studentCapacity
})).refine((data) => {
  // Cape Verde phone validation - accepts local and international formats
  const phoneRegex = /^(\+238)?\s?[0-9\s-]{7,}$/
  return phoneRegex.test(data.phoneNumber.replace(/[\s-]/g, ''))
}, {
  message: "Formato de telefone inválido para Cabo Verde",
  path: ["phoneNumber"]
})

// Type definitions
export type DrivingSchoolInput = z.infer<typeof drivingSchoolInputSchema>
export type DrivingSchoolData = z.infer<typeof drivingSchoolProcessingSchema>