'use client'

import Script from 'next/script'

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID

export function GoogleConsentMode() {
  if (!ADSENSE_ID) return null

  return (
    <Script id="google-consent-mode" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}

        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied',
          'wait_for_update': 2000,
        });

        gtag('set', 'ads_data_redaction', true);
        gtag('set', 'url_passthrough', true);
      `}
    </Script>
  )
}

export function GoogleConsentUpdate() {
  if (!ADSENSE_ID) return null

  return (
    <Script id="google-consent-update" strategy="afterInteractive">
      {`
        if (window.gtag) {
          try {
            const stored = localStorage.getItem('codepro-consent');
            if (stored) {
              const { state } = JSON.parse(stored);
              if (state && state.preferences) {
                gtag('consent', 'update', {
                  'ad_storage': state.preferences.ad_storage || 'denied',
                  'ad_user_data': state.preferences.ad_user_data || 'denied',
                  'ad_personalization': state.preferences.ad_personalization || 'denied',
                  'analytics_storage': state.preferences.analytics_storage || 'denied',
                });
              }
            }
          } catch (e) {
            console.warn('Failed to restore consent preferences', e);
          }
        }
      `}
    </Script>
  )
}
