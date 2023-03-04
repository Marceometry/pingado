import styled from 'styled-components'

type DeckContainerProps = {
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  isVertical: boolean
  isHorizontal: boolean
  highlightName: boolean
  cardHeight: number
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export const DeckContainer = styled.div<DeckContainerProps>`
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ flexDirection }) => flexDirection};
  max-width: ${({ isVertical, cardHeight }) =>
    isVertical ? cardHeight * 2 : undefined}px;
  max-height: ${({ isHorizontal, cardHeight }) =>
    isHorizontal ? cardHeight : undefined}px;

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
  cardOffset: number
}

export const CardsContainer = styled.div<CardsContainerProps>`
  display: flex;
  flex-direction: ${({ isOnSide }) => (isOnSide ? 'column' : 'row')};
  margin-top: ${({ noOffset, cardOffset, isOnSide }) =>
    noOffset ? 0 : isOnSide ? cardOffset : 0}px;
  margin-left: ${({ noOffset, cardOffset, isOnTop }) =>
    noOffset ? 0 : isOnTop ? cardOffset : 0}px;
`
