import { useState, useEffect } from 'react'
import { CustomColor, TableBackgroundColor } from '@/styles'
import {
  defaultTableState,
  defaultMatchState,
  AUTOPLAY_DELAY_MS,
  defaultInterfaceSettings,
  defaultGameSettings,
  defaultPlayerStats,
  USER_ID,
  CARD_BASE_WIDTH,
  CARD_BASE_HEIGHT,
} from '../../constants'
import {
  CardModel,
  CreateGameFormData,
  GameContextData,
  GameSettings,
  InterfaceSettings,
  Match,
  MatchPlayer,
  Players,
  PlayerWithId,
} from '../../types'
import {
  getPlaceableCards,
  dealCards,
  getNextPlayer,
  getCardSizes,
} from '../../utils'
import { generatePlayerList, generatePlayers, getCardsInfo } from './utils'

export const useSinglePlayerContext = (): GameContextData => {
  const [gameSettings, setGameSettings] =
    useState<GameSettings>(defaultGameSettings)
  const [interfaceSettings, setInterfaceSettings] = useState<InterfaceSettings>(
    defaultInterfaceSettings
  )
  const [players, setPlayers] = useState<Players>({ user: defaultPlayerStats })
  const [user, setUser] = useState<PlayerWithId>({
    ...players.user,
    id: USER_ID,
  })
  const [match, setMatch] = useState<Match>(defaultMatchState)

  const createGame = ({ numberOfPlayers, totalCards }: CreateGameFormData) => {
    const playersOrder = generatePlayerList(numberOfPlayers)
    const { cardsPerSuit, cardsPerPlayer, middleCard } = getCardsInfo(
      totalCards,
      numberOfPlayers
    )
    const players = generatePlayers(playersOrder)
    setPlayers(players)
    setGameSettings({
      playersOrder,
      totalCards,
      cardsPerSuit,
      cardsPerPlayer,
      middleCard,
    })
  }

  const startMatch = () => {
    const { playersOrder, cardsPerSuit } = gameSettings
    const playersCards = dealCards(playersOrder.length, cardsPerSuit)
    const matchPlayers = playersOrder.reduce((acc, item, index) => {
      acc[item] = { cards: playersCards[index] }
      return acc
    }, {} as { [id: string]: MatchPlayer })

    setMatch((lastMatch) => {
      const firstPlayer = lastMatch.startingPlayer || playersOrder[0]
      return {
        players: { ...matchPlayers },
        startingPlayer: firstPlayer,
        currentPlayer: firstPlayer,
        table: defaultTableState,
      }
    })
  }

  const stopGame = () => {
    setMatch(defaultMatchState)
  }

  const placeCard = (card: CardModel, playerId: string = user.id) => {
    if (match.winner) return
    if (match.currentPlayer !== playerId) return

    const { playersOrder, middleCard } = gameSettings
    const currentValues = match.table.cards[card.suit]
    let cardsInTable = currentValues

    if (!currentValues && card.value !== middleCard) return

    if (!currentValues && card.value === middleCard) {
      cardsInTable = [middleCard, middleCard]
    }
    if (currentValues && currentValues[0] === card.value + 1) {
      cardsInTable = [card.value, currentValues[1]]
    }
    if (currentValues && currentValues[1] === card.value - 1) {
      cardsInTable = [currentValues[0], card.value]
    }
    if (cardsInTable === currentValues) return

    const cardsRemaining = match.players[playerId].cards.filter((item) => {
      if (item.suit !== card.suit) return true
      return item.value !== card.value
    })

    const hasWon = cardsRemaining.length === 0

    const nextPlayer = getNextPlayer(
      playersOrder,
      hasWon ? match.startingPlayer! : match.currentPlayer!
    )

    const tableAccumulatedPoints = match.table.accumulated

    setMatch((state) => ({
      winner: hasWon ? playerId : undefined,
      startingPlayer: hasWon ? nextPlayer : state.startingPlayer,
      currentPlayer: nextPlayer,
      players: {
        ...state.players,
        [playerId]: {
          ...state.players[playerId],
          cards: cardsRemaining,
        },
      },
      table: {
        ...state.table,
        cards: {
          ...state.table.cards,
          [card.suit]: cardsInTable,
        },
      },
    }))

    if (!hasWon) return

    setPlayers((state) => ({
      ...state,
      [playerId]: {
        ...state[playerId],
        accumulated: state[playerId].accumulated + tableAccumulatedPoints,
        matchesWon: state[playerId].matchesWon + 1,
      },
    }))
  }

  const dropAndSkipTurn = (playerId: string = user.id) => {
    if (match.winner) return
    if (match.currentPlayer !== playerId) return

    const nextPlayer = getNextPlayer(
      gameSettings.playersOrder,
      match.currentPlayer!
    )

    setMatch((state) => ({
      ...state,
      currentPlayer: nextPlayer,
      table: {
        ...state.table,
        accumulated: state.table.accumulated + 1,
      },
    }))
    setPlayers((state) => ({
      ...state,
      [playerId]: {
        ...state[playerId],
        accumulated: state[playerId].accumulated - 1,
      },
    }))
  }

  const autoPlay = (playerId?: string) => {
    if (!playerId || playerId === USER_ID) return

    return setTimeout(() => {
      const cards = match.players[playerId].cards
      const placeableCards = getPlaceableCards(
        cards,
        match.table.cards,
        gameSettings.middleCard
      )

      if (!placeableCards.length) return dropAndSkipTurn(playerId)

      placeCard(placeableCards[0], playerId)
    }, AUTOPLAY_DELAY_MS)
  }

  const updateTableColor = (color: TableBackgroundColor) => {
    setInterfaceSettings((state) => ({ ...state, tableColor: color }))
  }

  const updateUserColor = (color: CustomColor) => {
    setPlayers((state) => ({
      ...state,
      user: {
        ...state.user,
        chipColor: color,
      },
    }))
  }

  const updateCardSize = (size: number) => {
    const cardSize = getCardSizes(size)

    setInterfaceSettings((state) => ({
      ...state,
      cardSize,
    }))
  }

  useEffect(() => {
    if (gameSettings.playersOrder.length <= 1) return
    startMatch()
  }, [gameSettings.playersOrder])

  useEffect(() => {
    setUser((state) => ({ ...state, ...players.user }))
  }, [players.user])

  useEffect(() => {
    if (match.winner) return
    const timeout = autoPlay(match.currentPlayer)

    return () => {
      clearTimeout(timeout)
    }
  }, [match.currentPlayer, match.winner])

  return {
    match,
    user,
    players,
    createGame,
    restartMatch: startMatch,
    stopGame,
    gameSettings,
    interfaceSettings,
    updateTableColor,
    updateUserColor,
    updateCardSize,
    placeCard: (card) => placeCard(card),
    dropAndSkipTurn: () => dropAndSkipTurn(),
  }
}
