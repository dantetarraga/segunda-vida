import { z } from 'zod'

const emailField = z
  .string()
  .min(1, { message: 'Este campo es obligatorio' })
  .email({ message: 'Ingresa un correo válido' })

const phoneField = z
  .string()
  .min(1, { message: 'Este campo es obligatorio' })
  .regex(/^\+?[0-9]{9,15}$/, { message: 'Ingresa un número válido' })

const passwordField = z
  .string()
  .min(1, { message: 'Este campo es obligatorio' })
  .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })

const strongPasswordField = z
  .string()
  .min(1, { message: 'Este campo es obligatorio' })
  .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  .regex(/[A-Z]/, { message: 'Debe incluir al menos una mayúscula' })
  .regex(/[0-9]/, { message: 'Debe incluir al menos un número' })

// ─── Login (unified) ──────────────────────────────────────────────────────────

export const loginSchema = z.object({
  identifier: z.string().min(1, { message: 'Este campo es obligatorio' }),
  password: passwordField,
})

// ─── Register (unified) ───────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    identifier: z.string().min(1, { message: 'Este campo es obligatorio' }),
    password: strongPasswordField,
    confirmPassword: z.string().min(1, { message: 'Confirma tu contraseña' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

// ─── Login (per-method — kept for future backend use) ─────────────────────────

export const loginEmailSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const loginPhoneSchema = z.object({
  phone: phoneField,
  password: passwordField,
})

// ─── Register (per-method — kept for future backend use) ──────────────────────

export const registerEmailSchema = z
  .object({
    email: emailField,
    password: strongPasswordField,
    confirmPassword: z.string().min(1, { message: 'Confirma tu contraseña' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const registerPhoneSchema = z
  .object({
    phone: phoneField,
    password: strongPasswordField,
    confirmPassword: z.string().min(1, { message: 'Confirma tu contraseña' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

// ─── Forgot password ──────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailField,
})

// ─── Types ────────────────────────────────────────────────────────────────────

export type LoginFields          = z.infer<typeof loginSchema>
export type RegisterFields       = z.infer<typeof registerSchema>
export type LoginEmailFields     = z.infer<typeof loginEmailSchema>
export type LoginPhoneFields     = z.infer<typeof loginPhoneSchema>
export type RegisterEmailFields  = z.infer<typeof registerEmailSchema>
export type RegisterPhoneFields  = z.infer<typeof registerPhoneSchema>
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>
