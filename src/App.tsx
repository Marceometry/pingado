import { ThemeProvider } from 'styled-components'
import { MantineProvider } from '@mantine/core'
import { GameContextProvider } from '@/contexts'
import { GlobalStyle, theme } from '@/styles'
import { Router } from '@/router'

export function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <ThemeProvider theme={theme}>
        <GameContextProvider>
          <GlobalStyle />

          <Router />
        </GameContextProvider>
      </ThemeProvider>
    </MantineProvider>
  )
}
