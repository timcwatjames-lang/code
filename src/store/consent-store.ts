'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ConsentState = 'granted' | 'denied'

export interface ConsentPreferences {
  ad_storage: ConsentState
  ad_user_data: ConsentState
  ad_personalization: ConsentState
  analytics_storage: ConsentState
}

export interface ConsentStore {
  showBanner: boolean
  showDetails: boolean
  preferences: ConsentPreferences
  ccpaOptOut: boolean
  setShowBanner: (show: boolean) => void
  setShowDetails: (show: boolean) => void
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (prefs: Partial<ConsentPreferences>) => void
  setCcpaOptOut: (optOut: boolean) => void
  initialize: () => void
}

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

const DEFAULT_DENIED: ConsentPreferences = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
}

const DEFAULT_GRANTED: ConsentPreferences = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
}

export const useConsentStore = create<ConsentStore>()(
  persist(
    (set, get) => ({
      showBanner: false,
      showDetails: false,
      preferences: DEFAULT_DENIED,
      ccpaOptOut: false,

      setShowBanner: (show) => set({ showBanner: show }),
      setShowDetails: (show) => set({ showDetails: show }),

      acceptAll: () => {
        set({ preferences: DEFAULT_GRANTED, showBanner: false, showDetails: false })
        updateConsent(DEFAULT_GRANTED)
      },

      rejectAll: () => {
        set({ preferences: DEFAULT_DENIED, showBanner: false, showDetails: false })
        updateConsent(DEFAULT_DENIED)
      },

      savePreferences: (prefs) => {
        const current = get().preferences
        const updated = { ...current, ...prefs }
        set({ preferences: updated, showBanner: false, showDetails: false })
        updateConsent(updated)
      },

      setCcpaOptOut: (optOut) => {
        set({ ccpaOptOut: optOut })
        if (optOut) {
          updateConsent({ ...get().preferences, ad_personalization: 'denied' })
        }
      },

      initialize: () => {
        const state = get()
        updateConsent(state.preferences)
      },
    }),
    {
      name: 'codepro-consent',
      partialize: (state) => ({
        preferences: state.preferences,
        ccpaOptOut: state.ccpaOptOut,
      }),
    },
  ),
)

function updateConsent(prefs: ConsentPreferences) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('consent', 'update', {
    ad_storage: prefs.ad_storage,
    ad_user_data: prefs.ad_user_data,
    ad_personalization: prefs.ad_personalization,
    analytics_storage: prefs.analytics_storage,
  })
}
