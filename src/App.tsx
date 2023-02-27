import { useGameContext } from './contexts'
import { getPlaceableCards } from './contexts/GameContext/utils'

export function App() {
  const {
    match,
    players,
    playersOrder,
    restartMatch,
    placeCard,
    dropAndSkipTurn,
  } = useGameContext()

  if (!match || !Object.keys(match.players).length) return <></>

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '4rem',
      }}
    >
      <div>
        <div style={{ marginBottom: '3rem' }}>
          {match.winner && (
            <>
              <p>Vencedor: {match.winner}</p>
              <p>Pontos ganhados: {match.table.accumulated}</p>
              <p>Total de pontos: {players[match.winner]?.accumulated}</p>
              <button onClick={restartMatch} style={{ marginTop: '1rem' }}>
                Começar próxima partida
              </button>
            </>
          )}
        </div>

        {playersOrder.map((playerId) => {
          const mustDrop = !getPlaceableCards(
            match.players[playerId].cards,
            match.table.cards
          ).length

          return (
            <h1 key={playerId}>
              {playerId} - {players[playerId].accumulated} -{' '}
              <button
                disabled={!mustDrop}
                onClick={() => dropAndSkipTurn(playerId)}
                style={{ padding: '2px 4px' }}
              >
                Pingar
              </button>{' '}
              -
              {match?.players[playerId]?.cards.map((card) => (
                <button
                  key={card.label + card.suit}
                  style={{
                    margin: '0 0.5rem',
                    padding: '2px 4px',
                    fontWeight: 'bold',
                    color:
                      card.suit === 'clubs' || card.suit === 'spades'
                        ? 'black'
                        : 'red',
                  }}
                  onClick={() => placeCard(card, playerId)}
                >
                  {card.label} / {card.suit}
                </button>
              ))}
            </h1>
          )
        })}

        <div style={{ marginTop: '3rem' }}>
          {match.startingPlayer && (
            <p>Primeiro a jogar: {match.startingPlayer}</p>
          )}
          {match.currentPlayer && <p>Jogador atual: {match.currentPlayer}</p>}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            height: 'fit-content',
            padding: 8,
            background: 'white',
            color: 'black',
          }}
        >
          <p>{match.table.cards.clubs?.[0]}</p>
          {match.table.cards.clubs?.[0] !== match.table.cards.clubs?.[1] && (
            <p>{match.table.cards.clubs?.[1]}</p>
          )}
        </div>
        <div
          style={{
            height: 'fit-content',
            padding: 8,
            background: 'white',
            color: 'red',
          }}
        >
          <p>{match.table.cards.diamonds?.[0]}</p>
          {match.table.cards.diamonds?.[0] !==
            match.table.cards.diamonds?.[1] && (
            <p>{match.table.cards.diamonds?.[1]}</p>
          )}
        </div>
        <div
          style={{
            height: 'fit-content',
            padding: 8,
            background: 'white',
            color: 'black',
          }}
        >
          <p>{match.table.cards.spades?.[0]}</p>
          {match.table.cards.spades?.[0] !== match.table.cards.spades?.[1] && (
            <p>{match.table.cards.spades?.[1]}</p>
          )}
        </div>
        <div
          style={{
            height: 'fit-content',
            padding: 8,
            background: 'white',
            color: 'red',
          }}
        >
          <p>{match.table.cards.hearts?.[0]}</p>
          {match.table.cards.hearts?.[0] !== match.table.cards.hearts?.[1] && (
            <p>{match.table.cards.hearts?.[1]}</p>
          )}
        </div>
      </div>
    </div>
  )
}
