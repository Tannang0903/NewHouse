import { SVGPropsWithClass } from './types'

const IconEdit = ({ className = 'w-4 h-4', ...props }: SVGPropsWithClass) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    {...props}
  >
    <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
    <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
  </svg>
)

export default IconEdit
