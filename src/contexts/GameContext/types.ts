export type PlayerChipColor = 'black' | 'red' | 'yellow' | 'blue'

export type CardSuit = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export type CardModel = {
  suit: CardSuit
  value: number
  label: string
}

export type Player = {
  accumulated: number
  matchesWon: number
  name: string
  chipColor?: PlayerChipColor
}

export type Players = {
  [id: string]: Player
}

export type MatchPlayer = {
  cards: CardModel[]
}

export type MatchTableCards = {
  clubs: [number, number] | null
  diamonds: [number, number] | null
  hearts: [number, number] | null
  spades: [number, number] | null
}

export type MatchTable = {
  accumulated: number
  cards: MatchTableCards
}

export type Match = {
  startingPlayer?: string
  currentPlayer?: string
  winner?: string
  table: MatchTable
  players: {
    [id: string]: MatchPlayer
  }
}
