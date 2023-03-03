import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    font: 400 1rem sans-serif;
    color: #ffffff;
    background-color: #242424;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    border: 0;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }
`
