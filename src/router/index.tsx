import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Game, Home } from '@/pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/single-player' element={<Game />} />
        <Route path='/multi-player' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
