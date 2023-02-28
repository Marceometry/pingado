import { SuitIcon } from '../../assets'
import { CardSuit, getSuitColor } from '../../contexts'
import { Wrapper } from '../../components'
import { CardBack } from './CardBack'

const BASE_WIDTH = 3
const BASE_HEIGHT = 4
const CARD_SIZE = 22
export const CARD_WIDTH = BASE_WIDTH * CARD_SIZE
export const CARD_HEIGHT = BASE_HEIGHT * CARD_SIZE

export type CardProps = {
  suit: CardSuit
  label: string
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
  isHighlighted,
  isHidden,
  rotate,
  marginTop = 0,
  marginLeft = 0,
  zIndex,
  onClick,
}: CardProps) => {
  return (
    <Wrapper
      as={as}
      onClick={onClick}
      style={{
        width: rotate ? CARD_HEIGHT : CARD_WIDTH,
        height: rotate ? CARD_WIDTH : CARD_HEIGHT,
        marginTop: -marginTop,
        marginLeft: -marginLeft,
        zIndex,
        position: 'relative',
        padding: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '4px',
        border: '2px solid black',
        boxShadow: '0 0 5px #444',
        backgroundColor: isHighlighted && !isHidden ? 'lightblue' : '#f0f0f0',
        color: getSuitColor(suit) === 'red' ? '#ec1010' : '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {!isHidden ? (
        <>
          <span style={{ width: '100%', textAlign: 'left' }}>{label}</span>
          <SuitIcon suit={suit} />
          <span style={{ width: '100%', textAlign: 'right' }}>{label}</span>
        </>
      ) : (
        <CardBack />
      )}
    </Wrapper>
  )
}
