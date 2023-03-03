import { Modal, PlayerDeck, Table } from '@/components'
import { useGameContext } from '@/contexts'
import { GamePageContainer } from './styles'

const positions = ['bottom', 'left', 'top', 'right'] as const

export const Game = () => {
  const {
    match,
    players,
    gameSettings: { playersOrder },
  } = useGameContext()

  return (
    <GamePageContainer>
      <Table />

      {!match || !Object.keys(match.players).length ? (
        <></>
      ) : (
        <>
          <Modal />

          {playersOrder.map((playerId, index) => (
            <PlayerDeck
              key={playerId}
              playerId={playerId}
              accumulated={players[playerId].accumulated}
              cards={match.players[playerId].cards}
              position={positions[index]}
            />
          ))}
        </>
      )}
    </GamePageContainer>
  )
}
