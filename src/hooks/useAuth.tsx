import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type UserType = {
    id: string
    name: string
    avatar: string
}
type AuthContextType = {
    user: UserType | undefined
    singInWithGoogle: () => void
}

const AuthContext = createContext({} as AuthContextType)
interface IChildren{
    children: ReactNode
}

export const AuthContextProvider = ({ children }: IChildren) => {
    const [user, setUser] = useState<UserType>()
    const auth = getAuth()
    useEffect(()=>{
        const onsub = onAuthStateChanged(auth,user=>{
            if (user) {
                const { displayName, photoURL, uid } = user
                if (!displayName || !photoURL) {
                    throw new Error("Não encontradas na conta Google")
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })
        return ()=>{
            onsub()
        }
    },[])

    const singInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(result => {
            if (result.user) {
                const { displayName, photoURL, uid } = result.user
                if (!displayName || !photoURL) {
                    throw new Error("Não encontradas na conta Google")
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })
    }
    return (
        <AuthContext.Provider value={{ user, singInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const value = useContext(AuthContext)
    return value
}