export const theme = {
  white: '#f0f0f0',
  gray: '#cccccc',
  black: '#181818',
  red: '#ec1010',
  highlight: '#add8e6',
  customColors: {
    black: '#181818',
    red: '#d14e4e',
    orange: '#d1984e',
    yellow: '#d1c84e',
    green: '#259c29',
    lightblue: '#4ed1cb',
    blue: '#305bb7',
    purple: '#9d4ed1',
    pink: '#d14ed1',
  },
  tableColors: {
    red: '#d14e4e9d',
    orange: '#d1984e9d',
    yellow: '#d1c84e9d',
    lightgreen: '#8dd14e9d',
    green: '#64d14e9d',
    lightblue: '#4ed1cb9d',
    blue: '#4e78d19d',
    purple: '#9d4ed19d',
    pink: '#d14ed19d',
  },
} as const

export type CustomColor = keyof typeof theme.customColors

export type TableBackgroundColor = keyof typeof theme.tableColors
