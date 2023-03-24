import { CustomColor } from '@/styles'
import { GameSettings, InterfaceSettings, Match, MatchTable } from './types'
import { getCardSizes } from './utils'

export const SERVER_URL = import.meta.env.VITE_PUBLIC_SERVER_URL

export const USER_ID = 'user'

export const WATCH_MODE = false

export const AUTOPLAY_DELAY_MS = 1000

export const CARD_BASE_WIDTH = 3
export const CARD_BASE_HEIGHT = 4
export const DEFAULT_CARD_SIZE_MULTIPLIER = 22

export const CHIP_COLORS: CustomColor[] = [
  'black',
  'red',
  'yellow',
  'blue',
  'green',
  'purple',
]

export const defaultPlayerStats = {
  accumulated: 30,
  matchesWon: 0,
  name: '',
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

export const defaultGameSettings: GameSettings = {
  playersOrder: [USER_ID],
  totalCards: 40,
  cardsPerPlayer: 10,
  cardsPerSuit: 10,
  middleCard: 5,
}

export const defaultInterfaceSettings: InterfaceSettings = {
  tableColor: 'green',
  userChipColor: 'black',
  cardSize: getCardSizes(),
  highlightCards: false,
}
