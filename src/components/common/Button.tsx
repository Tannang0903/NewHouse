import { SpinnerButton } from '@/components/icons'
import { ButtonProps } from '@/interface'

const Button = ({ type, classNameButton, children, isLoading, onClick, disabled }: ButtonProps) => {
  return (
    <button type={type} className={classNameButton} onClick={onClick} disabled={disabled}>
      {isLoading && <SpinnerButton />}
      {children}
    </button>
  )
}

export default Button
