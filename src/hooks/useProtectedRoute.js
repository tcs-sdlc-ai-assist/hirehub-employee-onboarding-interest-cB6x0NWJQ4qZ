import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth.js'

function useProtectedRoute() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin', { replace: true })
    }
  }, [isLoggedIn, navigate])

  return {
    isAuthorized: isLoggedIn,
  }
}

export default useProtectedRoute