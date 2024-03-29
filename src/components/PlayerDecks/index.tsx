import { useGameContext } from '@/contexts'
import { Deck } from './components'
import { changePlayersOrder } from './utils'

export const PlayerDecks = () => {
  const {
    user,
    match,
    players,
    interfaceSettings: { cardSize },
    gameSettings: { playersOrder },
  } = useGameContext()

  const reorderedPlayers = changePlayersOrder(playersOrder, user.id)
  const numberOfPlayers = playersOrder.length
  const deckCardOffset =
    numberOfPlayers < 6 ? cardSize.width * 0.6 : cardSize.width * 0.9

  const positions =
    numberOfPlayers === 6
      ? (['bottom', 'left', 'top-left', 'top', 'top-right', 'right'] as const)
      : numberOfPlayers === 5
      ? (['bottom', 'left', 'top-left', 'top-right', 'right'] as const)
      : numberOfPlayers === 4
      ? (['bottom', 'left', 'top', 'right'] as const)
      : (['bottom', 'left', 'right'] as const)

  return (
    <>
      {reorderedPlayers.map((playerId, index) => (
        <Deck
          key={playerId}
          playerId={playerId}
          accumulated={players[playerId].accumulated}
          cards={match.players[playerId]?.cards || []}
          cardOffset={deckCardOffset}
          position={positions[index]}
        />
      ))}
    </>
  )
}
