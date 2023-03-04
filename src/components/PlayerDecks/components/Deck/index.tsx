import {
  CardModel,
  useGameContext,
  getPlaceableCards,
  organizeCards,
} from '@/contexts'
import { Card, Chip, Modal } from '@/components'
import { CardsContainer, DeckContainer } from './styles'

export type DeckProps = {
  playerId: string
  accumulated: number
  cardOffset: number
  cards: CardModel[]
  position?: 'bottom' | 'left' | 'top-left' | 'top' | 'top-right' | 'right'
}

export const Deck = ({
  playerId,
  accumulated,
  cardOffset,
  cards,
  position = 'right',
}: DeckProps) => {
  const {
    user,
    players,
    placeCard,
    dropAndSkipTurn,
    interfaceSettings: { cardSize },
    gameSettings: { middleCard },
    match: { currentPlayer, table, winner },
  } = useGameContext()

  const isUser = playerId === user.id
  const isCurrentPlayer = currentPlayer === playerId

  const cardList = isUser ? organizeCards(cards) : cards
  const placeableCards = getPlaceableCards(cards, table.cards, middleCard)

  const shouldDisableButtons = !isUser || !isCurrentPlayer || winner

  const isOnTop = position.includes('top')
  const isOnBottom = position === 'bottom'
  const isOnRight = position === 'right'
  const isOnLeft = position === 'left'
  const isOnSide = isOnLeft || isOnRight
  const deckMargin = 12

  const deckOrientation = isOnBottom
    ? 'row'
    : isOnLeft
    ? 'column'
    : isOnTop
    ? 'row-reverse'
    : 'column-reverse'

  return (
    <DeckContainer
      flexDirection={deckOrientation}
      isVertical={isOnSide}
      isHorizontal={isOnTop || isOnBottom}
      cardHeight={cardSize.height}
      top={isOnTop ? deckMargin : undefined}
      bottom={isOnBottom ? deckMargin : undefined}
      left={isOnLeft ? deckMargin : position === 'top-left' ? 32 : undefined}
      right={isOnRight ? deckMargin : position === 'top-right' ? 32 : undefined}
      highlightName={isCurrentPlayer}
    >
      <h2>{players[playerId].name}</h2>

      <CardsContainer
        isOnSide={isOnSide}
        isOnTop={isOnTop}
        cardOffset={cardOffset}
        noOffset={!!winner}
      >
        {cardList.map((card) => {
          const isPlaceable = !!placeableCards.find(
            (item) => item.value === card.value && item.suit === card.suit
          )
          return (
            <Card
              as={shouldDisableButtons || !isPlaceable ? 'span' : 'button'}
              key={card.label + card.suit}
              suit={card.suit}
              label={card.label}
              backColor={players[playerId].chipColor}
              marginLeft={winner ? 0 : isOnTop ? cardOffset : 0}
              marginTop={winner ? 0 : isOnSide ? cardOffset : 0}
              rotate={!winner && isOnSide}
              isHidden={!winner && !isUser}
              isHighlighted={!winner && isPlaceable}
              onClick={() => {
                if (shouldDisableButtons) return
                placeCard(card)
              }}
            />
          )
        })}
      </CardsContainer>

      <Chip
        as={shouldDisableButtons ? 'span' : 'button'}
        accumulated={accumulated}
        onClick={() => dropAndSkipTurn()}
        disabled={!!placeableCards.length}
        color={players[playerId].chipColor}
      />

      {isUser && <Modal />}
    </DeckContainer>
  )
}
