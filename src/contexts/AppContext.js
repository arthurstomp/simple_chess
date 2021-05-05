import { createContext } from 'react'

const AppContext = createContext({
  accessToken: null,
  setAccessToken: () => {},
  game: null,
  setGame: () => {}
})

export default AppContext
