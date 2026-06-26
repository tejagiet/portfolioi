import { Routes, Route, Navigate } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminSetup from './pages/AdminSetup'

function ProtectedRoute({ children }) {
  const isAuth = sessionStorage.getItem('teja-admin-auth') === 'true'
  return isAuth ? children : <Navigate to="/admin" replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Portfolio />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/setup" element={<AdminSetup />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
