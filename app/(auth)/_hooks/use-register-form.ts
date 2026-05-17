import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { Method } from '../_constants/method-config'
import { authService } from '../_services/auth.service'
import {
  registerEmailSchema,
  registerPhoneSchema,
  type RegisterEmailFields,
  type RegisterPhoneFields,
} from '../_schemas/auth.schema'

interface UseRegisterFormOptions {
  method: Method
  onSuccess: (contact: string) => void
}

interface RegisterFormState {
  control: ReturnType<typeof useForm>['control']
  errors: {
    identifier?: { message?: string }
    password?: { message?: string }
    confirmPassword?: { message?: string }
    root?: { message?: string }
  }
  isSubmitting: boolean
  password: string
  reset: () => void
  onSubmit: () => void
}

const useRegisterEmailForm = (onSuccess: (contact: string) => void): RegisterFormState => {
  const form = useForm<RegisterEmailFields>({ resolver: zodResolver(registerEmailSchema) })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.registerWithEmail(data)
      onSuccess(data.email)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error, intenta de nuevo'
      form.setError('root', { message })
    }
  })

  return {
    control: form.control as ReturnType<typeof useForm>['control'],
    errors: {
      identifier: form.formState.errors.email,
      password: form.formState.errors.password,
      confirmPassword: form.formState.errors.confirmPassword,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    password: form.watch('password') ?? '',
    reset: form.reset,
    onSubmit,
  }
}

const useRegisterPhoneForm = (onSuccess: (contact: string) => void): RegisterFormState => {
  const form = useForm<RegisterPhoneFields>({ resolver: zodResolver(registerPhoneSchema) })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.registerWithPhone(data)
      onSuccess(data.phone)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrió un error, intenta de nuevo'
      form.setError('root', { message })
    }
  })

  return {
    control: form.control as ReturnType<typeof useForm>['control'],
    errors: {
      identifier: form.formState.errors.phone,
      password: form.formState.errors.password,
      confirmPassword: form.formState.errors.confirmPassword,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    password: form.watch('password') ?? '',
    reset: form.reset,
    onSubmit,
  }
}

export const useRegisterForm = ({ method, onSuccess }: UseRegisterFormOptions): RegisterFormState => {
  const emailForm = useRegisterEmailForm(onSuccess)
  const phoneForm = useRegisterPhoneForm(onSuccess)

  useEffect(() => {
    emailForm.reset()
    phoneForm.reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method])

  return method === 'email' ? emailForm : phoneForm
}
