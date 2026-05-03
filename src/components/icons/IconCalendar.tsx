import { SVGPropsWithClass } from './types'

const IconCalendar = ({ className = 'w-16 h-16', ...props }: SVGPropsWithClass) => (
  <svg xmlns='http://www.w3.org/2000/svg' className={className} aria-hidden='true' viewBox='0 0 64 64' {...props}>
    <path d='M53 5h-8v4H19V5h-8v4H0v50h64V9H53V5zm-6 2h4v6h-4V7zM13 7h4v6h-4V7zM2 57V19h60v38H2zm60-46v6H2v-6h9v4h8v-4h26v4h8v-4h9z' />
  </svg>
)

export default IconCalendar
