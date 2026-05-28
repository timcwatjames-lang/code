import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseWebhookEvent, verifyTransaction } from '@/lib/flutterwave'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('x-verify-hash') || ''

  try {
    const event = parseWebhookEvent(body, signature)

    if (event.event === 'charge.completed' && event.data?.status === 'successful') {
      const data = event.data
      const txRef = data.tx_ref || ''
      const transactionId = String(data.id)
      const tier = data.meta?.tier || txRef.split('_')[1]?.toUpperCase()

      // Extract userId from txRef: codepro_{tier}_{userId}_{timestamp}
      const parts = txRef.split('_')
      let userId = ''
      if (parts.length >= 4) {
        // Rejoin in case userId contains underscores
        userId = parts.slice(2, -1).join('_')
      }

      if (!userId) {
        // Try to find user by email
        const user = await prisma.user.findUnique({
          where: { email: data.customer?.email },
        })
        if (user) userId = user.id
      }

      if (userId && tier) {
        const periodStart = new Date()
        const periodEnd = new Date()
        periodEnd.setMonth(periodEnd.getMonth() + 1)

        await prisma.user.update({
          where: { id: userId },
          data: { tier: tier as any },
        })

        await prisma.subscription.upsert({
          where: { userId },
          update: {
            tier: tier as any,
            flutterwaveTxRef: txRef,
            flutterwaveTxId: transactionId,
            status: 'active',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
          },
          create: {
            userId,
            tier: tier as any,
            flutterwaveTxRef: txRef,
            flutterwaveTxId: transactionId,
            status: 'active',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
          },
        })
      }
    }

    // Handle subscription renewal (if Flutterwave sends recurring payment events)
    if (event.event === 'recurring_payment' && event.data?.status === 'successful') {
      const data = event.data
      const user = await prisma.user.findUnique({
        where: { email: data.customer?.email },
      })
      if (user) {
        const periodStart = new Date()
        const periodEnd = new Date()
        periodEnd.setMonth(periodEnd.getMonth() + 1)

        await prisma.subscription.update({
          where: { userId: user.id },
          data: {
            status: 'active',
            currentPeriodStart: periodStart,
            currentPeriodEnd: periodEnd,
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Flutterwave webhook error:', err)
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 })
  }
}
