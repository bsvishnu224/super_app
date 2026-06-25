import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Dashboard from './pages/Dashboard'
import MoviePage from './pages/Movies'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="categories" element={<Categories/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/movies" element={<MoviePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
