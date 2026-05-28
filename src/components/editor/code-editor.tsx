'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Play, Copy, Check, Trash2 } from 'lucide-react'
import type { Language } from '@/types'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const LANGUAGE_CONFIGS: Record<string, { extension: string; defaultCode: string }> = {
  HTML: {
    extension: 'html',
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #1a1a2e; color: #eee; }
    h1 { color: #8b5cf6; }
  </style>
</head>
<body>
  <h1>Hello, CodePro!</h1>
  <p>Start editing to see your changes.</p>
</body>
</html>`,
  },
  CSS: {
    extension: 'css',
    defaultCode: `/* Welcome to the CSS Playground */
body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
}

.card h1 {
  color: #764ba2;
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.card p {
  color: #666;
  font-size: 1.1rem;
}`,
  },
  JAVASCRIPT: {
    extension: 'javascript',
    defaultCode: `// Welcome to JavaScript Playground
function greet(name) {
  return \`Hello, \${name}! Welcome to CodePro.\`;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test it out
console.log(greet("Developer"));
console.log("Fibonacci(10):", fibonacci(10));

// Try your own code below
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);`,
  },
  PYTHON: {
    extension: 'python',
    defaultCode: `# Welcome to Python Playground
def greet(name):
    return f"Hello, {name}! Welcome to CodePro."

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Test it out
print(greet("Developer"))
print(f"Fibonacci(10): {fibonacci(10)}")

# Try your own code below
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print(f"Doubled: {doubled}")`,
  },
}

const MONACO_LANGUAGES: Record<string, string> = {
  HTML: 'html',
  CSS: 'css',
  JAVASCRIPT: 'javascript',
  PYTHON: 'python',
}

interface CodeEditorProps {
  initialLanguage?: Language
  initialCode?: string
  readOnly?: boolean
  height?: string
}

export function CodeEditor({
  initialLanguage = 'HTML',
  initialCode,
  readOnly = false,
  height = '400px',
}: CodeEditorProps) {
  const [language, setLanguage] = useState<string>(initialLanguage)
  const [code, setCode] = useState(initialCode || LANGUAGE_CONFIGS[initialLanguage]?.defaultCode || '')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang)
    setCode(LANGUAGE_CONFIGS[newLang]?.defaultCode || '')
    setOutput('')
    setError(null)
  }

  const handleRun = useCallback(async () => {
    setRunning(true)
    setError(null)
    setOutput('')

    // For HTML/CSS, render in iframe
    if (language === 'HTML') {
      setOutput(code)
      setRunning(false)
      return
    }
    if (language === 'CSS') {
      setOutput(`/* CSS needs HTML context to render */\nPreview not available for standalone CSS.\nOpen the HTML playground to use CSS.`)
      setRunning(false)
      return
    }

    try {
      const { data } = await axios.post('/api/code/run', {
        code,
        language,
      })
      if (data.error) {
        setError(data.error)
      } else {
        setOutput(data.output)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to run code. Please sign in.')
    } finally {
      setRunning(false)
    }
  }, [code, language])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setCode('')
    setOutput('')
    setError(null)
  }

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {Object.keys(LANGUAGE_CONFIGS).map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            title="Clear"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
          {language !== 'CSS' && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              disabled={running}
            >
              <Play className="mr-1 h-4 w-4" />
              {running ? 'Running...' : 'Run'}
            </Button>
          )}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: language === 'HTML' ? '1fr 1fr' : '1fr' }}>
        <div style={{ height }}>
          <MonacoEditor
            language={MONACO_LANGUAGES[language] || 'plaintext'}
            value={code}
            onChange={(val) => setCode(val || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              readOnly,
              automaticLayout: true,
              padding: { top: 8 },
            }}
          />
        </div>

        {language === 'HTML' && (
          <div className="border-l border-gray-800" style={{ height }}>
            <div className="bg-gray-900 px-4 py-2 text-xs text-gray-400 border-b border-gray-800">
              Preview
            </div>
            <iframe
              srcDoc={output}
              className="h-full w-full bg-white"
              title="HTML Preview"
              sandbox="allow-scripts"
            />
          </div>
        )}
      </div>

      {(language === 'JAVASCRIPT' || language === 'PYTHON') && (output || error) && (
        <div className="border-t border-gray-800 bg-gray-950">
          <div className="bg-gray-900 px-4 py-2 text-xs text-gray-400">
            Output
          </div>
          <pre className={`p-4 text-sm font-mono ${error ? 'text-red-400' : 'text-green-400'}`}>
            {error || output || 'No output'}
          </pre>
        </div>
      )}
    </div>
  )
}
