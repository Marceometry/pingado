import {
  CardModel,
  useGameContext,
  getPlaceableCards,
  organizeCards,
} from '@/contexts'
import { Card, Chip } from '@/components'
import { CardsContainer, DECK_CARD_OFFSET, PlayerDeckContainer } from './styles'

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

  const isOnTop = position === 'top'
  const isOnBottom = position === 'bottom'
  const isOnRight = position === 'right'
  const isOnLeft = position === 'left'
  const isOnSide = isOnLeft || isOnRight

  const deckOrientation = isOnBottom
    ? 'row'
    : isOnLeft
    ? 'column'
    : isOnTop
    ? 'row-reverse'
    : 'column-reverse'

  return (
    <PlayerDeckContainer
      flexDirection={deckOrientation}
      isVertical={isOnSide}
      isHorizontal={isOnTop || isOnBottom}
      top={isOnTop ? 12 : undefined}
      bottom={isOnBottom ? 12 : undefined}
      left={isOnLeft ? 12 : undefined}
      right={isOnRight ? 12 : undefined}
      highlightName={isCurrentPlayer}
    >
      <h2>{players[playerId].name}</h2>

      <CardsContainer isOnSide={isOnSide} isOnTop={isOnTop} noOffset={!!winner}>
        {cardList.map((card) => (
          <Card
            as={isUser && !winner ? 'button' : 'span'}
            key={card.label + card.suit}
            suit={card.suit}
            label={card.label}
            backColor={players[playerId].chipColor}
            onClick={() => placeCard(card, playerId)}
            rotate={!winner && isOnSide}
            marginTop={winner ? 0 : isOnSide ? DECK_CARD_OFFSET : 0}
            marginLeft={winner ? 0 : isOnTop ? DECK_CARD_OFFSET : 0}
            isHidden={!isUser && !winner}
            isHighlighted={
              !winner &&
              !!placeableCards.find(
                (item) => item.value === card.value && item.suit === card.suit
              )
            }
          />
        ))}
      </CardsContainer>

      <Chip
        as={isUser && !winner ? 'button' : 'span'}
        accumulated={accumulated}
        onClick={() => dropAndSkipTurn(playerId)}
        disabled={!!winner || !isUser || !!placeableCards.length}
        color={players[playerId].chipColor}
      />
    </PlayerDeckContainer>
  )
}
