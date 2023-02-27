import { shuffle } from '../../utils'
import { MIDDLE_CARD, generateCards } from './constants'
import { Card, MatchTableCards } from './types'

export const dealCards = (numberOfPlayers = 4) => {
  const cards = generateCards()
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
  playerCards: Card[],
  tableCards: MatchTableCards
) => {
  if (!playerCards || !tableCards) return []

  return playerCards.filter((card) => {
    if (!tableCards[card.suit]) {
      if (card.value === MIDDLE_CARD) return true
      return false
    }
    if (card.value + 1 === tableCards[card.suit]![0]) return true
    if (card.value - 1 === tableCards[card.suit]![1]) return true
  })
}
