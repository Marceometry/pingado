import { SuitIcon } from '@/assets'
import { CardSuit, getSuitColor, useGameContext } from '@/contexts'
import { CustomColor } from '@/styles'
import { CardBack } from './components'
import { CardContainer } from './styles'

export type CardProps = {
  suit: CardSuit
  label: string
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
  label,
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
      color={getSuitColor(suit)}
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
