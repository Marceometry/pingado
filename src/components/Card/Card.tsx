import { SuitIcon } from '@/assets'
import {
  CardSuit,
  getCardLabel,
  getSuitColor,
  useGameContext,
} from '@/contexts'
import { CustomColor } from '@/styles'
import { CardBack } from './components'
import { CardContainer } from './styles'

export type CardProps = {
  suit: CardSuit
  value: number
  backColor?: CustomColor
  isHighlighted?: boolean
  isHidden?: boolean
  rotate?: boolean
  marginTop?: number
  marginLeft?: number
  zIndex?: number
  as?: 'button' | 'span'
  onClick?: () => void
}

export const Card = ({
  as,
  suit,
  value,
  backColor,
  isHighlighted,
  isHidden,
  rotate,
  marginTop = 0,
  marginLeft = 0,
  zIndex,
  onClick,
}: CardProps) => {
  const {
    interfaceSettings: { cardSize },
  } = useGameContext()

  const label = getCardLabel(value)

  return (
    <CardContainer
      as={as}
      cardSize={cardSize}
      onClick={onClick}
      marginTop={marginTop}
      marginLeft={marginLeft}
      horizontal={rotate}
      zIndex={zIndex}
      highlighted={isHighlighted && !isHidden}
      color={suit ? getSuitColor(suit) : 'black'}
    >
      {!isHidden ? (
        <>
          <span>{label}</span>
          <SuitIcon suit={suit} size={cardSize.iconSize} />
          <span>{label}</span>
        </>
      ) : (
        <CardBack color={backColor} />
      )}
    </CardContainer>
  )
}
