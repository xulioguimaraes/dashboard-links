
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { createContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContextProvider } from "./hooks/useAuth";
import { ChakraProvider } from "@chakra-ui/react";
export const AuthContext = createContext({} as AuthContextType);
type UserType = {
  id: string;
  name: string;
  avatar: string;
};
type AuthContextType = {
  user: UserType | undefined;
  singInWithGoogle: () => void;
};
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ChakraProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="home" element={<Home />} />
            </Routes>
          </ChakraProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
