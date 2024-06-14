import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SIgnUp';



function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <SignUp />
}

function App() {
  const [count, setCount] = useState(0)

  return ( 
  <>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route 
          path='/home'
          element={
            <ProtectedRoute>
              <Container>
                <Home />
              </Container>
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<RegisterAndLogout />} />
        <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
