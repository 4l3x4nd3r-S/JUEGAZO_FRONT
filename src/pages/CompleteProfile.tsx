import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Calendar, CheckCircle } from 'lucide-react'

export default function CompleteProfile() {
  const location = useLocation()
  const navigate = useNavigate()
  const phoneNumber = location.state?.phoneNumber || ''
  const isVerified = location.state?.verified || false
  
  const [formData, setFormData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect if not verified
  useEffect(() => {
    if (!phoneNumber || !isVerified) {
      navigate('/register')
    }
  }, [phoneNumber, isVerified, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombres.trim()) newErrors.nombres = 'Los nombres son requeridos'
    if (!formData.apellidoPaterno.trim()) newErrors.apellidoPaterno = 'El apellido paterno es requerido'
    if (!formData.apellidoMaterno.trim()) newErrors.apellidoMaterno = 'El apellido materno es requerido'
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida'
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Aquí irá la lógica para crear la cuenta
    console.log('Creating account:', { phoneNumber, ...formData })
    
    // Simular delay de API
    setTimeout(() => {
      setIsLoading(false)
      // Login automático después de crear la cuenta
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userPhone', phoneNumber)
      localStorage.setItem('userName', `${formData.nombres} ${formData.apellidoPaterno}`)
      
      // Redirigir al dashboard con mensaje de bienvenida
      navigate('/dashboard', { state: { newUser: true } })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Completa tu Perfil
          </h1>
          <p className="text-muted-foreground">
            Número verificado: <span className="font-semibold text-primary">+51 {phoneNumber}</span>
          </p>
        </div>

        {/* Profile Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Names Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombres" className="block text-sm font-medium text-foreground mb-2">
                  Nombres *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="nombres"
                    name="nombres"
                    type="text"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                      errors.nombres ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Ej: Juan Carlos"
                  />
                </div>
                {errors.nombres && <p className="text-error text-sm mt-1">{errors.nombres}</p>}
              </div>

              <div>
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-foreground mb-2">
                  Apellido Paterno *
                </label>
                <input
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  type="text"
                  value={formData.apellidoPaterno}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                    errors.apellidoPaterno ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Ej: García"
                />
                {errors.apellidoPaterno && <p className="text-error text-sm mt-1">{errors.apellidoPaterno}</p>}
              </div>
            </div>

            {/* Last Name and Birth Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-foreground mb-2">
                  Apellido Materno *
                </label>
                <input
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  type="text"
                  value={formData.apellidoMaterno}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                    errors.apellidoMaterno ? 'border-error' : 'border-border'
                  }`}
                  placeholder="Ej: López"
                />
                {errors.apellidoMaterno && <p className="text-error text-sm mt-1">{errors.apellidoMaterno}</p>}
              </div>

              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-foreground mb-2">
                  Fecha de Nacimiento *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                      errors.fechaNacimiento ? 'border-error' : 'border-border'
                    }`}
                  />
                </div>
                {errors.fechaNacimiento && <p className="text-error text-sm mt-1">{errors.fechaNacimiento}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                    errors.email ? 'border-error' : 'border-border'
                  }`}
                  placeholder="ejemplo@correo.com"
                />
              </div>
              {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Passwords Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                      errors.password ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Mínimo 6 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground ${
                      errors.confirmPassword ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Repetir contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms */}
            <div className="bg-muted/50 border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground">
                Al crear tu cuenta, aceptas nuestros{' '}
                <Link to="/terms" className="text-primary hover:text-primary-dark">
                  Términos de Servicio
                </Link>{' '}
                y{' '}
                <Link to="/privacy" className="text-primary hover:text-primary-dark">
                  Política de Privacidad
                </Link>
                .
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creando cuenta...
                </>
              ) : (
                'Crear Mi Cuenta'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}