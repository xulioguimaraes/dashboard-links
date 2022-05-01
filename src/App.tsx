
import './styles/global.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { createContext, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContextProvider } from './hooks/useAuth';
export const AuthContext = createContext({} as AuthContextType)
type UserType = {
  id: string
  name: string
  avatar: string
}
type AuthContextType = {
  user: UserType | undefined
  singInWithGoogle: () => void
}
function App() {

  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
