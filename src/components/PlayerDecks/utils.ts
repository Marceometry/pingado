export const changePlayersOrder = (
  playersOrder: string[],
  playerId: string
) => {
  const playerIndex = playersOrder.indexOf(playerId)

  const start = playersOrder.slice(playerIndex)
  const end = playersOrder.slice(0, playerIndex)

  return [...start, ...end]
}
