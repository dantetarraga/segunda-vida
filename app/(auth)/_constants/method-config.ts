import type { MaterialIconName } from '@/components/ui/icon'

export type Method = 'email' | 'phone'

interface MethodConfig {
  icon: MaterialIconName
  inputLabel: string
  inputPlaceholder: string
  keyboardType: 'email-address' | 'phone-pad'
  autoComplete: 'email' | 'tel'
}

export const METHOD_CONFIG: Record<Method, MethodConfig> = {
  email: {
    icon: 'email',
    inputLabel: 'Correo electrónico',
    inputPlaceholder: 'tu@correo.com',
    keyboardType: 'email-address',
    autoComplete: 'email',
  },
  phone: {
    icon: 'phone',
    inputLabel: 'Número de teléfono',
    inputPlaceholder: '+51 999 999 999',
    keyboardType: 'phone-pad',
    autoComplete: 'tel',
  },
}

export default METHOD_CONFIG
