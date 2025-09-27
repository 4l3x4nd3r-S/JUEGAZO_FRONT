import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, Sun, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import logoUrl from '../assets/logo_golazo.png'
import { useTheme } from '../theme'
import { useAuth } from '../contexts/AuthContext'
import { useAuthActions } from '../hooks/useAuthActions'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const { user, isAuthenticated } = useAuth()
  const { logout } = useAuthActions()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
          isActive 
            ? 'bg-primary text-white shadow-md' 
            : 'hover:bg-primary/10 hover:text-primary-dark'
        }`
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="container-edge flex h-16 items-center">
        {/* Logo - Left */}
        <div className="flex items-center gap-3 flex-1">
          <Link to="/" className="transition-transform hover:scale-105">
            <img src={logoUrl} alt="Juegazo" className="h-8 w-auto" />
          </Link>
        </div>
        
        {/* Navigation - Center */}
        <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
          <NavItem to="/canchas">Canchas</NavItem>
          <NavItem to="/reservar">Reservar</NavItem>
          <NavItem to="/dueños">Dueños</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
        </nav>
        
        {/* Auth + Controls - Right */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {/* Auth Buttons - Desktop */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3 mr-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">
                  {user?.nombres || 'Usuario'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-error hover:text-error/80 transition-colors flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3 mr-3">
              <Link 
                to="/login" 
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors shadow-sm"
              >
                Registrarse
              </Link>
            </div>
          )}
          <button 
            onClick={toggle} 
            className="rounded-xl border border-border p-2 hover:bg-primary/10 hover:border-primary/30 transition-colors" 
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-secondary" />
            ) : (
              <Moon className="h-4 w-4 text-primary" />
            )}
          </button>
          <button 
            onClick={() => setOpen(v => !v)} 
            className="md:hidden rounded-xl border border-border p-2 hover:bg-primary/10 hover:border-primary/30 transition-colors"
          >
            <Menu className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <div className="container-edge flex flex-col gap-2 py-3">
            <NavItem to="/canchas">Canchas</NavItem>
            <NavItem to="/reservar">Reservar</NavItem>
            <NavItem to="/dueños">Dueños</NavItem>
            <NavItem to="/dashboard">Dashboard</NavItem>
            
            {/* Auth Buttons - Mobile */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-center bg-muted/50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-foreground font-medium">
                        {user?.nombres || 'Usuario'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-sm font-medium text-center text-error hover:bg-error/10 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-3 text-sm font-medium text-center text-foreground hover:bg-primary/10 rounded-xl transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-3 text-sm font-medium text-center bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors shadow-sm"
                    onClick={() => setOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
