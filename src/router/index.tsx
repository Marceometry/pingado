import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NewGame, Home, Game } from '@/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/solo' element={<NewGame />} />
        <Route path='/solo/play' element={<Game />} />

        <Route path='/multiplayer' element={<NewGame />} />
        <Route path='/multiplayer/play' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
