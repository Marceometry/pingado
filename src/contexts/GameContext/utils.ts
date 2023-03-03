import { shuffle } from '@/utils'
import { CardModel, CardSuit, MatchTableCards } from './types'

const cardSuits: CardSuit[] = ['clubs', 'diamonds', 'hearts', 'spades']

export const getSuitColor = (suit: CardSuit) => {
  return suit === 'clubs' || suit === 'spades' ? 'black' : 'red'
}

export const getCardLabel = (value: number = 0) => {
  switch (value) {
    case 1:
      return 'A'
    case 11:
      return 'J'
    case 12:
      return 'Q'
    case 13:
      return 'K'
    default:
      return String(value)
  }
}

const generateCards = (cardsPerSuit: number): CardModel[] => {
  return cardSuits.reduce((acc, item) => {
    for (let i = 1; i <= cardsPerSuit; i++) {
      acc.push({
        suit: item,
        value: i,
        label: getCardLabel(i),
      })
    }
    return acc
  }, [] as CardModel[])
}

export const dealCards = (numberOfPlayers = 4, cardsPerSuit = 10) => {
  const cards = generateCards(cardsPerSuit)
  const shuffledCards = shuffle(cards)
  const cardsPerPlayer = cards.length / numberOfPlayers

  let response = []
  for (let i = 0; i < numberOfPlayers; i++) {
    response.push(
      shuffledCards.slice(cardsPerPlayer * i, cardsPerPlayer * (i + 1))
    )
  }

  return response
}

export const getNextPlayer = (
  playersOrder: string[],
  currentPlayer: string
) => {
  const currentPlayerIndex = playersOrder.indexOf(currentPlayer)
  const nextPlayerIndex =
    currentPlayerIndex + 1 === playersOrder.length ? 0 : currentPlayerIndex + 1
  return playersOrder[nextPlayerIndex]
}

export const getPlaceableCards = (
  playerCards: CardModel[],
  tableCards: MatchTableCards,
  middleCard: number
) => {
  if (!playerCards || !tableCards) return []

  return playerCards.filter((card) => {
    if (!tableCards[card.suit]) {
      if (card.value === middleCard) return true
      return false
    }
    if (card.value + 1 === tableCards[card.suit]![0]) return true
    if (card.value - 1 === tableCards[card.suit]![1]) return true
  })
}

export const getTableCardList = (suit: [number, number] | null) => {
  if (!suit?.[0] || !suit?.[1]) return []

  const arrayLength = suit[1] - suit[0] + 1
  const cards = new Array(arrayLength)
    .fill('')
    .map((_, index) => index + suit[0])

  return cards
}

export const organizeCards = (cards: CardModel[]) => {
  const clubs = cards
    .filter((item) => item.suit === 'clubs')
    .sort((a, b) => a.value - b.value)
  const diamonds = cards
    .filter((item) => item.suit === 'diamonds')
    .sort((a, b) => a.value - b.value)
  const hearts = cards
    .filter((item) => item.suit === 'hearts')
    .sort((a, b) => a.value - b.value)
  const spades = cards
    .filter((item) => item.suit === 'spades')
    .sort((a, b) => a.value - b.value)

  return [...clubs, ...diamonds, ...spades, ...hearts]
}
