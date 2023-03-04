import { useGameContext } from '@/contexts'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HomePageContainer } from './styles'

const TOTAL_CARDS_BY_PLAYERS_NUMBER = {
  3: { start: 24, end: 48, recommended: 36, step: 12 },
  4: { start: 20, end: 52, recommended: 40, step: 4 },
  5: { start: 20, end: 40, recommended: 40, step: 20 },
  6: { start: 24, end: 48, recommended: 48, step: 12 },
}

const PLAYERS_NUMBER_OPTIONS = Object.keys(TOTAL_CARDS_BY_PLAYERS_NUMBER)

type NumberOfPlayers = keyof typeof TOTAL_CARDS_BY_PLAYERS_NUMBER

export const Home = () => {
  const navigate = useNavigate()
  const { match, user, createGame, stopGame, gameSettings } = useGameContext()
  const [totalCards, setTotalCards] = useState(40)
  const [numberOfPlayers, setNumberOfPlayers] = useState<NumberOfPlayers>(4)

  const isMatchActive = !!Object.keys(match.players).length

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const players = numberOfPlayers
    const cards = totalCards

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
              {PLAYERS_NUMBER_OPTIONS.map((value) => (
                <>
                  <input
                    type='radio'
                    name='numberOfPlayers'
                    id={value}
                    value={value}
                    checked={numberOfPlayers === Number(value)}
                    onChange={(e) => {
                      const players = Number(e.target.value) as NumberOfPlayers
                      setNumberOfPlayers(players)
                      const cards = TOTAL_CARDS_BY_PLAYERS_NUMBER[players]
                      setTotalCards(cards.recommended)
                    }}
                  />
                  <label htmlFor={value}>{value}</label>
                </>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor='totalCards'>Cartas no baralho:</label>
            <div>
              <input
                type='range'
                name='totalCards'
                id='totalCards'
                step={TOTAL_CARDS_BY_PLAYERS_NUMBER[numberOfPlayers].step}
                min={TOTAL_CARDS_BY_PLAYERS_NUMBER[numberOfPlayers].start}
                max={TOTAL_CARDS_BY_PLAYERS_NUMBER[numberOfPlayers].end}
                onChange={(e) => setTotalCards(Number(e.target.value))}
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
