import styled from 'styled-components'
import { TableBackgroundColor } from '@/styles'

type TableProps = {
  background: TableBackgroundColor
  cardHeight: number
}

export const TableContainer = styled.div<TableProps>`
  width: 100%;
  height: 100%;
  padding: ${({ cardHeight }) => `${cardHeight * 1.5}px ${cardHeight * 2.5}px`};
  background: ${({ background, theme }) => theme.tableColors[background]};
  display: grid;
  place-items: center;
  gap: 16px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
`

export const RestartButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.white};
  border: 2px solid #000;
  box-shadow: 0 0 8px #444;
  transition: background-color 0.2s;
  z-index: 100;

  &:hover {
    background-color: #ddd;
  }
`
