import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request)
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('language')

  const where: any = { published: true }
  if (language) where.language = language.toUpperCase()

  const courses = await prisma.course.findMany({
    where,
    include: {
      _count: { select: { lessons: true } },
      ...(user ? {
        enrollments: {
          where: { userId: user.id },
        },
      } : {}),
    },
    orderBy: { order: 'asc' },
  })

  const mapped = courses.map((course) => ({
    ...course,
    lessonCount: course._count.lessons,
    enrolled: user ? course.enrollments.length > 0 : false,
    _count: undefined,
    enrollments: undefined,
  }))

  return NextResponse.json({ courses: mapped })
}
