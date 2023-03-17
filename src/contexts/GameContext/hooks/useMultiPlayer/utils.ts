import { shuffle } from '@/utils'
import {
  CHIP_COLORS,
  defaultPlayerStats,
  USER_ID,
  WATCH_MODE,
} from '../../constants'
import { Players } from '../../types'

export const generatePlayerList = (numberOfPlayers: number) => {
  return new Array(numberOfPlayers)
    .fill('')
    .map((_, index) =>
      !index ? (WATCH_MODE ? '1' : USER_ID) : String(index + 1)
    )
}

export const generatePlayers = (playerList: string[]) => {
  const chipColors = shuffle(CHIP_COLORS)
  return playerList.reduce((acc, item, index) => {
    acc[item] = {
      ...defaultPlayerStats,
      name: item === USER_ID ? 'Você' : `Jogador ${item}`,
      chipColor: chipColors[index],
    }
    return acc
  }, {} as Players)
}

export const getCardsInfo = (totalCards: number, numberOfPlayers: number) => {
  const cardsPerSuit = totalCards / 4
  const cardsPerPlayer = totalCards / numberOfPlayers
  const middleCard = Math.ceil(cardsPerSuit / 2)

  return { cardsPerSuit, cardsPerPlayer, middleCard }
}
