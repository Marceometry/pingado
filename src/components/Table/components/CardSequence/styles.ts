import styled from 'styled-components'

export const PACK_CARDS_OFFSET = {
  open: 0.65,
  closed: 0.95,
}

type CardsProps = {
  cardHeight: number
  cardWidth?: number
}

export const CardSequenceContainer = styled.div<CardsProps>`
  display: grid;
  place-items: center;
  margin-top: ${({ cardHeight }) => cardHeight * PACK_CARDS_OFFSET.open}px;
`

export const CardsPlaceholder = styled.span<CardsProps>`
  display: grid;
  place-items: center;
  width: ${({ cardWidth }) => cardWidth}px;
  height: ${({ cardHeight }) => cardHeight}px;
  margin-top: -${({ cardHeight }) => cardHeight * PACK_CARDS_OFFSET.open}px;
`
