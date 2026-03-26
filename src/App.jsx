import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import LandingPage from './pages/LandingPage.jsx'
import InterestForm from './pages/InterestForm.jsx'
import AdminPage from './pages/AdminPage.jsx'
import './styles.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<InterestForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App