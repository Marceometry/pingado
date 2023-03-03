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
    gameSettings: { cardsPerSuit },
    match: { table },
  } = useGameContext()

  const cards = getTableCardList(table.cards[suit])
  const cardsOffset =
    cards.length === cardsPerSuit
      ? PACK_CARDS_OFFSET.closed
      : PACK_CARDS_OFFSET.open

  return (
    <CardSequenceContainer>
      {!cards.length ? (
        <CardsPlaceholder>
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
