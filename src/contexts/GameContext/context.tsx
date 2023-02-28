import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import {
  MIDDLE_CARD,
  defaultTableState,
  defaultMatchState,
  playerList,
  playersObj,
  AUTOPLAY_DELAY_MS,
} from './constants'
import { CardModel, Match, MatchPlayer, Players } from './types'
import { getPlaceableCards, dealCards, getNextPlayer } from './utils'

export type GameContextData = {
  match: Match
  players: Players
  playersOrder: string[]
  restartMatch: () => void
  placeCard: (card: CardModel, playerId: string) => void
  dropAndSkipTurn: (playerId: string) => void
}

export type GameContextProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextData)

export function GameContextProvider({ children }: GameContextProviderProps) {
  const playersOrder = playerList // const [playersOrder, setPlayersOrder] = useState<string[]>(playerList)
  const [players, setPlayers] = useState<Players>(playersObj)
  const [matchHistory, setMatchHistory] = useState<Match[]>([])
  const [match, setMatch] = useState<Match>(defaultMatchState)

  const startMatch = (isFirstMatch?: boolean) => {
    const playersCards = dealCards(playersOrder.length)
    const matchPlayers = playersOrder.reduce((acc, item, index) => {
      acc[item] = { cards: playersCards[index] }
      return acc
    }, {} as { [id: string]: MatchPlayer })

    setMatch((lastMatch) => {
      if (!isFirstMatch) setMatchHistory((history) => [...history, lastMatch])
      const firstPlayer = lastMatch.startingPlayer || playersOrder[0]
      return {
        players: { ...matchPlayers },
        startingPlayer: firstPlayer,
        currentPlayer: firstPlayer,
        table: defaultTableState,
      }
    })
  }

  const placeCard = (card: CardModel, playerId: string) => {
    if (match.winner) return
    if (match.currentPlayer !== playerId) return

    const currentValues = match.table.cards[card.suit]
    let cardsInTable = currentValues

    if (!currentValues && card.value !== MIDDLE_CARD) return

    if (!currentValues && card.value === MIDDLE_CARD) {
      cardsInTable = [MIDDLE_CARD, MIDDLE_CARD]
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

  const dropAndSkipTurn = (playerId: string) => {
    if (match.winner) return
    if (match.currentPlayer !== playerId) return

    const nextPlayer = getNextPlayer(playersOrder, match.currentPlayer!)

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
    if (!playerId || playerId === 'user') return

    return setTimeout(() => {
      const cards = match.players[playerId].cards
      const placeableCards = getPlaceableCards(cards, match.table.cards)

      if (!placeableCards.length) return dropAndSkipTurn(playerId)

      placeCard(placeableCards[0], playerId)
    }, AUTOPLAY_DELAY_MS)
  }

  useEffect(() => {
    startMatch(true)
  }, [])

  useEffect(() => {
    if (match.winner) return
    const timeout = autoPlay(match.currentPlayer)

    return () => {
      clearTimeout(timeout)
    }
  }, [match.currentPlayer, match.winner])

  return (
    <GameContext.Provider
      value={{
        match,
        players,
        playersOrder,
        restartMatch: startMatch,
        placeCard,
        dropAndSkipTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
