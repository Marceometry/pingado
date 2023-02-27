import React from 'react'
import ReactDOM from 'react-dom/client'
import { GameContextProvider } from './contexts'
import { App } from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
)
