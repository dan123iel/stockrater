import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Stock from './pages/App'        // Stock detail page
import Login from './pages/Login'
import Signup from './pages/Signup'
import Portfolio from './pages/Portfolio'
import Markets from './pages/Markets'
import RoboAdvisor from './pages/RoboAdvisor'
import CFD from './pages/CFD'
import DevGrid from './components/DevGrid'

const DEV_GRID = false // set to true to show grid overlay

function AuthGuard({ children }) {
  const user = localStorage.getItem('pondex_user')
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Root() {
  return (
    <Router basename="/stockrater">
      <ScrollToTop />
      {DEV_GRID && <DevGrid />}
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* App — authenticated */}
        <Route path="/app" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/app/stock" element={<AuthGuard><Stock /></AuthGuard>} />
        <Route path="/app/portfolio" element={<AuthGuard><Portfolio /></AuthGuard>} />
        <Route path="/app/markets" element={<AuthGuard><Markets /></AuthGuard>} />
        <Route path="/app/robo" element={<AuthGuard><RoboAdvisor /></AuthGuard>} />
        <Route path="/app/cfd" element={<AuthGuard><CFD /></AuthGuard>} />

        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default Root
