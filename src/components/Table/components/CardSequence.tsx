import { SuitIcon } from '../../../assets'
import {
  CardSuit,
  getCardLabel,
  getTableCardList,
  useGameContext,
} from '../../../contexts'
import { Card, CARD_HEIGHT, CARD_WIDTH } from '../../../components'

type CardSequenceProps = {
  suit: CardSuit
}

export const CardSequence = ({ suit }: CardSequenceProps) => {
  const {
    match: { table },
  } = useGameContext()

  const cards = getTableCardList(table.cards[suit])

  const cardOffset = CARD_HEIGHT * 0.65
  const placeholderIconSize = 32

  return (
    <div style={{ marginTop: cardOffset }}>
      {!cards.length ? (
        <span
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            marginTop: -cardOffset,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <SuitIcon suit={suit} size={placeholderIconSize} />
        </span>
      ) : (
        cards.map((value) => (
          <Card
            key={value}
            suit={suit}
            label={getCardLabel(value)}
            marginTop={cardOffset}
          />
        ))
      )}
    </div>
  )
}
