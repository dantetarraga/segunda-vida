import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { authService } from '../_services/auth.service'
import {
  registerEmailSchema,
  registerPhoneSchema,
  type RegisterEmailFields,
  type RegisterPhoneFields,
} from '../_schemas/auth.schema'

interface SharedRegisterFormState {
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

export interface RegisterEmailFormState extends SharedRegisterFormState {
  control: ReturnType<typeof useForm<RegisterEmailFields>>['control']
}

export interface RegisterPhoneFormState extends SharedRegisterFormState {
  control: ReturnType<typeof useForm<RegisterPhoneFields>>['control']
}

export function useRegisterEmailForm(onSuccess: (contact: string) => void): RegisterEmailFormState {
  const form = useForm<RegisterEmailFields>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.registerWithEmail(data)
      onSuccess(data.email)
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
      confirmPassword: form.formState.errors.confirmPassword,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    password: form.watch('password') ?? '',
    onSubmit,
  }
}

export function useRegisterPhoneForm(onSuccess: (contact: string) => void): RegisterPhoneFormState {
  const form = useForm<RegisterPhoneFields>({
    resolver: zodResolver(registerPhoneSchema),
    defaultValues: { phone: '', password: '', confirmPassword: '' },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      await authService.registerWithPhone(data)
      onSuccess(data.phone)
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
      confirmPassword: form.formState.errors.confirmPassword,
      root: form.formState.errors.root,
    },
    isSubmitting: form.formState.isSubmitting,
    password: form.watch('password') ?? '',
    onSubmit,
  }
}
