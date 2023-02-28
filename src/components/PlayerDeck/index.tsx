import {
  CardModel,
  useGameContext,
  getPlaceableCards,
  organizeCards,
} from '../../contexts'
import { Card, CARD_WIDTH } from '../../components'

export type PlayerDeckProps = {
  playerId: string
  accumulated: number
  cards: CardModel[]
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const PlayerDeck = ({
  playerId,
  accumulated,
  cards,
  position = 'right',
}: PlayerDeckProps) => {
  const {
    players,
    placeCard,
    dropAndSkipTurn,
    match: { currentPlayer, table, winner },
  } = useGameContext()

  const isUser = playerId === 'user'
  const isCurrentPlayer = currentPlayer === playerId

  const cardList = isUser ? organizeCards(cards) : cards
  const placeableCards = getPlaceableCards(cards, table.cards)

  const cardOffset = CARD_WIDTH * 0.6

  const isInTop = position === 'top'
  const isInBottom = position === 'bottom'
  const isInRight = position === 'right'
  const isInLeft = position === 'left'

  const deckOrientation = isInBottom
    ? 'row'
    : isInLeft
    ? 'column'
    : isInTop
    ? 'row-reverse'
    : 'column-reverse'

  return (
    <div
      style={{
        gap: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: deckOrientation,
        top: isInTop ? 12 : undefined,
        bottom: isInBottom ? 12 : undefined,
        left: isInLeft ? 12 : undefined,
        right: isInRight ? 12 : undefined,
        position: 'absolute',
      }}
    >
      <h2 style={{ color: isCurrentPlayer ? 'black' : 'white' }}>
        {players[playerId].name}
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: isInLeft || isInRight ? 'column' : 'row',
          marginTop: winner ? 0 : isInLeft || isInRight ? cardOffset : 0,
          marginLeft: winner ? 0 : isInTop ? cardOffset : 0,
        }}
      >
        {cardList.map((card) => (
          <Card
            as={isUser && !winner ? 'button' : 'span'}
            key={card.label + card.suit}
            suit={card.suit}
            label={card.label}
            onClick={() => placeCard(card, playerId)}
            rotate={!winner && (isInLeft || isInRight)}
            marginTop={winner ? 0 : isInLeft || isInRight ? cardOffset : 0}
            marginLeft={winner ? 0 : isInTop ? cardOffset : 0}
            isHidden={!isUser && !winner}
            isHighlighted={
              !winner &&
              !!placeableCards.find(
                (item) => item.value === card.value && item.suit === card.suit
              )
            }
          />
        ))}
      </div>

      <button
        disabled={!!winner || !isUser || !!placeableCards.length}
        onClick={() => dropAndSkipTurn(playerId)}
        style={{ padding: '12px', fontSize: 18, borderRadius: 999 }}
      >
        {accumulated}
      </button>
    </div>
  )
}
