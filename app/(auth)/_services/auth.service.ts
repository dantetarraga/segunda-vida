import type {
  LoginEmailFields,
  LoginPhoneFields,
  RegisterEmailFields,
  RegisterPhoneFields,
} from '../_schemas/auth.schema'

// TODO: Replace mock implementations with real API calls once backend is available.
// TODO: On success, call setSession(user) from the auth store (to be created at project root).

export const authService = {
  loginWithEmail: async (_data: LoginEmailFields): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  loginWithPhone: async (_data: LoginPhoneFields): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  registerWithEmail: async (_data: RegisterEmailFields): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  registerWithPhone: async (_data: RegisterPhoneFields): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  forgotPassword: async (_email: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 1500))
  },

  loginWithGoogle: async (): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },
}
