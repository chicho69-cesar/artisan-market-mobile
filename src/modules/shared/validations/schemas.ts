import * as yup from 'yup'

export const emailSchema = yup
  .string()
  .email('Ingresa un correo electrónico válido')
  .required('El correo electrónico es obligatorio')

export const passwordSchema = yup
  .string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .required('La contraseña es obligatoria')

export const streetSchema = yup
  .string()
  .required('La calle es obligatoria')

export const noOutSchema = yup
  .string()
  .required('El numero exterior es obligatorio')

export const noInSchema = yup
  .string()
  .required('El numero interior es obligatorio')

export const zipCodeSchema = yup
  .string()
  .required('El código postal es obligatorio')

export const citySchema = yup
  .string()
  .required('La ciudad es obligatoria')

export const stateSchema = yup
  .string()
  .required('El estado es obligatorio')

export const countrySchema = yup
  .string()
  .required('El país es obligatorio')

export const phoneSchema = yup
  .string()
  .required('El teléfono es obligatorio')
  .max(20, 'El teléfono no debe exceder los 20 caracteres')

export const reviewSchema = yup
  .string()
  .required('La review es obligatoria')
