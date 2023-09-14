import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { createContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContextProvider } from "./hooks/useAuth";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { routes } from "./routes";
import { Header } from "./pages/Home/components/Header";
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
            <Container>
              <Header />
              <Routes>
                {routes.map((item) => (
                  <Route path={item.path} element={item.element} />
                ))}
              </Routes>
            </Container>
          </ChakraProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
