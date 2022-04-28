import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export const Login = () => {
    const { user, singInWithGoogle } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            return  navigate("/home")
        }
    }, [user])
    const handleLogin = () => {
        if (!user) {
            return  singInWithGoogle()
        } 
    }
    return (
        <div>
           {user ? <h1>Bem Vindo. {user.name}</h1>: <button onClick={handleLogin}>
                faça login com Google
            </button>}
        </div>
    )
}
