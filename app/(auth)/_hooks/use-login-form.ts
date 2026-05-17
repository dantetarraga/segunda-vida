import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { authService } from '../_services/auth.service'
import {
  loginEmailSchema,
  loginPhoneSchema,
  type LoginEmailFields,
  type LoginPhoneFields,
} from '../_schemas/auth.schema'

interface SharedLoginFormState {
  errors: {
    identifier?: { message?: string }
    password?: { message?: string }
    root?: { message?: string }
  }
  isSubmitting: boolean
  onSubmit: () => void
}

export interface LoginEmailFormState extends SharedLoginFormState {
  control: ReturnType<typeof useForm<LoginEmailFields>>['control']
}

export interface LoginPhoneFormState extends SharedLoginFormState {
  control: ReturnType<typeof useForm<LoginPhoneFields>>['control']
}

export function useLoginEmailForm(onSuccess: () => void): LoginEmailFormState {
  const form = useForm<LoginEmailFields>({
    resolver: zodResolver(loginEmailSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.loginWithEmail(data)
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
      identifier: form.formState.errors.email,
      password: form.formState.errors.password,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  }
}

export function useLoginPhoneForm(onSuccess: () => void): LoginPhoneFormState {
  const form = useForm<LoginPhoneFields>({
    resolver: zodResolver(loginPhoneSchema),
    defaultValues: { phone: '', password: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.loginWithPhone(data)
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
      identifier: form.formState.errors.phone,
      password: form.formState.errors.password,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  }
}
