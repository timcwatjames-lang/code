import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { PrivacyChoicesLink } from '@/components/ads/privacy-link'

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <Code2 className="h-5 w-5 text-violet-500" />
              CodePro
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Master coding from beginner to advanced. Learn HTML, CSS, JavaScript, and Python.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-200">Courses</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/courses/html" className="hover:text-white">HTML</Link>
              <Link href="/courses/css" className="hover:text-white">CSS</Link>
              <Link href="/courses/javascript" className="hover:text-white">JavaScript</Link>
              <Link href="/courses/python" className="hover:text-white">Python</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-200">Platform</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/playground" className="hover:text-white">Code Playground</Link>
              <Link href="/projects" className="hover:text-white">Projects</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-200">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <a href="mailto:support@codepro.dev" className="hover:text-white">Contact</a>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col items-center gap-2 text-sm text-gray-500">
          <PrivacyChoicesLink />
          <span>&copy; {new Date().getFullYear()} CodePro. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
