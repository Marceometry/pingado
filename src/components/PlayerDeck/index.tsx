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
    user,
    players,
    placeCard,
    dropAndSkipTurn,
    gameSettings: { middleCard },
    match: { currentPlayer, table, winner },
  } = useGameContext()

  const isUser = playerId === user.id
  const isCurrentPlayer = currentPlayer === playerId

  const cardList = isUser ? organizeCards(cards) : cards
  const placeableCards = getPlaceableCards(cards, table.cards, middleCard)

  const shouldDisableButtons = !isUser || !isCurrentPlayer || winner

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
            as={shouldDisableButtons ? 'span' : 'button'}
            key={card.label + card.suit}
            suit={card.suit}
            label={card.label}
            backColor={players[playerId].chipColor}
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
            onClick={() => {
              if (shouldDisableButtons) return
              placeCard(card)
            }}
          />
        ))}
      </CardsContainer>

      <Chip
        as={shouldDisableButtons ? 'span' : 'button'}
        accumulated={accumulated}
        onClick={() => dropAndSkipTurn()}
        disabled={!!placeableCards.length}
        color={players[playerId].chipColor}
      />
    </PlayerDeckContainer>
  )
}
