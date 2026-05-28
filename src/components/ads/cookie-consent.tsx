'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { useConsentStore } from '@/store/consent-store'

export function CookieConsent() {
  const {
    showBanner, showDetails, preferences,
    setShowBanner, setShowDetails,
    acceptAll, rejectAll, savePreferences, initialize,
  } = useConsentStore()

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    initialize()
    const timer = setTimeout(() => {
      const hasConsent = localStorage.getItem('codepro-consent')
      if (!hasConsent) {
        setVisible(true)
        setShowBanner(true)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible || !showBanner) return null

  const isEu = false // In production, detect via geolocation API or IP

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <Card className="mx-auto max-w-3xl border-gray-700/50 bg-gray-900/95 backdrop-blur-xl shadow-2xl">
        {!showDetails ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-300">
                <strong className="text-white">Your Privacy</strong>
                {' '}We use cookies and similar technologies to personalize content and ads,
                provide social media features, and analyze traffic.
                {isEu && ' You can accept all or manage preferences.'}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {isEu
                  ? 'GDPR applies — consent required for personalized ads.'
                  : 'CCPA allows you to opt out of sale of personal information.'}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(true)}>
                Manage
              </Button>
              <Button variant="outline" size="sm" onClick={rejectAll}>
                Reject All
              </Button>
              <Button variant="primary" size="sm" onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Privacy Preferences</h3>
              <button
                onClick={() => { setShowDetails(false); setShowBanner(false) }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <ConsentToggle
                label="Ad Storage"
                description="Enable storage of advertising-related cookies."
                checked={preferences.ad_storage === 'granted'}
                onChange={(v) => savePreferences({ ad_storage: v ? 'granted' : 'denied' })}
              />
              <ConsentToggle
                label="Ad User Data"
                description="Allow sending user data for advertising purposes."
                checked={preferences.ad_user_data === 'granted'}
                onChange={(v) => savePreferences({ ad_user_data: v ? 'granted' : 'denied' })}
              />
              <ConsentToggle
                label="Ad Personalization"
                description="Allow personalized ads based on your interests."
                checked={preferences.ad_personalization === 'granted'}
                onChange={(v) => savePreferences({ ad_personalization: v ? 'granted' : 'denied' })}
              />
              <ConsentToggle
                label="Analytics Storage"
                description="Enable analytics cookies to help us improve."
                checked={preferences.analytics_storage === 'granted'}
                onChange={(v) => savePreferences({ analytics_storage: v ? 'granted' : 'denied' })}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={rejectAll}>
                Reject All
              </Button>
              <Button variant="primary" size="sm" onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

function ConsentToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-800 bg-gray-950/50 p-3 transition-colors hover:border-gray-700">
      <div className="flex h-5 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </label>
  )
}
