export interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export interface ImageUploadProps {
  images: string[]
  onChange: (urls: string[]) => void
  folder?: string
  maxImages?: number
  single?: boolean
  onUploadStart?: () => void
  onUploadEnd?: () => void
}

export interface UploadingFile {
  id: string
  name: string
  preview: string
  progress: 'uploading' | 'done' | 'error'
}
