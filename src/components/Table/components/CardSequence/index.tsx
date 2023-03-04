import { SuitIcon } from '@/assets'
import {
  CardSuit,
  getCardLabel,
  getTableCardList,
  useGameContext,
} from '@/contexts'
import { Card } from '@/components'
import {
  CardSequenceContainer,
  CardsPlaceholder,
  PACK_CARDS_OFFSET,
} from './styles'

type CardSequenceProps = {
  suit: CardSuit
}

export const CardSequence = ({ suit }: CardSequenceProps) => {
  const {
    interfaceSettings: { cardSize },
    gameSettings: { cardsPerSuit },
    match: { table },
  } = useGameContext()

  const cards = getTableCardList(table.cards[suit])
  const cardsOffset =
    cards.length === cardsPerSuit
      ? cardSize.height * PACK_CARDS_OFFSET.closed
      : cardSize.height * PACK_CARDS_OFFSET.open

  return (
    <CardSequenceContainer cardHeight={cardSize.height}>
      {!cards.length ? (
        <CardsPlaceholder
          cardWidth={cardSize.width}
          cardHeight={cardSize.height}
        >
          <SuitIcon suit={suit} size={32} />
        </CardsPlaceholder>
      ) : (
        cards.map((value) => (
          <Card
            key={value}
            suit={suit}
            label={getCardLabel(value)}
            marginTop={cardsOffset}
          />
        ))
      )}
    </CardSequenceContainer>
  )
}
