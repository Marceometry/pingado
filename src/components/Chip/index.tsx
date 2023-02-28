import { ChipIcon } from '../../assets'
import { PlayerChipColor } from '../../contexts'
import { Wrapper } from '../../components'
import './styles.css'

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  accumulated: number
  size?: number
  as?: 'button' | 'span'
  color?: 'white' | PlayerChipColor
}

const colors = {
  white: '#cccccc',
  black: '#181818',
  red: '#af2121',
  yellow: '#bebe17',
  blue: '#2020af',
}

export const Chip = ({
  as,
  accumulated,
  size = 96,
  color = 'white',
  ...props
}: ChipProps) => {
  return (
    <Wrapper
      as={as}
      className={`chip ${as === 'button' ? 'chip-button' : ''}`}
      data-accumulated={accumulated}
      {...props}
    >
      <div style={{ width: size, height: size }}>
        <ChipIcon color={colors[color]} size={size} />
      </div>
    </Wrapper>
  )
}
