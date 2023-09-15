import { ButtonsPage } from "../pages/ButtonsPage/ButtonsPage";
import { Home } from "../pages/Home/Home";
import { InfoMain } from "../pages/InfoMain/InfoMain";
import { Login } from "../pages/Login/Login";
import { MediaSocial } from "../pages/MediaSocial/MediaSocial";

export const routes = [
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
  {
    element: <MediaSocial />,
    path: "/redes-sociais",
  },
];
