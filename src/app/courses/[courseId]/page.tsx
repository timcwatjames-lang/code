'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, CheckCircle, Circle, Lock, Play } from 'lucide-react'
import type { Course as CourseType, Lesson } from '@/types'
import { useAuth } from '@/hooks/use-auth'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [course, setCourse] = useState<CourseType & { lessons: Lesson[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    if (!params.courseId) return
    axios.get(`/api/courses/${params.courseId}`)
      .then(({ data }) => setCourse(data.course))
      .catch(() => toast.error('Course not found'))
      .finally(() => setLoading(false))
  }, [params.courseId])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    setEnrolling(true)
    try {
      await axios.post(`/api/courses/${params.courseId}/enroll`)
      toast.success('Enrolled successfully!')
      setCourse((prev) => prev ? { ...prev, enrolled: true } : prev)
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to enroll')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Course not found</p>
        <Link href="/courses"><Button variant="outline">Browse Courses</Button></Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <Link href="/courses" className="text-sm text-violet-400 hover:text-violet-300">
          &larr; Back to courses
        </Link>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <Badge variant="primary" className="border-0">{course.language}</Badge>
          <Badge variant="warning" className="border-0">{course.level}</Badge>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <BookOpen className="h-4 w-4" />
            {course.lessonCount} lessons
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
        <p className="mt-2 text-lg text-gray-400">{course.description}</p>
        <div className="mt-6">
          {course.enrolled ? (
            <Button variant="primary" size="lg" disabled>
              <CheckCircle className="mr-2 h-5 w-5" />
              Enrolled
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? 'Enrolling...' : 'Enroll Now'}
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="mb-4 text-xl font-semibold text-white">Course Content</h2>
        {course.lessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            href={course.enrolled ? `/courses/${course.id}/lessons/${lesson.id}` : '#'}
            onClick={(e) => {
              if (!course.enrolled) {
                e.preventDefault()
                toast('Enroll to access lessons')
              }
            }}
          >
            <Card className="flex items-center gap-4 p-4 transition-colors hover:border-gray-700">
              <div className="flex-shrink-0">
                {lesson.completed ? (
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                ) : course.enrolled ? (
                  <Circle className="h-5 w-5 text-gray-600" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Lesson {index + 1}</span>
                </div>
                <CardTitle className="text-base">{lesson.title}</CardTitle>
              </div>
              {course.enrolled && (
                <Play className="h-4 w-4 text-gray-600" />
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
