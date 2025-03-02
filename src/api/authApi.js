import { useQuery } from '@tanstack/vue-query'
import { useMutation } from '@tanstack/vue-query'
import api from './axios'

const getCsrfToken = async () => {
  await api.get('/sanctum/csrf-cookie')
}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      await getCsrfToken()
      api.post('/api/login', credentials)
    },
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data.data.user))
    },
  })
}

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      await getCsrfToken()
      api.post('/api/register', credentials)
    },
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      api.post('/api/logout',)
    },
  })
}

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => api.get('/api/me'),
  })
}

