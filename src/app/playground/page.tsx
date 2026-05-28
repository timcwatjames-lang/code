'use client'

import { CodeEditor } from '@/components/editor/code-editor'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { Play, Lock } from 'lucide-react'

export default function PlaygroundPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Code Playground</h1>
        <p className="mt-2 text-gray-400">
          Write and run code directly in your browser. Switch between HTML, CSS, JavaScript, and Python.
        </p>
      </div>

      {!isAuthenticated && (
        <Card className="mb-6 border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-amber-400" />
            <p className="text-sm text-amber-300">
              <a href="/login" className="underline hover:text-amber-200">Sign in</a> to run JavaScript and Python code. HTML and CSS preview is available for everyone.
            </p>
          </div>
        </Card>
      )}

      <div className="grid gap-6">
        <CodeEditor height="500px" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { title: 'HTML', desc: 'Build web pages with HTML and see live preview', icon: '🌐' },
          { title: 'CSS', desc: 'Style your pages with modern CSS', icon: '🎨' },
          { title: 'JavaScript', desc: 'Run JS code and see console output', icon: '⚡' },
          { title: 'Python', desc: 'Execute Python scripts and see results', icon: '🐍' },
        ].map((item) => (
          <Card key={item.title} className="flex items-start gap-3 p-4">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h3 className="font-medium text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
