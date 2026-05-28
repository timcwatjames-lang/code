import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request)
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('language')
  const level = searchParams.get('level')

  const where: any = { published: true }
  if (language) where.language = language.toUpperCase()
  if (level) where.level = level.toUpperCase()

  const projects = await prisma.project.findMany({
    where,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      language: true,
      level: true,
      imageUrl: true,
      published: true,
      createdAt: true,
      ...(user?.tier === 'FREE' ? {} : {
        code: true,
        files: true,
      }),
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ projects })
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      language: body.language,
      level: body.level,
      code: body.code,
      files: body.files || [],
      imageUrl: body.imageUrl,
      demoUrl: body.demoUrl,
    },
  })

  return NextResponse.json({ project }, { status: 201 })
}
