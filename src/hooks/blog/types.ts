export interface Blog {
  id: string
  slug: string
  title: string
  summary: string
  thumbnailUrl?: string
  author: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface BlogDetail extends Blog {
  content: string
}

export interface BlogForm {
  slug: string
  title: string
  summary: string
  content: string
  thumbnailUrl: string
  author: string
  isPublished: boolean
}
