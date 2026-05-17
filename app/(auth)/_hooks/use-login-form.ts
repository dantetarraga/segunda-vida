import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { Method } from '../_constants/method-config'
import { authService } from '../_services/auth.service'
import {
  loginEmailSchema,
  loginPhoneSchema,
  type LoginEmailFields,
  type LoginPhoneFields,
} from '../_schemas/auth.schema'

interface UseLoginFormOptions {
  method: Method
  onSuccess: () => void
}

interface LoginFormState {
  control: ReturnType<typeof useForm>['control']
  errors: {
    identifier?: { message?: string }
    password?: { message?: string }
    root?: { message?: string }
  }
  isSubmitting: boolean
  reset: () => void
  onSubmit: () => void
}

const useLoginEmailForm = (onSuccess: () => void): LoginFormState => {
  const form = useForm<LoginEmailFields>({ resolver: zodResolver(loginEmailSchema) })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.loginWithEmail(data)
      onSuccess()
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
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    reset: form.reset,
    onSubmit,
  }
}

const useLoginPhoneForm = (onSuccess: () => void): LoginFormState => {
  const form = useForm<LoginPhoneFields>({ resolver: zodResolver(loginPhoneSchema) })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.loginWithPhone(data)
      onSuccess()
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
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    reset: form.reset,
    onSubmit,
  }
}

export const useLoginForm = ({ method, onSuccess }: UseLoginFormOptions): LoginFormState => {
  const emailForm = useLoginEmailForm(onSuccess)
  const phoneForm = useLoginPhoneForm(onSuccess)

  useEffect(() => {
    emailForm.reset()
    phoneForm.reset()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method])

  return method === 'email' ? emailForm : phoneForm
}
