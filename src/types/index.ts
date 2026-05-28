export type SubscriptionTier = 'FREE' | 'BASIC' | 'PRO'
export type Language = 'HTML' | 'CSS' | 'JAVASCRIPT' | 'PYTHON'
export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export interface User {
  id: string
  email: string
  username: string
  tier: SubscriptionTier
  createdAt: string
}

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  language: Language
  level: Level
  imageUrl: string | null
  order: number
  published: boolean
  lessonCount?: number
  enrolled?: boolean
}

export interface Lesson {
  id: string
  title: string
  slug: string
  content: string
  videoUrl: string | null
  order: number
  courseId: string
  completed?: boolean
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  language: Language
  level: Level
  imageUrl: string | null
  demoUrl: string | null
  code: string
  files: { name: string; content: string }[]
  published: boolean
}

export interface CodeResult {
  output: string
  error: string | null
  executionTime: number
}

export interface SubscriptionPlan {
  id: string
  name: string
  tier: SubscriptionTier
  price: number
  features: string[]
  priceId: string
}
