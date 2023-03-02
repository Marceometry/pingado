import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from './styles'
import { Home } from './pages'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Home />
    </ThemeProvider>
  )
}
