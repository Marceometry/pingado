import styled from 'styled-components'

const CARD_BASE_WIDTH = 3
const CARD_BASE_HEIGHT = 4
const CARD_SIZE_MULTIPLIER = 22

export const CARD_WIDTH = CARD_BASE_WIDTH * CARD_SIZE_MULTIPLIER
export const CARD_HEIGHT = CARD_BASE_HEIGHT * CARD_SIZE_MULTIPLIER

export const SUIT_ICON_SIZE = CARD_SIZE_MULTIPLIER - 2
export const SUIT_FONT_SIZE = CARD_SIZE_MULTIPLIER - 6

type CardContainerProps = {
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
  font-size: ${SUIT_FONT_SIZE}px;
  font-weight: bold;
  border-radius: 4px;
  border: 2px solid #000;
  box-shadow: 0 0 5px #444;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 4;
  transition: margin 0.5s;

  width: ${({ horizontal }) => (horizontal ? CARD_HEIGHT : CARD_WIDTH)}px;
  height: ${({ horizontal }) => (horizontal ? CARD_WIDTH : CARD_HEIGHT)}px;
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
