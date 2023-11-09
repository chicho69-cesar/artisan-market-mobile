import * as yup from 'yup'

export const emailSchema = yup
  .string()
  .email('Ingresa un correo electrónico válido')
  .required('El correo electrónico es obligatorio')

export const passwordSchema = yup
  .string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .required('La contraseña es obligatoria')
