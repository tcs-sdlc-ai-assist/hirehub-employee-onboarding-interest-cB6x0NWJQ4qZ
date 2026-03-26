import { useState, useCallback } from 'react'
import { isAuthenticated, login as authLogin, logout as authLogout } from '../services/AuthService.js'

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated())
  const [loginError, setLoginError] = useState('')

  const login = useCallback((username, password) => {
    setLoginError('')

    const result = authLogin(username, password)

    if (result.success) {
      setIsLoggedIn(true)
      return { success: true }
    }

    if (result.error === 'INVALID_CREDENTIALS') {
      setLoginError('Invalid username or password')
    } else if (result.error === 'STORAGE_ERROR') {
      setLoginError('An error occurred. Please try again.')
    } else {
      setLoginError('Login failed')
    }

    return { success: false, error: result.error }
  }, [])

  const logout = useCallback(() => {
    authLogout()
    setIsLoggedIn(false)
    setLoginError('')
  }, [])

  return {
    isLoggedIn,
    login,
    logout,
    loginError,
  }
}

export default useAuth