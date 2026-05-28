'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { PLANS } from '@/lib/plans'

const FEATURES_MATRIX = [
  { name: 'Beginner courses', free: true, basic: true, pro: true },
  { name: 'HTML & CSS tutorials', free: true, basic: true, pro: true },
  { name: 'JavaScript & Python courses', free: false, basic: true, pro: true },
  { name: 'Code playground', free: true, basic: true, pro: true },
  { name: 'Run JS & Python code', free: false, basic: true, pro: true },
  { name: 'Progress tracking', free: true, basic: true, pro: true },
  { name: 'Copy project source code', free: false, basic: true, pro: true },
  { name: 'Intermediate courses', free: false, basic: true, pro: true },
  { name: 'Advanced courses', free: false, basic: false, pro: true },
  { name: 'Download project files', free: false, basic: false, pro: true },
  { name: 'Unlimited code execution', free: false, basic: false, pro: true },
  { name: 'Priority support', free: false, basic: false, pro: true },
]

export default function PricingPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (plan: typeof PLANS[0]) => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (plan.tier === 'FREE') {
      router.push('/dashboard')
      return
    }

    setLoading(plan.tier)
    try {
      const { data } = await axios.post('/api/subscriptions', {
        tier: plan.tier,
      })
      window.location.href = data.url
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to start subscription')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Start for free. Upgrade when you&apos;re ready to unlock the full learning experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <Card
            key={plan.tier}
            className={`relative flex flex-col ${
              plan.tier === 'PRO' ? 'border-violet-500/50 ring-1 ring-violet-500/20' : ''
            }`}
          >
            {plan.tier === 'PRO' && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary" className="border-0">Most Popular</Badge>
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-gray-400">/month</span>
              </div>
            </div>
            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.tier === 'FREE' ? 'outline' : 'primary'}
              className="w-full"
              size="lg"
              onClick={() => handleSubscribe(plan)}
              disabled={loading === plan.tier}
            >
              {loading === plan.tier
                ? 'Processing...'
                : plan.tier === 'FREE'
                ? 'Get Started'
                : `Subscribe to ${plan.name}`}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">
          Compare Plans
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 text-left text-sm font-medium text-gray-400">Feature</th>
                <th className="py-3 text-center text-sm font-medium text-gray-400">Free</th>
                <th className="py-3 text-center text-sm font-medium text-violet-400">Basic</th>
                <th className="py-3 text-center text-sm font-medium text-violet-400">Pro</th>
              </tr>
            </thead>
            <tbody>
              {FEATURES_MATRIX.map((feature) => (
                <tr key={feature.name} className="border-b border-gray-800/50">
                  <td className="py-3 text-sm text-gray-300">{feature.name}</td>
                  <td className="py-3 text-center">
                    {feature.free ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <X className="mx-auto h-4 w-4 text-gray-600" />
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {feature.basic ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <X className="mx-auto h-4 w-4 text-gray-600" />
                    )}
                  </td>
                  <td className="py-3 text-center">
                    {feature.pro ? (
                      <Check className="mx-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <X className="mx-auto h-4 w-4 text-gray-600" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
