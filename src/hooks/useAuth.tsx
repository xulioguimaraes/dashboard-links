import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { child, get, ref, set } from "firebase/database";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../services/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
};
type AuthContextType = {
  user: UserType | undefined;
  singInWithGoogle: () => void;
  singOutGoogle: () => void;
};
type WriteUserDataType = {};
function stringToSlug(str: string) {
  // Remove acentos e caracteres especiais
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Converte para letras minúsculas e substitui espaços por hífens
  str = str.toLowerCase().replace(/ /g, "-");

  // Remove caracteres não alfanuméricos e hífens duplicados
  str = str.replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");

  return str;
}

const AuthContext = createContext({} as AuthContextType);
interface IChildren {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IChildren) => {
  const [user, setUser] = useState<UserType>();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    const onsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error("Não encontradas na conta Google");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
    return () => {
      onsub();
    };
  }, []);
  function writeUserData(userId: string, name: string, imageUrl: string) {
    const dbRef = ref(database);
    get(child(dbRef, `links/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
        } else {
          //criar sala para usuario
          set(ref(database, "links/" + userId), {
            username: name,
            id: userId,
            profile_picture: imageUrl,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return;
  }
  const singOutGoogle = async () => {
    const out = (await signOut(auth)) as undefined;
    setUser(out);
    navigate("/");
  };
  const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;
        if (!displayName || !photoURL) {
          throw new Error("Não encontradas na conta Google");
        }
        writeUserData(uid, displayName, photoURL);
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });
  };
  return (
    <AuthContext.Provider value={{ user, singInWithGoogle, singOutGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  return value;
};
