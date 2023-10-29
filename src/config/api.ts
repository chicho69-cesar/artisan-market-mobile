import axios from 'axios'
import { serverUrl } from '@/modules/shared/constants'

export const api = axios.create({
  baseURL: `${serverUrl}/api`
})
