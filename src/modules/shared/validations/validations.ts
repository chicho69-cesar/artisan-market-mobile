import { emailSchema, passwordSchema } from '.'
import type { ValidationError } from '../interfaces'

export const validateEmail = async (email: string) => {
  try {
    await emailSchema.validate(email)
    return null
  } catch (error: any) {
    return (error as ValidationError).message
  }
}

export const validatePassword = async (password: string) => {
  try {
    await passwordSchema.validate(password)
    return null
  } catch (error: any) {
    return (error as ValidationError).message
  }
}
