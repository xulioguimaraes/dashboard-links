import { ButtonsPage } from "../pages/ButtonsPage/ButtonsPage";
import { Home } from "../pages/Home/Home";
import { InfoMain } from "../pages/InfoMain/InfoMain";
import { Login } from "../pages/Login/Login";

export const routes = [
  {
    element: <Login />,
    path: "/",
  },
  {
    element: <Home />,
    path: "/home",
  },
  {
    element: <InfoMain />,
    path: "/informacao-principal",
  },
  {
    element: <ButtonsPage />,
    path: "/botoes",
  },
];
