import { SuitIcon } from '@/assets'
import { CardSuit, getSuitColor } from '@/contexts'
import { CustomColor } from '@/styles'
import { CardBack } from './components'
import { CardContainer, SUIT_ICON_SIZE } from './styles'

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
  return (
    <CardContainer
      as={as}
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
          <SuitIcon suit={suit} size={SUIT_ICON_SIZE} />
          <span>{label}</span>
        </>
      ) : (
        <CardBack color={backColor} />
      )}
    </CardContainer>
  )
}
