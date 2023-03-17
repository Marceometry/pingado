import { Fragment, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGameContext } from '@/contexts'
import { Slider } from '@mantine/core'

const TOTAL_CARDS_BY_PLAYERS_NUMBER = {
  3: { start: 24, end: 48, recommended: 36, step: 12 },
  4: { start: 20, end: 52, recommended: 40, step: 4 },
  5: { start: 20, end: 40, recommended: 40, step: 20 },
  6: { start: 24, end: 48, recommended: 48, step: 12 },
}

const PLAYERS_NUMBER_OPTIONS = Object.keys(TOTAL_CARDS_BY_PLAYERS_NUMBER)

type NumberOfPlayers = keyof typeof TOTAL_CARDS_BY_PLAYERS_NUMBER

export const NewGameForm = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { createGame } = useGameContext()
  const [totalCards, setTotalCards] = useState(40)
  const [numberOfPlayers, setNumberOfPlayers] = useState<NumberOfPlayers>(4)

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

    navigate(`${pathname}/play`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='numberOfPlayers'>Quantidade de jogadores:</label>
        <div>
          {PLAYERS_NUMBER_OPTIONS.map((value) => (
            <Fragment key={value}>
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
            </Fragment>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor='totalCards'>Cartas no baralho:</label>
        <div>
          <Slider
            name='totalCards'
            id='totalCards'
            step={TOTAL_CARDS_BY_PLAYERS_NUMBER[numberOfPlayers].step}
            min={TOTAL_CARDS_BY_PLAYERS_NUMBER[numberOfPlayers].start}
            max={TOTAL_CARDS_BY_PLAYERS_NUMBER[numberOfPlayers].end}
            onChange={(value) => setTotalCards(value)}
            value={totalCards}
            style={{ width: '100%' }}
          />
          <span>{totalCards}</span>
        </div>
      </fieldset>
      <button type='submit' style={{ fontSize: 16 }}>
        Criar sala de jogo
      </button>
      <Link
        to='/single-player'
        style={{ display: 'block', textAlign: 'center' }}
      >
        Entrar em um jogo
      </Link>
    </form>
  )
}
