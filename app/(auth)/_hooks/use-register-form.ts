import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { registerSchema, type RegisterFields } from '../_schemas/auth.schema'
import { authService } from '../_services/auth.service'
import type { Method } from '../_constants/method-config'

export interface RegisterFormState {
  control: ReturnType<typeof useForm<RegisterFields>>['control']
  errors: {
    identifier?: { message?: string }
    password?: { message?: string }
    confirmPassword?: { message?: string }
    root?: { message?: string }
  }
  isSubmitting: boolean
  password: string
  onSubmit: () => void
}

export function useRegisterForm(method: Method, onSuccess: () => void): RegisterFormState {
  const form = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: { identifier: '', password: '', confirmPassword: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (method === 'email') {
        await authService.registerWithEmail(data.identifier, data.password)
      } else {
        await authService.registerWithPhone(data.identifier, data.password)
      }
      onSuccess()
    } catch (err) {
      form.setError('root', {
        message: err instanceof Error ? err.message : 'Ocurrió un error, intenta de nuevo',
      })
    }
  })

  return {
    control: form.control,
    errors: {
      identifier: form.formState.errors.identifier,
      password: form.formState.errors.password,
      confirmPassword: form.formState.errors.confirmPassword,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    password: form.watch('password') ?? '',
    onSubmit,
  }
}
