'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, ChevronRight } from 'lucide-react'
import type { Course } from '@/types'
import { useAuth } from '@/hooks/use-auth'

const LANGUAGE_COLORS: Record<string, string> = {
  HTML: 'text-orange-400 bg-orange-500/10',
  CSS: 'text-blue-400 bg-blue-500/10',
  JAVASCRIPT: 'text-yellow-400 bg-yellow-500/10',
  PYTHON: 'text-green-400 bg-green-500/10',
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    axios.get('/api/courses')
      .then(({ data }) => setCourses(data.courses))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Courses</h1>
        <p className="mt-2 text-gray-400">
          Structured learning paths from beginner to advanced. Master HTML, CSS, JavaScript, and Python.
        </p>
      </div>

      {levels.map((level) => {
        const levelCourses = courses.filter((c) => c.level === level)
        if (levelCourses.length === 0) return null

        return (
          <section key={level} className="mb-12">
            <h2 className="mb-6 text-xl font-semibold text-white capitalize">
              {level.toLowerCase()}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {levelCourses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <Card hover className="group h-full flex flex-col">
                    <div className="mb-4">
                      <Badge
                        variant="default"
                        className={`${LANGUAGE_COLORS[course.language] || ''} border-0`}
                      >
                        {course.language}
                      </Badge>
                      <Badge variant="warning" className="ml-2 border-0">
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="mt-2 flex-1">
                      {course.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <BookOpen className="h-4 w-4" />
                        {course.lessonCount} lessons
                      </span>
                      {course.enrolled && (
                        <Badge variant="success" className="border-0">Enrolled</Badge>
                      )}
                      <ChevronRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-violet-400" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
