'use client'

import { create } from 'zustand'
import axios from 'axios'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isLoading: false }),

  fetchUser: async () => {
    try {
      const { data } = await axios.get('/api/auth/me')
      set({ user: data.user, isAuthenticated: true, isLoading: false })
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/auth/logout')
    } catch {
      // ignore
    }
    set({ user: null, isAuthenticated: false })
  },
}))
