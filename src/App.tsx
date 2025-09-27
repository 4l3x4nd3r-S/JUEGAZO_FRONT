import { AuthProvider } from './contexts/AuthContext'
import { AppRoutes } from './router/AppRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ThemeProvider } from './theme'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
