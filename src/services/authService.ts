import { User, LoginRequest, RegisterRequest } from '../types'

export class AuthService {
  // URL base usando proxy de Vite para evitar CORS
  private static readonly API_BASE = '/api'
  
  static async login(request: LoginRequest): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
    try {
      console.log('🚀 Intentando login con:', request)
      console.log('🌐 URL completa:', `${this.API_BASE}/auth/login-json`)
      
      const requestBody = {
        num_celular: request.phoneNumber,
        password: request.password
      }
      console.log('📤 Body de la petición:', requestBody)
      
      const response = await fetch(`${this.API_BASE}/auth/login-json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })
      
      console.log('📥 Respuesta status:', response.status)
      console.log('📥 Respuesta headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Error response text:', errorText)
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { detail: errorText }
        }
        
        console.error('❌ Error data:', errorData)
        return { 
          success: false, 
          error: errorData.detail || errorData.message || 'Credenciales incorrectas' 
        }
      }
      
      const dataText = await response.text()
      console.log('✅ Response text:', dataText)
      
      const data = JSON.parse(dataText)
      console.log('✅ Response data parsed:', data)
      
      // Mapear la respuesta de tu API al formato de User
      const user: User = {
        id: data.usuario.id_usuario.toString(),
        nombres: data.usuario.nombres,
        apellidoPaterno: data.usuario.apellido_paterno,
        apellidoMaterno: data.usuario.apellido_materno,
        email: data.usuario.email,
        phoneNumber: data.usuario.num_celular,
        fechaNacimiento: '', // No viene en la respuesta, se puede agregar después
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      console.log('👤 Usuario mapeado:', user)
      
      return { 
        success: true, 
        user,
        token: data.access_token
      }
    } catch (error) {
      console.error('💥 Error de conexión:', error)
      return { success: false, error: 'Error de conexión con el servidor' }
    }
  }

  static async register(request: RegisterRequest): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Este endpoint probablemente no existe todavía en tu API
      // Puedes implementarlo después en FastAPI si lo necesitas
      const response = await fetch(`${this.API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num_celular: request.phoneNumber,
          email: request.email,
          nombres: request.nombres,
          apellido_paterno: request.apellidoPaterno,
          apellido_materno: request.apellidoMaterno,
          password: request.password,
          fecha_nacimiento: request.fechaNacimiento
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return { 
          success: false, 
          error: errorData.detail || 'Error en el registro' 
        }
      }
      
      const data = await response.json()
      
      // Mapear respuesta similar al login
      const user: User = {
        id: data.usuario.id_usuario.toString(),
        nombres: data.usuario.nombres,
        apellidoPaterno: data.usuario.apellido_paterno,
        apellidoMaterno: data.usuario.apellido_materno,
        email: data.usuario.email,
        phoneNumber: data.usuario.num_celular,
        fechaNacimiento: request.fechaNacimiento,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      return { success: true, user }
    } catch (error) {
      console.error('Registration error:', error)
      // Por ahora devolver error ya que el endpoint probablemente no existe
      return { success: false, error: 'Registro no disponible por el momento' }
    }
  }

  static async verifyPhone(phoneNumber: string, code: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation (in real app, check against sent SMS code)
      if (code !== '123456') {
        return { success: false, error: 'Código incorrecto' }
      }
      
      return { success: true }
    } catch (error) {
      console.error('Phone verification error:', error)
      return { success: false, error: 'Error de conexión. Inténtalo de nuevo.' }
    }
  }

  static async sendVerificationCode(phoneNumber: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // In real app, this would send SMS via service like Twilio
      console.log(`Verification code sent to ${phoneNumber}: 123456`)
      
      return { success: true }
    } catch (error) {
      console.error('Send verification code error:', error)
      return { success: false, error: 'Error al enviar código. Inténtalo de nuevo.' }
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userPhone = localStorage.getItem('userPhone')
    const userName = localStorage.getItem('userName')
    
    if (!isLoggedIn || !userPhone) {
      return null
    }
    
    // In a real app, you'd make an API call to get current user data
    return {
      id: userPhone,
      nombres: userName?.split(' ')[0] || '',
      apellidoPaterno: userName?.split(' ')[1] || '',
      apellidoMaterno: userName?.split(' ')[2] || '',
      email: `${userPhone}@example.com`,
      phoneNumber: userPhone,
      fechaNacimiento: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  }

  static saveAuthData(user: User, token?: string): void {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userPhone', user.phoneNumber)
    localStorage.setItem('userName', `${user.nombres} ${user.apellidoPaterno}`)
    
    // Guardar token JWT si existe
    if (token) {
      localStorage.setItem('authToken', token)
    }
  }

  static clearAuthData(): void {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userName')
    localStorage.removeItem('authToken')
  }

  static getAuthToken(): string | null {
    return localStorage.getItem('authToken')
  }

  // Helper para hacer peticiones autenticadas
  static async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getAuthToken()
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }
    
    // Agregar token de autorización si existe
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return fetch(url, {
      ...options,
      headers
    })
  }
}