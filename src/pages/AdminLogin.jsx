import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

function AdminLogin() {
  const { login, loginError } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const result = login(username, password)

    if (result.success) {
      navigate('/admin/dashboard', { replace: true })
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>
        <p className="login-subtitle">
          Sign in to access the admin dashboard.
        </p>

        {loginError && (
          <div className="message-banner message-banner-error">
            ✕ {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin