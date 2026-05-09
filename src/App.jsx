import Game from './Pages/Game'
import Home from './Pages/Home'
import { Routes,Route } from 'react-router-dom'
import Result from './Pages/Result'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </>
  )
}

export default App