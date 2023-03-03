import { ReactNode, createContext, useContext } from 'react'
import { GameContextData } from './types'
import { useSinglePlayerContext } from './hooks'

export type GameContextProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextData)

export function GameContextProvider({ children }: GameContextProviderProps) {
  const context = useSinglePlayerContext()

  return (
    <GameContext.Provider value={{ ...context }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
