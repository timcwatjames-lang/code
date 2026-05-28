import type { SubscriptionPlan } from '@/types'

export const PLANS: SubscriptionPlan[] = [
  {
    name: 'Free',
    tier: 'FREE',
    price: 0,
    features: [
      'Access to beginner courses',
      'Basic code playground',
      'Progress tracking',
    ],
    priceId: '',
  },
  {
    name: 'Basic',
    tier: 'BASIC',
    price: 9.99,
    features: [
      'All courses (HTML, CSS, JS, Python)',
      'Code playground with execution',
      'Copy project code',
      'Progress tracking',
    ],
    priceId: 'basic',
  },
  {
    name: 'Pro',
    tier: 'PRO',
    price: 19.99,
    features: [
      'Everything in Basic',
      'Advanced real-world projects',
      'Unlimited code execution',
      'Downloadable project files',
      'Priority support',
    ],
    priceId: 'pro',
  },
]
