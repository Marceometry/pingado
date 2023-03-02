import styled from 'styled-components'
import { CARD_HEIGHT, CARD_WIDTH } from '@/components'

export const PACK_CARDS_OFFSET = {
  open: CARD_HEIGHT * 0.65,
  closed: CARD_HEIGHT * 0.95,
}

export const CardSequenceContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: ${PACK_CARDS_OFFSET.open}px;
`

export const CardsPlaceholder = styled.span`
  display: grid;
  place-items: center;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  margin-top: -${PACK_CARDS_OFFSET.open}px;
`
