import { SVGPropsWithClass } from './types'

const IconMenu = ({ className = 'w-6 h-6', ...props }: SVGPropsWithClass) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={1.5}
    {...props}
  >
    <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
  </svg>
)

export default IconMenu
