'use client'

import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Spinner } from '@/components/icons'
import { useUploadFile } from '@/hooks/upload'
import { TiptapEditorProps } from '@/interface'

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean
  onClick: () => void
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type='button'
      title={title}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-semibold transition-all select-none border
        ${
          active
            ? 'bg-amber-500 text-white border-amber-600 shadow-sm ring-2 ring-amber-200'
            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
        }`}
      aria-pressed={active}
      data-active={active ? 'true' : 'false'}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className='w-px h-6 bg-gray-300 mx-1' />
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const [uploadError, setUploadError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [, setTick] = useState(0)
  const { uploadFile } = useUploadFile()

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Bắt đầu viết nội dung bài viết...' }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    onTransaction() {
      setTick((t) => t + 1)
    },
    editorProps: {
      attributes: { class: 'focus:outline-none' },
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || [])
        const imageItem = items.find((item) => item.type.startsWith('image/'))
        if (!imageItem) return false

        const file = imageItem.getAsFile()
        if (!file) return false

        event.preventDefault()
        setUploadError('')
        setUploading(true)

        uploadFile(file, 'blog')
          .then((url) => {
            const { from } = view.state.selection
            editor?.chain().focus().setTextSelection(from).setImage({ src: url }).run()
            setUploading(false)
          })
          .catch((err) => {
            setUploadError(err.message || 'Không thể upload ảnh. Vui lòng thử lại.')
            setUploading(false)
          })

        return true
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>')
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div className='border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm'>
      <div className='border-b border-gray-200 bg-gray-50 px-3 py-2 flex flex-wrap items-center gap-1'>
        <ToolbarButton
          active={editor.isActive('heading', { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title='Tiêu đề lớn (H1)'
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title='Tiêu đề vừa (H2)'
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title='Tiêu đề nhỏ (H3)'
        >
          H3
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title='In đậm (Ctrl+B)'
        >
          <span style={{ fontWeight: 900 }}>B</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title='In nghiêng (Ctrl+I)'
        >
          <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>I</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title='Gạch chân (Ctrl+U)'
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title='Gạch ngang'
        >
          <span style={{ textDecoration: 'line-through' }}>S</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
          title='Code inline'
        >
          {'<>'}
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title='Danh sách chấm'
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title='Danh sách số'
        >
          1≡
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title='Trích dẫn'
        >
          "
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title='Hoàn tác (Ctrl+Z)'>
          ↩
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title='Làm lại (Ctrl+Y)'>
          ↪
        </ToolbarButton>

        <div className='ml-auto flex items-center gap-1 text-xs text-gray-400'>
          {editor.isActive('bold') && <span className='font-bold text-amber-600'>B</span>}
          {editor.isActive('italic') && <span className='italic text-amber-600'>I</span>}
          {editor.isActive('underline') && <span className='underline text-amber-600'>U</span>}
          {editor.isActive('strike') && <span className='line-through text-amber-600'>S</span>}
          {editor.isActive('heading', { level: 1 }) && <span className='text-amber-600 font-semibold'>H1</span>}
          {editor.isActive('heading', { level: 2 }) && <span className='text-amber-600 font-semibold'>H2</span>}
          {editor.isActive('heading', { level: 3 }) && <span className='text-amber-600 font-semibold'>H3</span>}
          {editor.isActive('bulletList') && <span className='text-amber-600'>• List</span>}
          {editor.isActive('orderedList') && <span className='text-amber-600'>1. List</span>}
          {editor.isActive('blockquote') && <span className='text-amber-600 italic'>"Quote"</span>}
        </div>

        {uploading && (
          <span className='ml-auto text-xs text-amber-600 flex items-center gap-1'>
            <Spinner className='animate-spin h-3 w-3' />
            Đang tải ảnh lên...
          </span>
        )}
      </div>

      {uploadError && (
        <div className='bg-red-50 border-b border-red-200 text-red-600 px-4 py-2 text-xs flex items-center justify-between'>
          <span>⚠️ {uploadError}</span>
          <button
            type='button'
            onClick={() => setUploadError('')}
            className='text-red-400 hover:text-red-600 ml-4 font-bold'
          >
            ×
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className='
          [&_.ProseMirror]:min-h-[400px]
          [&_.ProseMirror]:px-8
          [&_.ProseMirror]:py-6
          [&_.ProseMirror]:text-base
          [&_.ProseMirror]:leading-7
          [&_.ProseMirror]:text-gray-800
          [&_.ProseMirror]:outline-none
          [&_.ProseMirror_h1]:text-2xl
          [&_.ProseMirror_h1]:font-bold
          [&_.ProseMirror_h1]:mb-3
          [&_.ProseMirror_h1]:mt-5
          [&_.ProseMirror_h2]:text-xl
          [&_.ProseMirror_h2]:font-bold
          [&_.ProseMirror_h2]:mb-2
          [&_.ProseMirror_h2]:mt-4
          [&_.ProseMirror_h3]:text-lg
          [&_.ProseMirror_h3]:font-semibold
          [&_.ProseMirror_h3]:mb-2
          [&_.ProseMirror_h3]:mt-3
          [&_.ProseMirror_p]:mb-3
          [&_.ProseMirror_ul]:list-disc
          [&_.ProseMirror_ul]:pl-6
          [&_.ProseMirror_ul]:mb-3
          [&_.ProseMirror_ol]:list-decimal
          [&_.ProseMirror_ol]:pl-6
          [&_.ProseMirror_ol]:mb-3
          [&_.ProseMirror_li]:mb-1
          [&_.ProseMirror_blockquote]:border-l-4
          [&_.ProseMirror_blockquote]:border-amber-400
          [&_.ProseMirror_blockquote]:pl-4
          [&_.ProseMirror_blockquote]:italic
          [&_.ProseMirror_blockquote]:text-gray-600
          [&_.ProseMirror_blockquote]:my-3
          [&_.ProseMirror_code]:bg-gray-100
          [&_.ProseMirror_code]:px-1.5
          [&_.ProseMirror_code]:py-0.5
          [&_.ProseMirror_code]:rounded
          [&_.ProseMirror_code]:text-sm
          [&_.ProseMirror_code]:font-mono
          [&_.ProseMirror_pre]:bg-gray-900
          [&_.ProseMirror_pre]:text-gray-100
          [&_.ProseMirror_pre]:p-4
          [&_.ProseMirror_pre]:rounded-lg
          [&_.ProseMirror_pre]:my-3
          [&_.ProseMirror_pre_code]:bg-transparent
          [&_.ProseMirror_pre_code]:p-0
          [&_.ProseMirror_img]:max-w-full
          [&_.ProseMirror_img]:rounded-lg
          [&_.ProseMirror_img]:my-4
          [&_.ProseMirror_img]:mx-auto
          [&_.ProseMirror_img]:block
          [&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
          [&_.ProseMirror_.is-editor-empty:first-child::before]:text-gray-400
          [&_.ProseMirror_.is-editor-empty:first-child::before]:float-left
          [&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none
          [&_.ProseMirror_.is-editor-empty:first-child::before]:h-0
        '
      />
    </div>
  )
}
