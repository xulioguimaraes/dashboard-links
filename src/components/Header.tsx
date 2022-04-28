import { useAuth } from '../hooks/useAuth'
import '../styles/header.scss'

export function Header() {
  const { user } = useAuth()
  return (
    <header className="header">
      <div>
        <h1>to.DO</h1>
        <section>
          <img src={user?.avatar} alt="avatar" />
          <h3>{user?.name}</h3>
        </section>
      </div>
    </header>
  )
}