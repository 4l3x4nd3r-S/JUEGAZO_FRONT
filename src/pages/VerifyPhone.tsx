import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MessageCircle, RefreshCw } from 'lucide-react'

export default function VerifyPhone() {
  const location = useLocation()
  const navigate = useNavigate()
  const phoneNumber = location.state?.phoneNumber || ''
  
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    } else {
      setCanResend(true)
    }
  }, [timer])

  // Redirect if no phone number
  useEffect(() => {
    if (!phoneNumber) {
      navigate('/register')
    }
  }, [phoneNumber, navigate])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent pasting multiple digits
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newCode.every(digit => digit !== '') && newCode.join('').length === 6) {
      handleSubmit(newCode.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (verificationCode?: string) => {
    const finalCode = verificationCode || code.join('')
    if (finalCode.length !== 6) return

    setIsLoading(true)
    
    // Aquí irá la lógica de verificación
    console.log('Verifying code:', finalCode, 'for phone:', phoneNumber)
    
    // Simular delay de API
    setTimeout(() => {
      setIsLoading(false)
      // Redirigir al formulario de datos personales
      navigate('/complete-profile', { state: { phoneNumber, verified: true } })
    }, 2000)
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setTimer(60)
    setCanResend(false)
    
    // Aquí irá la lógica para reenviar el código
    console.log('Resending code to:', phoneNumber)
    
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-whatsapp/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-whatsapp" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Verificar Número
          </h1>
          <p className="text-muted-foreground">
            Ingresa el código de 6 dígitos que enviamos a
          </p>
          <p className="font-semibold text-primary">
            +51 {phoneNumber}
          </p>
        </div>

        {/* Verification Form */}
        <div className="card p-6">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
            {/* Code Input Fields */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-4 text-center">
                Código de Verificación
              </label>
              <div className="flex gap-2 justify-center">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || code.join('').length !== 6}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Verificando...
                </>
              ) : (
                'Verificar Código'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            {canResend ? (
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="text-primary hover:text-primary-dark font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Reenviando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Reenviar código
                  </>
                )}
              </button>
            ) : (
              <p className="text-muted-foreground">
                Reenviar código en {timer}s
              </p>
            )}
          </div>

          {/* WhatsApp Help */}
          <div className="mt-6 bg-whatsapp/5 border border-whatsapp/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="h-5 w-5 text-whatsapp mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-whatsapp mb-1">
                  ¿No recibiste el código?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Revisa tu WhatsApp, puede tardar unos minutos en llegar. 
                  Si no lo recibes, verifica que tengas WhatsApp instalado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}