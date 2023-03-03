import { useGameContext } from '@/contexts'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HomePageContainer } from './styles'

export const Home = () => {
  const navigate = useNavigate()
  const { match, user, createGame, stopGame, gameSettings } = useGameContext()
  const [totalCards, setTotalCards] = useState('40')
  const [numberOfPlayers, setNumberOfPlayers] = useState('4')

  const isMatchActive = !!Object.keys(match.players).length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const players = Number(numberOfPlayers)
    const cards = Number(totalCards)

    if (!Number.isInteger(cards / players)) {
      return alert(
        'A quantidade de cartas deve ser dividível igualmente pelo número de jogadores'
      )
    }

    createGame({
      numberOfPlayers: players,
      totalCards: cards,
    })

    navigate('/single-player')
  }

  return (
    <HomePageContainer>
      {isMatchActive ? (
        <>
          <div>
            <Link
              to='/single-player'
              style={{ display: 'inline-block', marginBottom: 16 }}
            >
              Continuar jogo
            </Link>
            <p>Número de jogadores: {gameSettings.playersOrder.length}</p>
            <p>Cartas por jogador: {gameSettings.cardsPerPlayer}</p>
            <p>Fichas: {user.accumulated}</p>
          </div>
          <div>
            <button onClick={stopGame}>Começar um jogo novo</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor='numberOfPlayers'>Quantidade de jogadores:</label>
            <div>
              <input
                type='radio'
                name='numberOfPlayers'
                id='2'
                value='2'
                checked={numberOfPlayers === '2'}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
              />
              <label htmlFor='2'>2</label>

              <input
                type='radio'
                name='numberOfPlayers'
                id='3'
                value='3'
                checked={numberOfPlayers === '3'}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
              />
              <label htmlFor='3'>3</label>

              <input
                type='radio'
                name='numberOfPlayers'
                id='4'
                value='4'
                checked={numberOfPlayers === '4'}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
              />
              <label htmlFor='4'>4</label>

              <input
                type='radio'
                name='numberOfPlayers'
                id='6'
                value='6'
                checked={numberOfPlayers === '6'}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
              />
              <label htmlFor='6'>6</label>
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor='totalCards'>Cartas no baralho:</label>
            <div>
              <input
                type='range'
                name='totalCards'
                id='totalCards'
                step='4'
                min='20'
                max='52'
                onChange={(e) => setTotalCards(e.target.value)}
                value={totalCards}
              />
              <span>{totalCards}</span>
            </div>
          </fieldset>
          <button type='submit'>Criar sala de jogo</button>
        </form>
      )}
    </HomePageContainer>
  )
}
