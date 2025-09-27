export interface User {
  id: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  email: string
  phoneNumber: string
  fechaNacimiento: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginRequest {
  phoneNumber: string
  password: string
}

export interface RegisterRequest {
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  email: string
  phoneNumber: string
  fechaNacimiento: string
  password: string
}

export interface LoginCredentials {
  phoneNumber: string
  password: string
}

export interface RegisterData {
  phoneNumber: string
}

export interface CompleteProfileData {
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  fechaNacimiento: string
  email: string
  password: string
  confirmPassword: string
}

export interface VerificationData {
  phoneNumber: string
  code: string
}