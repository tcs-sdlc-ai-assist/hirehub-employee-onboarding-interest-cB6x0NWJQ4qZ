import useAuth from '../hooks/useAuth.js'
import AdminLogin from './AdminLogin.jsx'
import Dashboard from './Dashboard.jsx'

function AdminPage() {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Dashboard />
  }

  return <AdminLogin />
}

export default AdminPage