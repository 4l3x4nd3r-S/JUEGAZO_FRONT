import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { AuthService } from '../services/authService'

export function useAuthActions() {
  const { login: contextLogin, logout: contextLogout, register: contextRegister } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = useCallback(async (phoneNumber: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Solo usar el contexto, que ya maneja AuthService internamente
      const success = await contextLogin(phoneNumber, password)
      
      if (success) {
        navigate('/')
        return { success: true }
      } else {
        setError('Credenciales incorrectas')
        return { success: false, error: 'Credenciales incorrectas' }
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Inténtalo de nuevo.'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }, [contextLogin, navigate])

  const register = useCallback(async (userData: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await AuthService.register(userData)
      
      if (result.success && result.user) {
        AuthService.saveAuthData(result.user)
        const success = await contextRegister(userData)
        
        if (success) {
          navigate('/')
          return { success: true }
        } else {
          setError('Error inesperado')
          return { success: false, error: 'Error inesperado' }
        }
      } else {
        setError(result.error || 'Error de registro')
        return { success: false, error: result.error || 'Error de registro' }
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Inténtalo de nuevo.'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }, [contextRegister, navigate])

  const logout = useCallback(() => {
    AuthService.clearAuthData()
    contextLogout()
    navigate('/')
  }, [contextLogout, navigate])

  const verifyPhone = useCallback(async (phoneNumber: string, code: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await AuthService.verifyPhone(phoneNumber, code)
      
      if (result.success) {
        return { success: true }
      } else {
        setError(result.error || 'Error de verificación')
        return { success: false, error: result.error || 'Error de verificación' }
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Inténtalo de nuevo.'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendVerificationCode = useCallback(async (phoneNumber: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await AuthService.sendVerificationCode(phoneNumber)
      
      if (result.success) {
        return { success: true }
      } else {
        setError(result.error || 'Error al enviar código')
        return { success: false, error: result.error || 'Error al enviar código' }
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Inténtalo de nuevo.'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    login,
    register,
    logout,
    verifyPhone,
    sendVerificationCode,
    isLoading,
    error,
    clearError: () => setError(null)
  }
}