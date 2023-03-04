import { Modal, PlayerDecks, Table } from '@/components'
import { useGameContext } from '@/contexts'
import { GamePageContainer } from './styles'

export const Game = () => {
  const { match } = useGameContext()

  return (
    <GamePageContainer>
      <Table />

      {!!match && !!Object.keys(match.players).length && (
        <>
          <PlayerDecks />
        </>
      )}
    </GamePageContainer>
  )
}
