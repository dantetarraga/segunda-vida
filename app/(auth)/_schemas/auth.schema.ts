import { z } from 'zod'

const emailField = z
  .string()
  .min(1, { message: 'Ingresa tu correo' })
  .email({ message: 'Ingresa un correo válido' })

const phoneField = z
  .string()
  .min(1, { message: 'Ingresa tu número' })
  .regex(/^\+?[0-9]{9,15}$/, { message: 'Ingresa un número válido' })

const passwordField = z
  .string()
  .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })

const strongPasswordField = z
  .string()
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .regex(/[A-Z]/, { message: 'Debe incluir al menos una mayúscula' })
  .regex(/[0-9]/, { message: 'Debe incluir al menos un número' })

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginEmailSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const loginPhoneSchema = z.object({
  phone: phoneField,
  password: passwordField,
})

// ─── Register ─────────────────────────────────────────────────────────────────

export const registerEmailSchema = z
  .object({
    email: emailField,
    password: strongPasswordField,
    confirmPassword: z.string().min(1, { message: 'Confirma tu contraseña' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const registerPhoneSchema = z
  .object({
    phone: phoneField,
    password: strongPasswordField,
    confirmPassword: z.string().min(1, { message: 'Confirma tu contraseña' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

// ─── Perfil ───────────────────────────────────────────────────────────────────

export const PARTICIPATION_MODES = [
  'rescatar',
  'adoptar',
  'donar',
  'voluntariar',
  'reportar',
] as const

export type ParticipationMode = (typeof PARTICIPATION_MODES)[number]

export const PARTICIPATION_LABELS: Record<ParticipationMode, string> = {
  rescatar: '🚨 Rescatar',
  adoptar: '🏠 Adoptar',
  donar: '💛 Donar',
  voluntariar: '🤝 Voluntariar',
  reportar: '📍 Reportar',
}

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Ingresa tu nombre' })
    .max(60, { message: 'Nombre demasiado largo' }),
  location: z
    .string()
    .min(2, { message: 'Ingresa tu ciudad o distrito' })
    .max(80, { message: 'Dirección demasiado larga' }),
  participation: z
    .array(z.enum(PARTICIPATION_MODES))
    .min(1, { message: 'Selecciona al menos una forma de participar' }),
})

// ─── Types ──────────────────────────────────────────────────────────

export type LoginEmailFields = z.infer<typeof loginEmailSchema>
export type LoginPhoneFields = z.infer<typeof loginPhoneSchema>
export type RegisterEmailFields = z.infer<typeof registerEmailSchema>
export type RegisterPhoneFields = z.infer<typeof registerPhoneSchema>
export type ProfileFields = z.infer<typeof profileSchema>
