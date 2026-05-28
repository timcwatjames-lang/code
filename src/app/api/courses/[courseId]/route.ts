import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> },
) {
  const { courseId } = await params
  const user = await getUserFromRequest(request)

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        select: {
          id: true,
          title: true,
          slug: true,
          order: true,
          courseId: true,
          videoUrl: true,
          ...(user ? {
            progress: {
              where: { userId: user.id },
              select: { completed: true },
            },
          } : {}),
        },
      },
      _count: { select: { lessons: true } },
    },
  })

  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  const lessons = course.lessons.map((lesson) => ({
    ...lesson,
    completed: user ? (lesson as any).progress?.[0]?.completed ?? false : false,
    progress: undefined,
  }))

  return NextResponse.json({
    course: {
      ...course,
      lessons,
      lessonCount: course._count.lessons,
      _count: undefined,
    },
  })
}
