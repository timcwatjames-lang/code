import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyTransaction } from '@/lib/flutterwave'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const txRef = searchParams.get('tx_ref')
  const tier = searchParams.get('tier') as string
  const transactionId = searchParams.get('transaction_id')
  const status = searchParams.get('status')

  if (!txRef || !tier) {
    return NextResponse.redirect(new URL('/pricing?error=invalid_params', request.url))
  }

  // Extract userId from txRef format: codepro_{tier}_{userId}_{timestamp}
  const userId = txRef.split('_').slice(2, -1).join('_')
  if (!userId) {
    return NextResponse.redirect(new URL('/pricing?error=invalid_ref', request.url))
  }

  // If cancelled
  if (status === 'cancelled') {
    return NextResponse.redirect(new URL('/pricing?canceled=true', request.url))
  }

  // Verify transaction
  if (transactionId) {
    try {
      const verification = await verifyTransaction(transactionId)
      if (verification.status === 'success' && verification.data?.status === 'successful') {
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

        return NextResponse.redirect(new URL('/dashboard?success=true', request.url))
      }
    } catch (err) {
      console.error('Verification error:', err)
    }
  }

  // Fallback: mark as pending, will be confirmed via webhook
  return NextResponse.redirect(new URL('/dashboard?pending=true', request.url))
}
