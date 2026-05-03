import { SVGPropsWithClass } from './types'

const IconHamburger = ({ className = 'w-6 h-6', ...props }: SVGPropsWithClass) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    {...props}
  >
    <path d='M4 6l16 0' />
    <path d='M4 12l16 0' />
    <path d='M4 18l16 0' />
  </svg>
)

export default IconHamburger
