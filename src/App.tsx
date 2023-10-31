import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import { AuthContextProvider } from "./hooks/useAuth";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { routes } from "./routes";
import { Header } from "./pages/Home/components/Header";
import { Login } from "./pages/Login/Login";
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
              <Routes>
                <Route path="/" element={<Login />} />
                {routes.map((item) => (
                  <Route
                    path={item.path}
                    element={
                      <>
                        <Header />
                        {item.element}
                      </>
                    }
                    key={item.path}
                  />
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
