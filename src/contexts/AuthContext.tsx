import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthState } from '../types'
import { AuthService } from '../services/authService'

interface AuthContextType extends AuthState {
  login: (phoneNumber: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
      const userName = localStorage.getItem('userName') || ''
      const userPhone = localStorage.getItem('userPhone') || ''
      
      if (isLoggedIn && userPhone) {
        // Create a mock user object (in real app, fetch from API)
        const user: User = {
          id: userPhone,
          nombres: userName.split(' ')[0] || '',
          apellidoPaterno: userName.split(' ')[1] || '',
          apellidoMaterno: userName.split(' ')[2] || '',
          email: '',
          phoneNumber: userPhone,
          fechaNacimiento: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false
        })
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    }

    checkAuth()
  }, [])

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Usar el AuthService real en lugar de simulación
      const result = await AuthService.login({ phoneNumber, password })
      
      if (result.success && result.user) {
        // Guardar datos en localStorage
        AuthService.saveAuthData(result.user, result.token)
        
        setState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false
        })
        
        return true
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
        console.error('Login failed:', result.error)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userName')
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  const register = async (userData: any): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }))
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Auto login after registration
      const user: User = {
        id: userData.phoneNumber,
        nombres: userData.nombres,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        fechaNacimiento: userData.fechaNacimiento,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userPhone', userData.phoneNumber)
      localStorage.setItem('userName', `${user.nombres} ${user.apellidoPaterno}`)
      
      setState({
        user,
        isAuthenticated: true,
        isLoading: false
      })
      
      return true
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }))
      return false
    }
  }

  const updateUser = (userData: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null
    }))
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    register,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}