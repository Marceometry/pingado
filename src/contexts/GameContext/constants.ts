import { Card, CardSuit, Match, MatchTable } from './types'

const makeCard = (suit: CardSuit, value: number): Card => ({
  label: value === 1 ? 'A' : String(value),
  value,
  suit,
})

const cardSuits: CardSuit[] = ['clubs', 'diamonds', 'hearts', 'spades']

export const CARDS_PER_PLAYER = 10

export const MIDDLE_CARD = Math.ceil(CARDS_PER_PLAYER / 2)

export function generateCards(cardsPerPlayer = CARDS_PER_PLAYER): Card[] {
  return cardSuits.reduce((acc, item) => {
    for (let i = 1; i <= cardsPerPlayer; i++) {
      acc.push(makeCard(item, i))
    }
    return acc
  }, [] as Card[])
}

export const playerList = ['user', '2', '3', '4']

export const defaultPlayerStats = {
  accumulated: 30,
  matchesWon: 0,
}

export const playersObj = {
  [playerList[0]]: defaultPlayerStats,
  [playerList[1]]: defaultPlayerStats,
  [playerList[2]]: defaultPlayerStats,
  [playerList[3]]: defaultPlayerStats,
}

export const defaultTableState: MatchTable = {
  accumulated: 0,
  cards: {
    clubs: null,
    diamonds: null,
    hearts: null,
    spades: null,
  },
}

export const defaultMatchState: Match = {
  players: {},
  table: defaultTableState,
}
