import { z } from 'zod'

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

export type ProfileFields = z.infer<typeof profileSchema>

export default {}
