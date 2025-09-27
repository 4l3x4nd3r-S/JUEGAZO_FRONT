import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Star, Clock, Users, Lock, Search, Filter } from 'lucide-react'

// Mock de datos de canchas de Puerto Maldonado
const canchasData = [
  { 
    id: 1, 
    name: 'Complejo Deportivo El Prado', 
    zona: 'Bellavista',
    tipos: ['Fútbol 11', 'Futsal'], 
    precio: 80, 
    rating: 4.8, 
    imagen: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2069&auto=format&fit=crop',
    disponible: true,
    capacidad: '22 jugadores',
    horarios: '6:00 AM - 11:00 PM'
  },
  { 
    id: 2, 
    name: 'Cancha de Voley Talento', 
    zona: 'Pueblo Viejo',
    tipos: ['Vóley'], 
    precio: 45, 
    rating: 4.6, 
    imagen: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&q=80',
    disponible: true,
    capacidad: '12 jugadores',
    horarios: '7:00 AM - 10:00 PM'
  },
  { 
    id: 3, 
    name: 'Complejo Deportivo Matute', 
    zona: 'Inambari',
    tipos: ['Fútbol 11', 'Futsal', 'Básquet'], 
    precio: 90, 
    rating: 4.9, 
    imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop',
    disponible: false,
    capacidad: '22 jugadores',
    horarios: '6:00 AM - 12:00 AM'
  },
  { 
    id: 4, 
    name: 'Complejo Deportivo La Chacrita', 
    zona: 'Alto Tambopata',
    tipos: ['Fútbol 11', 'Futsal'], 
    precio: 70, 
    rating: 4.7, 
    imagen: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=300&fit=crop&q=80',
    disponible: true,
    capacidad: '22 jugadores',
    horarios: '7:00 AM - 11:00 PM'
  },
  { 
    id: 5, 
    name: 'Complejo Deportivo El Nacional', 
    zona: 'La Joya',
    tipos: ['Fútbol 11', 'Futsal', 'Vóley'], 
    precio: 85, 
    rating: 4.8, 
    imagen: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=300&fit=crop&q=80',
    disponible: true,
    capacidad: '22 jugadores',
    horarios: '6:00 AM - 11:30 PM'
  },
  { 
    id: 6, 
    name: 'Cancha Talento de Triunfo', 
    zona: 'Centro Histórico',
    tipos: ['Futsal'], 
    precio: 60, 
    rating: 4.5, 
    imagen: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400&h=300&fit=crop&q=80',
    disponible: true,
    capacidad: '10 jugadores',
    horarios: '8:00 AM - 10:00 PM'
  },
  { 
    id: 7, 
    name: 'Cancha Multideportiva ENACE', 
    zona: 'Tahuamanu',
    tipos: ['Fútbol 11', 'Futsal', 'Vóley', 'Básquet'], 
    precio: 95, 
    rating: 4.9, 
    imagen: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&q=80',
    disponible: true,
    capacidad: '22 jugadores',
    horarios: '24 horas'
  }
]

const zonas = ['Todas', 'Bellavista', 'Pueblo Viejo', 'Inambari', 'Alto Tambopata', 'La Joya', 'Centro Histórico', 'Tahuamanu']
const deportes = ['Todos', 'Fútbol 11', 'Futsal', 'Vóley', 'Básquet']

export default function Canchas() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedZona, setSelectedZona] = useState('Todas')
  const [selectedDeporte, setSelectedDeporte] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  // Mock de autenticación (en una app real vendría de un context/store)
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'

  const filteredCanchas = canchasData.filter(cancha => {
    const matchesSearch = cancha.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cancha.zona.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cancha.tipos.some(tipo => tipo.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesZona = selectedZona === 'Todas' || cancha.zona === selectedZona
    const matchesDeporte = selectedDeporte === 'Todos' || cancha.tipos.includes(selectedDeporte)
    
    return matchesSearch && matchesZona && matchesDeporte
  })

  const handleReservar = (cancha: any) => {
    if (!isAuthenticated) {
      // Redirigir directamente al login sin mostrar alert
      navigate('/login')
      return
    }
    
    // Si está autenticado, proceder con la reserva
    navigate('/reservar', { state: { cancha } })
  }

  return (
    <main className="container-edge py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Canchas Deportivas</h1>
        <p className="text-muted-foreground">Encuentra y reserva las mejores canchas de Puerto Maldonado</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre de cancha, zona o deporte..."
            className="w-full pl-12 pr-12 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-background text-foreground"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <Filter className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl border border-border">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Zona</label>
              <select
                value={selectedZona}
                onChange={(e) => setSelectedZona(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              >
                {zonas.map(zona => (
                  <option key={zona} value={zona}>{zona}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Deporte</label>
              <select
                value={selectedDeporte}
                onChange={(e) => setSelectedDeporte(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              >
                {deportes.map(deporte => (
                  <option key={deporte} value={deporte}>{deporte}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredCanchas.length} cancha{filteredCanchas.length !== 1 ? 's' : ''} encontrada{filteredCanchas.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Canchas Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCanchas.map(cancha => (
          <div key={cancha.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={cancha.imagen}
                alt={cancha.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                <Star className="inline h-4 w-4 text-yellow-500 mr-1" />
                {cancha.rating}
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cancha.disponible 
                    ? 'bg-success/90 text-white' 
                    : 'bg-error/90 text-white'
                }`}>
                  {cancha.disponible ? 'Disponible' : 'Ocupada'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{cancha.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {cancha.zona}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-primary">S/{cancha.precio}</p>
                  <p className="text-xs text-muted-foreground">por hora</p>
                </div>
              </div>

              {/* Sports Types */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {cancha.tipos.map(tipo => (
                    <span
                      key={tipo}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                    >
                      {tipo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {cancha.capacidad}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {cancha.horarios}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleReservar(cancha)}
                  disabled={!cancha.disponible}
                  className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {!isAuthenticated && (
                    <Lock className="h-4 w-4" />
                  )}
                  {cancha.disponible ? 'Reservar' : 'No disponible'}
                </button>
                <Link
                  to={`/canchas/${cancha.id}`}
                  className="flex-1 border border-border hover:bg-muted text-foreground font-semibold py-2 px-4 rounded-xl transition-colors text-center"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCanchas.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No se encontraron canchas</h3>
          <p className="text-muted-foreground">
            Intenta cambiar los filtros o buscar con otros términos
          </p>
        </div>
      )}

      {/* Auth Notice */}
      {!isAuthenticated && (
        <div className="mt-12 card p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">¿Listo para reservar?</h3>
              <p className="text-muted-foreground mb-4">
                Inicia sesión para acceder a todas las funciones de reserva y obtener mejores precios.
              </p>
              <div className="flex gap-3">
                <Link 
                  to="/login"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register"
                  className="border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
