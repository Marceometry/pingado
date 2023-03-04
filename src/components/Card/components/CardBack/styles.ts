import styled from 'styled-components'
import { CustomColor } from '@/styles'

type CardBackProps = {
  color: CustomColor
}

export const CardBackContainer = styled.div<CardBackProps>`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 3px solid ${({ color, theme }) => theme.customColors[color]};

  > div {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    border: 2px solid ${({ color, theme }) => theme.customColors[color]};
    padding: 8px;

    > div {
      width: 100%;
      height: 100%;
      border-radius: 2px;
      background-color: ${({ color, theme }) => theme.customColors[color]};
    }
  }
`
