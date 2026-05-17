import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginSchema, type LoginFields } from '../_schemas/auth.schema'
import { authService } from '../_services/auth.service'
import type { Method } from '../_constants/method-config'

export interface LoginFormState {
  control: ReturnType<typeof useForm<LoginFields>>['control']
  errors: {
    identifier?: { message?: string }
    password?: { message?: string }
    root?: { message?: string }
  }
  isSubmitting: boolean
  onSubmit: () => void
}

export function useLoginForm(method: Method, onSuccess: () => void): LoginFormState {
  const form = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (method === 'email') {
        await authService.loginWithEmail(data.identifier, data.password)
      } else {
        await authService.loginWithPhone(data.identifier, data.password)
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
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  }
}
