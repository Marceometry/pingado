type WrapperProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button' | 'span'
}

export const Wrapper = ({ as = 'span', ...props }: WrapperProps) => {
  return as === 'span' ? <span {...props} /> : <button {...props} />
}
