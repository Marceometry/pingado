import styled from 'styled-components'

export const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;

  form {
    display: grid;
    gap: 1.5rem;

    fieldset {
      border: none;
      display: grid;
      gap: 0.5rem;

      > div {
        display: flex;
        gap: 0.5rem;

        input {
          width: 100%;
        }
      }
    }
  }
`
