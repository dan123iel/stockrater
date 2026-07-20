import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/Landing'
import App from './pages/App'
import Login from './pages/Login'
import Signup from './pages/Signup'

function AuthGuard({ children }) {
  const user = localStorage.getItem('pondex_user')
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Root() {
  return (
    <Router basename="/stockrater">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<AuthGuard><App /></AuthGuard>} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default Root
