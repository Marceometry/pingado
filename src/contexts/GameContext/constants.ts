import { Match, MatchTable, PlayerChipColor, Players } from './types'

export const AUTOPLAY_DELAY_MS = 1000

export const NUMBER_OF_PLAYERS = 4

const TOTAL_CARDS_BY_NUMBER_OF_PLAYERS = {
  3: 36,
  4: 40,
  5: 40,
  6: 48,
}

export const TOTAL_CARDS = TOTAL_CARDS_BY_NUMBER_OF_PLAYERS[NUMBER_OF_PLAYERS]

export const CARDS_PER_SUIT = TOTAL_CARDS / 4

export const CARDS_PER_PLAYER = TOTAL_CARDS / NUMBER_OF_PLAYERS

export const MIDDLE_CARD = Math.ceil(CARDS_PER_PLAYER / 2)

export const CHIP_COLORS: PlayerChipColor[] = ['black', 'red', 'yellow', 'blue']

export const playerList = new Array(NUMBER_OF_PLAYERS)
  .fill('')
  .map((_, index) => (!index ? 'user' : String(index + 1)))

export const defaultPlayerStats = {
  accumulated: 30,
  matchesWon: 0,
}

export const playersObj = playerList.reduce((acc, item, index) => {
  acc[item] = {
    ...defaultPlayerStats,
    name: item === 'user' ? 'Você' : `Jogador ${item}`,
    chipColor: CHIP_COLORS[index],
  }
  return acc
}, {} as Players)

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
