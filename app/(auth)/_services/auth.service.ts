export const authService = {
  loginWithEmail: async (_identifier: string, _password: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  loginWithPhone: async (_identifier: string, _password: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  registerWithEmail: async (_identifier: string, _password: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  registerWithPhone: async (_identifier: string, _password: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },

  forgotPassword: async (_email: string): Promise<void> => {
    await new Promise(r => setTimeout(r, 1500))
  },

  loginWithGoogle: async (): Promise<void> => {
    await new Promise(r => setTimeout(r, 1000))
  },
}
