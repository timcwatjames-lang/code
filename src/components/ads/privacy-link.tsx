'use client'

import { useConsentStore } from '@/store/consent-store'
import { Shield } from 'lucide-react'

export function PrivacyChoicesLink() {
  const { setShowBanner, setShowDetails } = useConsentStore()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowDetails(true)
    setShowBanner(true)
  }

  return (
    <button onClick={handleClick} className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
      <Shield className="h-3.5 w-3.5" />
      Your Privacy Choices
    </button>
  )
}
