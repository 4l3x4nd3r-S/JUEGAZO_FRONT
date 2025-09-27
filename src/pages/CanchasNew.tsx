import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Clock, Users, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCanchas } from '../hooks/useCanchas'
import type { CanchaFilter } from '../types'

export default function Canchas() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { canchas, isLoading, error, fetchCanchas, zonas, tiposCanchas } = useCanchas()
  
  const [filters, setFilters] = useState<CanchaFilter>({
    zona: 'todas',
    busqueda: ''
  })

  const handleFilterChange = (newFilters: Partial<CanchaFilter>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchCanchas(updatedFilters)
  }

  const handleReservar = (canchaId: string) => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      navigate(`/reservar?cancha=${canchaId}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchCanchas(filters)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Encuentra la Cancha Perfecta</h1>
            <p className="text-xl text-primary-100">
              Las mejores canchas de Puerto Maldonado te esperan
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar canchas..."
                value={filters.busqueda || ''}
                onChange={(e) => handleFilterChange({ busqueda: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Zone Filter */}
            <div className="md:w-48">
              <select
                value={filters.zona || 'todas'}
                onChange={(e) => handleFilterChange({ zona: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {zonas.map(zona => (
                  <option key={zona.value} value={zona.value}>
                    {zona.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="md:w-48">
              <select
                value={filters.tipoCancha || ''}
                onChange={(e) => handleFilterChange({ tipoCancha: e.target.value || undefined })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Todos los deportes</option>
                {tiposCanchas.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {canchas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron canchas con los filtros aplicados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {canchas.map((cancha) => (
              <div key={cancha.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Image */}
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={cancha.imagenUrl || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&q=80'}
                    alt={cancha.nombre}
                    className="w-full h-full object-cover"
                  />
                  {cancha.techada && (
                    <div className="absolute top-3 right-3">
                      <Shield className="h-6 w-6 text-blue-500 bg-white rounded-full p-1" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{cancha.nombre}</h3>
                    <span className="text-2xl font-bold text-primary-600">S/.{cancha.precio}</span>
                  </div>

                  {cancha.direccion && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{cancha.direccion}</span>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600 mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Capacidad: {cancha.capacidad} personas</span>
                  </div>

                  {cancha.descripcion && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cancha.descripcion}</p>
                  )}

                  {/* Services */}
                  {cancha.servicios.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {cancha.servicios.slice(0, 3).map((servicio, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {servicio}
                          </span>
                        ))}
                        {cancha.servicios.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            +{cancha.servicios.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Availability & Book button */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">
                        {cancha.disponible ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleReservar(cancha.id)}
                      disabled={!cancha.disponible}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        cancha.disponible
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}