import styled from 'styled-components'
import { CARD_HEIGHT, CARD_WIDTH } from '@/components'

export const DECK_CARD_OFFSET = CARD_WIDTH * 0.6

type PlayerDeckContainerProps = {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  isVertical: boolean
  isHorizontal: boolean
  highlightName: boolean
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export const PlayerDeckContainer = styled.div<PlayerDeckContainerProps>`
  gap: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ flexDirection }) => flexDirection};
  max-width: ${({ isVertical }) =>
    isVertical ? CARD_HEIGHT * 2 : undefined}px;
  max-height: ${({ isHorizontal }) =>
    isHorizontal ? CARD_HEIGHT : undefined}px;

  position: absolute;
  top: ${({ top }) => top}px;
  bottom: ${({ bottom }) => bottom}px;
  left: ${({ left }) => left}px;
  right: ${({ right }) => right}px;

  h2 {
    text-align: center;
    color: ${({ highlightName, theme }) =>
      highlightName ? theme.black : theme.white};
  }
`

type CardsContainerProps = {
  isOnSide?: boolean
  isOnTop?: boolean
  noOffset?: boolean
}

export const CardsContainer = styled.div<CardsContainerProps>`
  display: flex;
  flex-direction: ${({ isOnSide }) => (isOnSide ? 'column' : 'row')};
  margin-top: ${({ noOffset, isOnSide }) =>
    noOffset ? 0 : isOnSide ? DECK_CARD_OFFSET : 0}px;
  margin-left: ${({ noOffset, isOnTop }) =>
    noOffset ? 0 : isOnTop ? DECK_CARD_OFFSET : 0}px;
`
