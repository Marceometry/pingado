import styled from 'styled-components'
import { CardSizes } from '@/contexts'

type CardContainerProps = {
  cardSize: CardSizes
  marginTop: number
  marginLeft: number
  zIndex?: number
  highlighted?: boolean
  horizontal?: boolean
  color: 'red' | 'black'
}

export const CardContainer = styled.span<CardContainerProps>`
  position: relative;
  padding: 8px;
  font-size: ${({ cardSize }) => cardSize.fontSize}px;
  font-weight: bold;
  border-radius: 4px;
  border: 2px solid #000;
  box-shadow: 0 0 5px #444;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 4;
  transition: margin 0.5s;

  width: ${({ horizontal, cardSize }) =>
    horizontal ? cardSize.height : cardSize.width}px;
  height: ${({ horizontal, cardSize }) =>
    horizontal ? cardSize.width : cardSize.height}px;
  margin-top: ${({ marginTop }) => -marginTop}px;
  margin-left: ${({ marginLeft }) => -marginLeft}px;
  z-index: ${({ zIndex }) => zIndex};
  color: ${({ color, theme }) => theme[color]};
  background-color: ${({ highlighted, theme }) =>
    highlighted ? theme.highlight : theme.white};

  > span {
    width: 100%;
    text-align: left;

    &:last-child {
      text-align: right;
    }
  }
`
