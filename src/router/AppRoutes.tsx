import { Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import VerifyPhone from '../pages/VerifyPhone'
import CompleteProfile from '../pages/CompleteProfile'
import Canchas from '../pages/Canchas'
import Dashboard from '../pages/Dashboard'
import Duenos from '../pages/Duenos'
import Reservar from '../pages/Reservar'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-phone" element={<VerifyPhone />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/canchas" element={<Canchas />} />
      <Route path="/duenos" element={<Duenos />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reservar" element={<Reservar />} />
      
      {/* Fallback route */}
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}