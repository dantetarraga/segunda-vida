import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { authService } from '../_services/auth.service'
import { forgotPasswordSchema, type ForgotPasswordFields } from '../_schemas/auth.schema'

interface UseForgotPasswordFormOptions {
  onSuccess: () => void
}

export interface ForgotPasswordFormState {
  control: ReturnType<typeof useForm<ForgotPasswordFields>>['control']
  errors: {
    email?: { message?: string }
    root?: { message?: string }
  }
  isSubmitting: boolean
  onSubmit: () => void
}

export function useForgotPasswordForm({ onSuccess }: UseForgotPasswordFormOptions): ForgotPasswordFormState {
  const form = useForm<ForgotPasswordFields>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.forgotPassword(data.email)
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
      email: form.formState.errors.email,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  }
}
