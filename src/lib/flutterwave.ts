const FLW_BASE = 'https://api.flutterwave.com/v3'
const FLW_SECRET = process.env.FLUTTERWAVE_SECRET_KEY || ''

interface FlutterwaveResponse {
  status: 'success' | 'error'
  message: string
  data?: any
}

async function flwFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${FLW_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FLW_SECRET}`,
      ...options.headers,
    },
  })
  return res.json() as Promise<FlutterwaveResponse>
}

export async function initializePayment({
  email,
  amount,
  tx_ref,
  redirect_url,
  customer_name,
}: {
  email: string
  amount: number
  tx_ref: string
  redirect_url: string
  customer_name?: string
}) {
  return flwFetch('/payments', {
    method: 'POST',
    body: JSON.stringify({
      tx_ref,
      amount,
      currency: 'USD',
      redirect_url,
      customer: {
        email,
        name: customer_name || email,
      },
      meta: {
        consumer_id: email,
      },
      configurations: {
        session_duration: 30,
      },
    }),
  })
}

export async function verifyTransaction(transactionId: string) {
  return flwFetch(`/transactions/${transactionId}/verify`)
}

export function generateTxRef(userId: string, tier: string) {
  return `codepro_${tier.toLowerCase()}_${userId}_${Date.now()}`
}

export function parseWebhookEvent(body: string, signature: string) {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH || ''

  // Flutterwave sends X-Verify-Hash header
  if (secretHash && signature !== secretHash) {
    throw new Error('Invalid webhook signature')
  }

  return JSON.parse(body)
}

export const PLANS = [
  {
    name: 'Free',
    tier: 'FREE' as const,
    price: 0,
    features: [
      'Access to beginner courses',
      'Basic code playground',
      'Progress tracking',
    ],
  },
  {
    name: 'Basic',
    tier: 'BASIC' as const,
    price: 9.99,
    features: [
      'All courses (HTML, CSS, JS, Python)',
      'Code playground with execution',
      'Copy project code',
      'Progress tracking',
    ],
  },
  {
    name: 'Pro',
    tier: 'PRO' as const,
    price: 19.99,
    features: [
      'Everything in Basic',
      'Advanced real-world projects',
      'Unlimited code execution',
      'Downloadable project files',
      'Priority support',
    ],
  },
]
