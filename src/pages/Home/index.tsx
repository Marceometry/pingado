import { useGameContext } from '@/contexts'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { NewGamePageContainer } from './styles'

export const Home = () => {
  const navigate = useNavigate()
  const { setGameMode } = useGameContext()

  const solo = () => {
    setGameMode('solo')
    navigate('/solo')
  }

  const multiplayer = () => {
    setGameMode('multiplayer')
    navigate('/multiplayer')
  }

  return (
    <NewGamePageContainer>
      <Button onClick={solo}>Solo</Button>
      <Button onClick={multiplayer}>Multiplayer</Button>
    </NewGamePageContainer>
  )
}
