import DOMPurify from 'isomorphic-dompurify'

interface Props {
  html: string
}

const ALLOWED_TAGS = [
  'p',
  'br',
  'strong',
  'em',
  's',
  'u',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'blockquote',
  'pre',
  'code',
  'a',
  'img',
  'hr',
]

const ALLOWED_ATTR = ['href', 'src', 'alt', 'target', 'rel', 'width', 'height', 'class']

export default function BlogContent({ html }: Props) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORCE_BODY: true,
  })

  return (
    <div
      className='prose prose-lg max-w-none prose-img:rounded-xl prose-img:mx-auto prose-headings:font-bold'
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
