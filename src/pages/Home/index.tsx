import { PlayerDeck, Table } from '@/components'
import { useGameContext } from '@/contexts'
import { HomeContainer } from './styles'

const positions = ['bottom', 'left', 'top', 'right'] as const

export const Home = () => {
  const { match, players, playersOrder } = useGameContext()

  if (!match || !Object.keys(match.players).length) return <></>

  return (
    <HomeContainer>
      <Table />

      {playersOrder.map((playerId, index) => (
        <PlayerDeck
          key={playerId}
          playerId={playerId}
          accumulated={players[playerId].accumulated}
          cards={match.players[playerId].cards}
          position={positions[index]}
        />
      ))}
    </HomeContainer>
  )
}
