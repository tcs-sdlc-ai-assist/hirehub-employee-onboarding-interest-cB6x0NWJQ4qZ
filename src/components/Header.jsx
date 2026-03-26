import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth.js'

function Header() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/admin', { replace: true })
  }

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="header-logo">
          HireHub
        </NavLink>
        <nav className="header-nav" style={{ display: 'flex' }}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              'header-nav-link' + (isActive ? ' active' : '')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/apply"
            className={({ isActive }) =>
              'header-nav-link' + (isActive ? ' active' : '')
            }
          >
            Apply
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              'header-nav-link' + (isActive ? ' active' : '')
            }
          >
            Admin
          </NavLink>
          {isLoggedIn ? (
            <button
              className="btn btn-outline btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/admin" className="btn btn-primary btn-sm">
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header