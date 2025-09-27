import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, ArrowRight } from 'lucide-react'

export default function Register() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Aquí irá la lógica para enviar el código de WhatsApp
    console.log('Sending verification code to:', phoneNumber)
    
    // Simular delay de API
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir a la página de verificación
      navigate('/verify-phone', { state: { phoneNumber } })
    }, 2000)
  }

  const formatPhoneNumber = (value: string) => {
    // Remover todos los caracteres no numéricos
    const numbers = value.replace(/\D/g, '')
    
    // Limitar a 9 dígitos para números peruanos
    const limitedNumbers = numbers.slice(0, 9)
    
    return limitedNumbers
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  return (
    <div className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4 min-h-[calc(100vh-128px)]">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Crear Cuenta
          </h1>
          <p className="text-muted-foreground">
            Regístrate en Juegazo para reservar canchas
          </p>
        </div>

        {/* Register Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Número de Celular
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                  placeholder="987654321"
                  required
                  maxLength={9}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Te enviaremos un código de verificación por WhatsApp
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || phoneNumber.length !== 9}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enviando código...
                </>
              ) : (
                <>
                  Continuar
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-sm text-muted-foreground">o</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}