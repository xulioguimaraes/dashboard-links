import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/login.scss"
import { FaGoogle } from "react-icons/fa";
export const Login = () => {
    const { user, singInWithGoogle } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            return navigate("/home")
        }
    }, [user])
    const handleLogin = () => {
        if (!user) {
            return singInWithGoogle()
        }
    }
    return (
        <div className="loginContainer">
            <section className="loginContent">
                <h1>
                Rooms to.Do
                </h1>
                <button onClick={handleLogin}>
                <FaGoogle/> Entrar com Google
                </button>
            </section>

        </div>
    )
}
