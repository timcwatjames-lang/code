'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CodeEditor } from '@/components/editor/code-editor'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Lesson } from '@/types'
import { useAuth } from '@/hooks/use-auth'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    if (!params.lessonId || !params.courseId) return
    axios.get(`/api/courses/${params.courseId}/lessons/${params.lessonId}`)
      .then(({ data }) => {
        setLesson(data.lesson)
        setCompleted(data.lesson.completed)
      })
      .catch(() => toast.error('Lesson not found'))
      .finally(() => setLoading(false))
  }, [params.lessonId, params.courseId])

  const markComplete = async () => {
    setCompleting(true)
    try {
      await axios.post(`/api/courses/${params.courseId}/lessons/${params.lessonId}`, {
        completed: true,
      })
      setCompleted(true)
      toast.success('Lesson completed!')
    } catch {
      toast.error('Failed to mark complete')
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Lesson not found</p>
        <Link href="/courses"><Button variant="outline">Browse Courses</Button></Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/courses/${params.courseId}`}
          className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to course
        </Link>
      </div>

      <article className="prose prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>

        <div className="mt-6">
          <div
            className="text-gray-300 leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </div>
      </article>

      {lesson.content && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Try it yourself</h2>
          <CodeEditor height="350px" />
        </div>
      )}

      <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-6">
        <div>
          {completed ? (
            <Badge variant="success" className="flex items-center gap-1 border-0">
              <CheckCircle className="h-4 w-4" />
              Completed
            </Badge>
          ) : (
            <Button
              variant="primary"
              onClick={markComplete}
              disabled={completing}
            >
              {completing ? 'Marking...' : 'Mark as Complete'}
            </Button>
          )}
        </div>
        <Button variant="ghost" size="sm" className="text-gray-400">
          Next Lesson
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
