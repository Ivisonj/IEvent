import axios from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL
export const API_V1 = process.env.NEXT_PUBLIC_API_V1

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export interface AxiosErrorResponse {
  response?: {
    data?: {
      message?: string
    }
  }
}

export const handleError = (error: AxiosErrorResponse) => {
  return error.response?.data?.message || 'Erro desconhecido'
}
