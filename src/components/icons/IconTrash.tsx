import { SVGPropsWithClass } from './types'

const IconTrash = ({ className = 'w-4 h-4', ...props }: SVGPropsWithClass) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    {...props}
  >
    <polyline points='3 6 5 6 21 6' />
    <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
    <path d='M10 11v6M14 11v6' />
    <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
  </svg>
)

export default IconTrash
