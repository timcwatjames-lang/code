import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'
import { initializePayment, generateTxRef, PLANS } from '@/lib/flutterwave'

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  })

  return NextResponse.json({ subscription, plans: PLANS })
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { tier } = await request.json()
    const plan = PLANS.find((p) => p.tier === tier && p.price > 0)
    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const txRef = generateTxRef(user.id, tier)

    const result = await initializePayment({
      email: user.email,
      amount: plan.price,
      tx_ref: txRef,
      redirect_url: `${origin}/api/subscriptions/verify?tx_ref=${txRef}&tier=${tier}`,
      customer_name: user.username,
    })

    if (result.status !== 'success' || !result.data?.link) {
      console.error('Flutterwave init failed:', result)
      return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 })
    }

    return NextResponse.json({ url: result.data.link })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
