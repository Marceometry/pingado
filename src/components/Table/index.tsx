import { useGameContext } from '../../contexts'
import { Chip } from '../../components'
import { CardSequence } from './components'

export const Table = () => {
  const {
    players,
    restartMatch,
    match: {
      table: { accumulated },
      winner,
    },
  } = useGameContext()

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '112px',
        display: 'grid',
        placeItems: 'center',
        background: '#64d14e9d',
      }}
    >
      {winner && (
        <h2>
          Vencedor da rodada: {players[winner].name} (+{accumulated} fichas)
        </h2>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <CardSequence suit='clubs' />
        <CardSequence suit='diamonds' />

        {/* <strong
          style={{ width: CARD_WIDTH, fontSize: 32, textAlign: 'center' }}
        >
          {accumulated}
        </strong> */}
        <Chip accumulated={accumulated} />

        <CardSequence suit='spades' />
        <CardSequence suit='hearts' />
      </div>

      {winner && (
        <button
          onClick={restartMatch}
          style={{ padding: '8px 16px', fontSize: 16, borderRadius: 4 }}
        >
          Começar próxima rodada
        </button>
      )}
    </div>
  )
}
