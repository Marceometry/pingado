import { ChipIcon } from '@/assets'
import { CustomColor, theme } from '@/styles'
import { ChipContainer } from './styles'

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  accumulated: number
  size?: number
  as?: 'button' | 'span'
  color?: 'white' | CustomColor
}

export const Chip = ({
  as,
  accumulated,
  size = 96,
  color = 'white',
  ...props
}: ChipProps) => {
  const chipColor = color === 'white' ? theme.gray : theme.customColors[color]

  return (
    <ChipContainer as={as} accumulated={accumulated} {...props}>
      <div style={{ width: size, height: size }}>
        <ChipIcon color={chipColor} size={size} />
      </div>
    </ChipContainer>
  )
}
