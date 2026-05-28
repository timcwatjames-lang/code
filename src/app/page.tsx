import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code2, BookOpen, Play, Copy, ArrowRight, Star, Users, Layers } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Structured Curriculum',
    description: 'Beginner to advanced tutorials in HTML, CSS, JavaScript, and Python.',
  },
  {
    icon: Play,
    title: 'Interactive Playground',
    description: 'Write and run code directly in your browser. See results instantly.',
  },
  {
    icon: Copy,
    title: 'Project Code Access',
    description: 'Subscribe to copy real-world project code and build your portfolio.',
  },
]

const languages = [
  { name: 'HTML', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { name: 'CSS', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { name: 'JavaScript', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { name: 'Python', color: 'text-green-400', bg: 'bg-green-500/10' },
]

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Badge variant="primary" className="mb-6">Now with Interactive Code Playground</Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Learn to Code from{' '}
            <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
              Zero to Hero
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Master HTML, CSS, JavaScript, and Python with hands-on tutorials, real-world projects,
            and a built-in code playground. Start your coding journey today.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="primary" size="lg">
                Start Learning Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Try Playground
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" /> No credit card</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4 text-violet-500" /> 10,000+ learners</span>
            <span className="flex items-center gap-1"><Layers className="h-4 w-4 text-green-500" /> 200+ lessons</span>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <Badge key={lang.name} variant="default" className={`${lang.bg} ${lang.color} border-0 px-4 py-2 text-sm`}>
                {lang.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-white">Everything You Need to Master Coding</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
            A complete learning platform designed to take you from absolute beginner to job-ready developer.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-200 hover:border-violet-500/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10">
                  <feature.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent p-8 md:p-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div>
                <h2 className="text-3xl font-bold text-white">Ready to Start Coding?</h2>
                <p className="mt-2 max-w-xl text-gray-400">
                  Join thousands of learners. No credit card required. Start with our free tier and upgrade when you&apos;re ready.
                </p>
              </div>
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
