import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Header } from '../Header'
import { TaskList } from '../TaskList'

export const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
     return navigate("/")
    }
  }, [user])
  return (
    <>
      <Header />
      <TaskList />
    </>
  )
}
