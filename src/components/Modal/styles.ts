import styled from 'styled-components'

export const ModalContent = styled.div`
  padding-top: 16px;
  gap: 32px;
  display: grid;
`

export const ColorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
`

type ColorButtonProps = {
  background: string
  isSelected: boolean
}

export const ColorButton = styled.button<ColorButtonProps>`
  width: 50px;
  height: 50px;
  font-size: 0;
  background: ${({ background }) => background};
  border-radius: 8px;
  border: 2px solid transparent;
  border-color: ${({ isSelected }) => (isSelected ? 'white' : 'transparent')};
  transition: border-color 0.2s;
`

export const OpenModalButton = styled.button`
  position: absolute;
  right: -64px;
  z-index: 100;
  line-height: 0;
  transition: transform 0.5s;

  &:hover {
    transform: rotate(90deg);
  }
`
