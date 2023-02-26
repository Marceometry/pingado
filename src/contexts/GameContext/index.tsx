import { createContext, useContext, useState, ReactNode } from 'react'

export type GameContextData = {
  game: any
}

export type GameContextProviderProps = {
  children: ReactNode
}

export const GameContext = createContext({} as GameContextData)

export function GameContextProvider({ children }: GameContextProviderProps) {
  const game = {}

  return (
    <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
  )
}

export const useGameContext = () => useContext(GameContext)
