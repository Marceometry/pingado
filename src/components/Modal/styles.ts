import styled from 'styled-components'

export const OpenModalButton = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  line-height: 0;
  transition: transform 0.5s;

  &:hover {
    transform: rotate(90deg);
  }
`
