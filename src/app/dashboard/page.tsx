'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { BookOpen, Code2, Award, ArrowRight, Play } from 'lucide-react'
import type { Course } from '@/types'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    if (user) {
      axios.get('/api/courses').then(({ data }) => {
        setCourses(data.courses.filter((c: Course) => c.enrolled))
      }).catch(console.error)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-white">Welcome to CodePro</h1>
        <p className="text-gray-400">Sign in to view your dashboard</p>
        <Link href="/login"><Button variant="primary">Sign In</Button></Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-400">Welcome back, {user?.username}</p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
              <BookOpen className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{courses.length}</p>
              <p className="text-sm text-gray-400">Enrolled Courses</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Award className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {user?.tier === 'FREE' ? 'Free' : user?.tier}
              </p>
              <p className="text-sm text-gray-400">Membership</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
              <Code2 className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {user?.tier === 'FREE' ? 'Limited' : 'Unlimited'}
              </p>
              <p className="text-sm text-gray-400">Code Access</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">My Courses</h2>
          <Link href="/courses">
            <Button variant="ghost" size="sm">
              Browse All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        {courses.length === 0 ? (
          <Card>
            <div className="text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-600" />
              <h3 className="mt-4 text-lg font-medium text-white">No courses yet</h3>
              <p className="mt-2 text-sm text-gray-400">Enroll in a course to get started</p>
              <Link href="/courses">
                <Button variant="primary" className="mt-4">Browse Courses</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card hover>
                  <Badge variant="primary" className="border-0 mb-2">{course.language}</Badge>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="mt-1">{course.description}</CardDescription>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{course.lessonCount} lessons</span>
                    <Play className="h-4 w-4 text-violet-400" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/playground">
            <Button variant="secondary">
              <Play className="mr-2 h-4 w-4" />
              Open Playground
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="secondary">
              <Code2 className="mr-2 h-4 w-4" />
              View Projects
            </Button>
          </Link>
          {user?.tier === 'FREE' && (
            <Link href="/pricing">
              <Button variant="primary">
                Upgrade to Pro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
