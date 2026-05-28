'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth-store'

export function useAuth() {
  const store = useAuthStore()

  useEffect(() => {
    if (!store.user && store.isLoading) {
      store.fetchUser()
    }
  }, [])

  return store
}
