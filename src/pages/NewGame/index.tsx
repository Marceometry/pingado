import { Link, useLocation } from 'react-router-dom'
import { useGameContext } from '@/contexts'
import { NewGameForm } from './components'
import { HomePageContainer } from './styles'

export const NewGame = () => {
  const { pathname } = useLocation()
  const { match, user, stopGame, gameSettings } = useGameContext()

  const isMatchActive = !!Object.keys(match.players).length

  return (
    <HomePageContainer>
      {isMatchActive ? (
        <>
          <div>
            <Link
              to={`${pathname}/play`}
              style={{ display: 'inline-block', marginBottom: 16 }}
            >
              Entrar na partida
            </Link>
            <p>Número de jogadores: {gameSettings.playersOrder.length}</p>
            <p>Cartas por jogador: {gameSettings.cardsPerPlayer}</p>
            <p>Fichas: {user.accumulated}</p>
          </div>
          <div>
            <button onClick={stopGame}>Encerrar partida</button>
          </div>
        </>
      ) : (
        <NewGameForm />
      )}
    </HomePageContainer>
  )
}
