'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { CodeEditor } from '@/components/editor/code-editor'
import { Lock, ArrowLeft, Download, ExternalLink } from 'lucide-react'
import type { Project } from '@/types'
import { useAuth } from '@/hooks/use-auth'

export default function ProjectDetailPage() {
  const params = useParams()
  const { user, isAuthenticated } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (!params.projectId) return
    axios.get(`/api/projects/${params.projectId}`)
      .then(({ data }) => {
        if (data.project.locked) {
          setLocked(true)
          setProject(data.project)
        } else {
          setProject(data.project)
        }
      })
      .catch(() => toast.error('Project not found'))
      .finally(() => setLoading(false))
  }, [params.projectId])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Project not found</p>
        <Link href="/projects"><Button variant="outline">Back to Projects</Button></Link>
      </div>
    )
  }

  if (locked) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
        <Card className="mt-8 text-center py-16">
          <Lock className="mx-auto h-16 w-16 text-amber-400" />
          <h2 className="mt-4 text-2xl font-bold text-white">Subscribe to Access</h2>
          <p className="mt-2 text-gray-400 max-w-md mx-auto">
            This project source code is available for Basic and Pro subscribers. Upgrade to unlock the full code.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/pricing">
              <Button variant="primary">View Plans</Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline">Browse Projects</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <div className="mt-6 mb-8">
        <div className="mb-4 flex items-center gap-3">
          <Badge variant="primary" className="border-0">{project.language}</Badge>
          <Badge variant="warning" className="border-0">{project.level}</Badge>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            <p className="mt-2 text-gray-400">{project.description}</p>
          </div>
          <div className="flex gap-2">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
                </Button>
              </a>
            )}
            <Button variant="secondary" size="sm" onClick={() => {
              const code = project.files?.map((f) => `// ${f.name}\n${f.content}`).join('\n\n') || project.code
              navigator.clipboard.writeText(code)
              toast.success('Code copied!')
            }}>
              <Download className="mr-1 h-4 w-4" /> Copy Code
            </Button>
          </div>
        </div>
      </div>

      {project.files && project.files.length > 0 ? (
        <div className="space-y-4">
          {project.files.map((file, index) => (
            <div key={index}>
              <h3 className="mb-2 text-sm font-medium text-gray-400">{file.name}</h3>
              <CodeEditor
                initialLanguage={project.language as any}
                initialCode={file.content}
                readOnly
                height="300px"
              />
            </div>
          ))}
        </div>
      ) : (
        <CodeEditor
          initialLanguage={project.language as any}
          initialCode={project.code}
          readOnly
          height="500px"
        />
      )}
    </div>
  )
}
