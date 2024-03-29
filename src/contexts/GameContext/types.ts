import { CustomColor, TableBackgroundColor } from '@/styles'

export type CardSuit = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export type CardModel = {
  suit: CardSuit
  value: number
  label: string
  id?: string
}

export type Player = {
  accumulated: number
  matchesWon: number
  name: string
  chipColor?: CustomColor
}

export type PlayerWithId = Player & { id: string }

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

export type CreateGameFormData = {
  numberOfPlayers: number
  totalCards: number
}

export type GameSettings = {
  playersOrder: string[]
  totalCards: number
  cardsPerSuit: number
  cardsPerPlayer: number
  middleCard: number
}

export type GameMode = 'solo' | 'multiplayer'

export type CardSizes = {
  multiplier: number
  width: number
  height: number
  iconSize: number
  fontSize: number
}

export type InterfaceSettings = {
  userChipColor: CustomColor
  tableColor: TableBackgroundColor
  cardSize: CardSizes
  highlightCards: boolean
}

export type GameContextData = {
  match: Match
  user: PlayerWithId
  players: Players
  gameSettings: GameSettings
  interfaceSettings: InterfaceSettings
  setGameMode: (mode: GameMode) => void
  createGame: (data: CreateGameFormData) => void
  restartMatch: () => void
  stopGame: () => void
  placeCard: (card: CardModel) => void
  dropAndSkipTurn: () => void
  updateUserName: (name: string) => void
  updateUserColor: (value: CustomColor) => void
  updateTableColor: (value: TableBackgroundColor) => void
  updateCardsHighlight: (highlight: boolean) => void
  updateCardSize: (size: number) => void
}

export type GameContextHookData = Omit<GameContextData, 'setGameMode'>
