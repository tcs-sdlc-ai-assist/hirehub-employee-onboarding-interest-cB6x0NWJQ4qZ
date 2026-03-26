const AUTH_KEY = 'hirehub_admin_auth'

function isAuthenticated() {
  try {
    const data = sessionStorage.getItem(AUTH_KEY)
    if (!data) {
      return false
    }
    const parsed = JSON.parse(data)
    if (parsed && parsed.isAdmin === true) {
      return true
    }
    return false
  } catch (error) {
    console.error('AuthService: failed to parse auth session, clearing', error)
    logout()
    return false
  }
}

function login(username, password) {
  if (username === 'admin' && password === 'admin') {
    try {
      sessionStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          isAdmin: true,
          loginTime: new Date().toISOString(),
        })
      )
      return { success: true }
    } catch (error) {
      console.error('AuthService: failed to save auth session', error)
      return { success: false, error: 'STORAGE_ERROR' }
    }
  }
  return { success: false, error: 'INVALID_CREDENTIALS' }
}

function logout() {
  try {
    sessionStorage.removeItem(AUTH_KEY)
  } catch (error) {
    console.error('AuthService: failed to clear auth session', error)
  }
}

export {
  isAuthenticated,
  login,
  logout,
}