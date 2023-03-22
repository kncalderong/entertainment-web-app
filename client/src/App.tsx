import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Error, ProtectedRoute, SignIn } from './pages'
import { Bookmarked, Series, Movies, Home, SharedLayout } from './pages/dashboard'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignIn/>} ></Route>
        <Route path='/' element={<ProtectedRoute>
          <SharedLayout />
        </ProtectedRoute>} >
          <Route index element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path='series' element={<Series />} />
          <Route path='bookmarked' element={<Bookmarked />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
