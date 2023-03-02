import styled, { css } from 'styled-components'

type ChipContainerProps = {
  as?: 'button' | 'span'
  accumulated: number
}

const asButton = css`
  background: none;
  border: none;

  & > div {
    transition: filter 0.3s;
  }

  &:not(:disabled):hover > div {
    filter: brightness(0.8);
  }

  &:disabled > div {
    filter: brightness(0.6);
  }
`

export const ChipContainer = styled.span<ChipContainerProps>`
  position: relative;
  display: grid;
  place-items: center;
  text-shadow: 0 0 16px #222;
  color: #fff;

  svg {
    filter: drop-shadow(0 0 5px #444);
  }

  &::after {
    content: '${({ accumulated }) => String(accumulated)}';
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
  }

  ${({ as }) => (as === 'button' ? asButton : '')}
`
