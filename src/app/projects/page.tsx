'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Lock, ChevronRight } from 'lucide-react'
import type { Project } from '@/types'
import { useAuth } from '@/hooks/use-auth'

const LANGUAGE_COLORS: Record<string, string> = {
  HTML: 'text-orange-400 bg-orange-500/10',
  CSS: 'text-blue-400 bg-blue-500/10',
  JAVASCRIPT: 'text-yellow-400 bg-yellow-500/10',
  PYTHON: 'text-green-400 bg-green-500/10',
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    axios.get('/api/projects')
      .then(({ data }) => setProjects(data.projects))
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Real-World Projects</h1>
        <p className="mt-2 text-gray-400">
          Build your portfolio with real-world projects. Subscribe to access full source code.
        </p>
      </div>

      {projects.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-gray-400">Projects coming soon!</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card hover className="group h-full flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge
                      variant="default"
                      className={`${LANGUAGE_COLORS[project.language] || ''} border-0`}
                    >
                      {project.language}
                    </Badge>
                    <Badge variant="warning" className="border-0">{project.level}</Badge>
                  </div>
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2 flex-1">
                  {project.description}
                </CardDescription>
                <div className="mt-4 flex items-center justify-between">
                  {(project as any).locked ? (
                    <Badge variant="warning" className="flex items-center gap-1 border-0">
                      <Lock className="h-3 w-3" />
                      Pro Only
                    </Badge>
                  ) : user && user.tier !== 'FREE' ? (
                    <Badge variant="success" className="border-0">Code Access</Badge>
                  ) : (
                    <Badge variant="warning" className="flex items-center gap-1 border-0">
                      <Lock className="h-3 w-3" />
                      Subscribe to Access
                    </Badge>
                  )}
                  <ChevronRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-violet-400" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
