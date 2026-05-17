import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

import { Input, type InputProps } from '@/components/ui/input'

interface InputFieldProps<T extends FieldValues>
  extends Omit<InputProps, 'value' | 'onChangeText' | 'onBlur' | 'error'> {
  control: Control<T>
  name: FieldPath<T>
}

export function InputField<T extends FieldValues>({ control, name, ...props }: InputFieldProps<T>) {
  const { field, fieldState } = useController({ control, name })
  return (
    <Input
      {...props}
      value={field.value ?? ''}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  )
}
