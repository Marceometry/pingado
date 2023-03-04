import { useGameContext } from '@/contexts'
import { Chip } from '@/components'
import { CardSequence } from './components'
import { RestartButton, TableContainer } from './styles'

export const Table = () => {
  const {
    players,
    restartMatch,
    interfaceSettings: { tableColor, cardSize },
    match: {
      table: { accumulated },
      winner,
    },
  } = useGameContext()

  return (
    <TableContainer background={tableColor} cardHeight={cardSize.height}>
      {winner && (
        <h2>
          Vencedor da rodada: {players[winner].name} (+{accumulated} fichas)
        </h2>
      )}

      <div>
        <CardSequence suit='clubs' />
        <CardSequence suit='diamonds' />

        <Chip accumulated={accumulated} />

        <CardSequence suit='spades' />
        <CardSequence suit='hearts' />
      </div>

      {winner && (
        <RestartButton onClick={restartMatch}>
          Começar próxima rodada
        </RestartButton>
      )}
    </TableContainer>
  )
}
