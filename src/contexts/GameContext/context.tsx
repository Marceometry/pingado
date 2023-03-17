import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuid } from 'uuid'
import { GameContextData, GameMode } from './types'
import { useMultiPlayer, useSinglePlayer } from './hooks'
import { io, Socket } from 'socket.io-client'

export type GameContextProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextData)

export function GameContextProvider({ children }: GameContextProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameMode, setGameMode] = useState<GameMode>(
    window.location.pathname.includes('/multiplayer') ? 'multiplayer' : 'solo'
  )
  const multiplayer = useMultiPlayer(socket)
  const solo = useSinglePlayer()

  const context = socket ? multiplayer : solo

  const socketAuth = (cb: (data: object) => void) => {
    const storagedId = localStorage.getItem('@pingado/user-id')
    const id = storagedId || uuid()
    cb({ id })
    if (!storagedId) localStorage.setItem('@pingado/user-id', id)
  }

  useEffect(() => {
    console.log(socket)
  }, [socket])

  useEffect(() => {
    if (gameMode === 'multiplayer' && !socket) {
      const newSocket = io('https://pingado-server-production.up.railway.app', {
        auth: socketAuth,
      })
      setSocket(newSocket)
    } else if (socket) {
      socket.disconnect()
      setSocket(null)
    }
  }, [gameMode])

  return (
    <GameContext.Provider value={{ ...context, setGameMode }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
