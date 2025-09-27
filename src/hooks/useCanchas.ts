import { useState, useEffect, useCallback } from 'react'
import { CanchasService } from '../services/canchasService'
import { Cancha, CanchaFilter } from '../types'

export function useCanchas() {
  const [canchas, setCanchas] = useState<Cancha[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCanchas = useCallback(async (filter?: CanchaFilter) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await CanchasService.getCanchas(filter)
      
      if (result.success && result.data) {
        setCanchas(result.data)
      } else {
        setError(result.error || 'Error al cargar las canchas')
        setCanchas([])
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.')
      setCanchas([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getCanchaById = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await CanchasService.getCanchaById(id)
      
      if (result.success && result.data) {
        return { success: true, data: result.data }
      } else {
        setError(result.error || 'Cancha no encontrada')
        return { success: false, error: result.error || 'Cancha no encontrada' }
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Inténtalo de nuevo.'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reservarCancha = useCallback(async (canchaId: string, userId: string, fecha: string, horario: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await CanchasService.reservarCancha(canchaId, userId, fecha, horario)
      
      if (result.success) {
        return { success: true }
      } else {
        setError(result.error || 'Error al crear la reserva')
        return { success: false, error: result.error || 'Error al crear la reserva' }
      }
    } catch (err) {
      const errorMsg = 'Error de conexión. Inténtalo de nuevo.'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cargar canchas por defecto al montar el hook
  useEffect(() => {
    fetchCanchas()
  }, [fetchCanchas])

  return {
    canchas,
    isLoading,
    error,
    fetchCanchas,
    getCanchaById,
    reservarCancha,
    clearError: () => setError(null),
    zonas: CanchasService.getZonas(),
    tiposCanchas: CanchasService.getTiposCanchas()
  }
}