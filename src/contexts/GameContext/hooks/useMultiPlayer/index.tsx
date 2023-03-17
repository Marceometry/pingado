import { useState, useEffect } from 'react'
import { Socket } from 'socket.io-client'
import { CustomColor, TableBackgroundColor } from '@/styles'
import {
  defaultMatchState,
  defaultInterfaceSettings,
  defaultGameSettings,
  defaultPlayerStats,
} from '../../constants'
import {
  CardModel,
  CreateGameFormData,
  GameContextHookData,
  GameSettings,
  InterfaceSettings,
  Match,
  Players,
  PlayerWithId,
} from '../../types'
import { getCardSizes, getCardLabel } from '../../utils'
import { SOCKET_EVENTS } from './socket'

export const useMultiPlayer = (socket: Socket | null): GameContextHookData => {
  const id = localStorage.getItem('@pingado/user-id') || ''
  const [gameSettings, setGameSettings] =
    useState<GameSettings>(defaultGameSettings)
  const [interfaceSettings, setInterfaceSettings] = useState<InterfaceSettings>(
    defaultInterfaceSettings
  )
  const [match, setMatch] = useState<Match>(defaultMatchState)
  const [players, setPlayers] = useState<Players>({ user: defaultPlayerStats })
  const [user, setUser] = useState<PlayerWithId>({
    ...players.user,
    id,
  })

  const createGame = (data: CreateGameFormData) => {
    socket?.emit(SOCKET_EVENTS.createGame, data)
  }

  const startMatch = () => {
    socket?.emit(SOCKET_EVENTS.startMatch)
  }

  const stopGame = () => {
    socket?.emit(SOCKET_EVENTS.stopGame)
  }

  const placeCard = (card: CardModel, playerId: string = user.id) => {
    if (match.winner) return
    if (match.currentPlayer !== playerId) return

    socket?.emit(SOCKET_EVENTS.placeCard, card)
  }

  const dropAndSkipTurn = (playerId: string = user.id) => {
    if (match.winner) return
    if (match.currentPlayer !== playerId) return

    socket?.emit(SOCKET_EVENTS.dropAndSkip)
  }

  const updateUserName = (name: string) => {
    socket?.emit(SOCKET_EVENTS.userName, name)
  }

  const updateUserColor = (color: CustomColor) => {
    socket?.emit(SOCKET_EVENTS.userColor, color)
  }

  const updateTableColor = (color: TableBackgroundColor) => {
    setInterfaceSettings((state) => ({ ...state, tableColor: color }))
  }

  const updateCardSize = (size: number) => {
    const cardSize = getCardSizes(size)

    setInterfaceSettings((state) => ({
      ...state,
      cardSize,
    }))
  }

  useEffect(() => {
    console.log('players:', players)
  }, [players])

  useEffect(() => {
    console.log('match:', match)
  }, [match])

  useEffect(() => {
    console.log('gameSettings:', gameSettings)
  }, [gameSettings])

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => console.log('connected'))

    socket.on('disconnect', () => console.log('disconnected'))

    socket.on(
      SOCKET_EVENTS.playersUpdate,
      (data: { players: Players; playersOrder: string[] }) => {
        console.log('playersUpdate:', data)
        setPlayers(data.players)
        setGameSettings((state) => ({
          ...state,
          playersOrder: data.playersOrder,
        }))
      }
    )

    socket.on(
      `game-state-on-join-${id}`,
      (data: {
        gameSettings: GameSettings
        players: Players
        match: Match
      }) => {
        console.log('game-state-on-join:', data)
        setMatch(data.match)
        setPlayers(data.players)
        setGameSettings(data.gameSettings)
      }
    )

    socket.on(
      SOCKET_EVENTS.createGame,
      (data: { gameSettings: GameSettings; players: Players }) => {
        console.log('createGame:', data)
        setPlayers(data.players)
        setGameSettings(data.gameSettings)
      }
    )

    socket.on(SOCKET_EVENTS.startMatch, (data: Match) => {
      console.log('startMatch:', data)
      setMatch(data)
    })

    socket.on(SOCKET_EVENTS.matchUpdate, (data: Match) => {
      console.log('matchUpdate:', data)
      setMatch((state) => {
        const players = !Object.keys(data.players).length
          ? {}
          : { [id]: { cards: state.players[id]?.cards || [] } }
        return { ...data, players: { ...data.players, ...players } }
      })
    })

    socket.on(`cards-${id}`, (data: CardModel[]) => {
      console.log('cards:', data)
      const cards = data.map((card) => ({
        ...card,
        label: getCardLabel(card.value),
      }))
      setMatch((state) => ({
        ...state,
        players: {
          ...state.players,
          [id]: { cards },
        },
      }))
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off(SOCKET_EVENTS.playersUpdate)
      socket.off(SOCKET_EVENTS.createGame)
      socket.off(SOCKET_EVENTS.startMatch)
      socket.off(SOCKET_EVENTS.matchUpdate)
      socket.off(`game-state-on-join-${id}`)
      socket.off(`cards-${id}`)
    }
  }, [socket])

  useEffect(() => {
    const id = localStorage.getItem('@pingado/user-id') || ''
    const player = players[id]
    if (!player) return
    setUser({ ...player, id })
  }, [players])

  return {
    match,
    user,
    players,
    createGame,
    restartMatch: startMatch,
    stopGame,
    gameSettings,
    interfaceSettings,
    updateUserName,
    updateUserColor,
    updateTableColor,
    updateCardSize,
    placeCard: (card) => placeCard(card),
    dropAndSkipTurn: () => dropAndSkipTurn(),
  }
}
