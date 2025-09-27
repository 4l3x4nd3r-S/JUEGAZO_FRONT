import { Cancha, CanchaFilter } from '../types'

export class CanchasService {
  private static readonly API_BASE = '/api/canchas'
  
  // Mock data - en una app real esto vendría de la API
  private static mockCanchas: Cancha[] = [
    {
      id: '1',
      nombre: 'Estadio Municipal',
      direccion: 'Jr. Loreto 123',
      zona: 'centro',
      precio: 80,
      disponible: true,
      tipoCancha: 'futbol',
      capacidad: 22,
      techada: false,
      imagenUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop&q=80',
      descripcion: 'Cancha de fútbol oficial con césped natural',
      servicios: ['vestuarios', 'iluminacion', 'estacionamiento'],
      horarios: ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'],
      propietarioId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      nombre: 'Arena Deportiva',
      direccion: 'Av. 26 de Diciembre 456',
      zona: 'centro',
      precio: 100,
      disponible: true,
      tipoCancha: 'futsal',
      capacidad: 12,
      techada: true,
      imagenUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop&q=80',
      descripcion: 'Cancha de futsal techada con piso sintético',
      servicios: ['vestuarios', 'aire_acondicionado', 'sonido'],
      horarios: ['09:00-11:00', '11:00-13:00', '15:00-17:00', '17:00-19:00', '19:00-21:00'],
      propietarioId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      nombre: 'Complejo Deportivo Norte',
      direccion: 'Jr. Tacna 789',
      zona: 'tambopata',
      precio: 60,
      disponible: true,
      tipoCancha: 'futbol',
      capacidad: 18,
      techada: false,
      imagenUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop&q=80',
      descripcion: 'Cancha de fútbol con césped sintético',
      servicios: ['vestuarios', 'iluminacion'],
      horarios: ['07:00-09:00', '09:00-11:00', '15:00-17:00', '17:00-19:00'],
      propietarioId: '3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      nombre: 'Cancha San José',
      direccion: 'Jr. Cusco 321',
      zona: 'inambari',
      precio: 50,
      disponible: true,
      tipoCancha: 'futbol',
      capacidad: 16,
      techada: false,
      imagenUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=400&h=300&fit=crop&q=80',
      descripcion: 'Cancha comunitaria con césped natural',
      servicios: ['vestuarios'],
      horarios: ['08:00-10:00', '14:00-16:00', '16:00-18:00'],
      propietarioId: '4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      nombre: 'Polideportivo Las Palmeras',
      direccion: 'Av. Madre de Dios 654',
      zona: 'las_piedras',
      precio: 70,
      disponible: true,
      tipoCancha: 'futsal',
      capacidad: 10,
      techada: true,
      imagenUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&q=80',
      descripcion: 'Cancha multideportiva techada',
      servicios: ['vestuarios', 'iluminacion', 'cafeteria'],
      horarios: ['10:00-12:00', '14:00-16:00', '18:00-20:00', '20:00-22:00'],
      propietarioId: '5',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]

  static async getCanchas(filter?: CanchaFilter): Promise<{ success: boolean; data?: Cancha[]; error?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let canchas = [...this.mockCanchas]
      
      // Apply filters
      if (filter) {
        if (filter.zona && filter.zona !== 'todas') {
          canchas = canchas.filter(cancha => cancha.zona === filter.zona)
        }
        
        if (filter.tipoCancha) {
          canchas = canchas.filter(cancha => cancha.tipoCancha === filter.tipoCancha)
        }
        
        if (filter.precioMin) {
          canchas = canchas.filter(cancha => cancha.precio >= filter.precioMin!)
        }
        
        if (filter.precioMax) {
          canchas = canchas.filter(cancha => cancha.precio <= filter.precioMax!)
        }
        
        if (filter.techada !== undefined) {
          canchas = canchas.filter(cancha => cancha.techada === filter.techada)
        }
        
        if (filter.disponible !== undefined) {
          canchas = canchas.filter(cancha => cancha.disponible === filter.disponible)
        }
        
        if (filter.busqueda) {
          const searchTerm = filter.busqueda.toLowerCase()
          canchas = canchas.filter(cancha => 
            cancha.nombre.toLowerCase().includes(searchTerm) ||
            (cancha.direccion && cancha.direccion.toLowerCase().includes(searchTerm)) ||
            (cancha.descripcion && cancha.descripcion.toLowerCase().includes(searchTerm))
          )
        }
      }
      
      return { success: true, data: canchas }
    } catch (error) {
      console.error('Error getting canchas:', error)
      return { success: false, error: 'Error al cargar las canchas' }
    }
  }

  static async getCanchaById(id: string): Promise<{ success: boolean; data?: Cancha; error?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const cancha = this.mockCanchas.find(c => c.id === id)
      
      if (!cancha) {
        return { success: false, error: 'Cancha no encontrada' }
      }
      
      return { success: true, data: cancha }
    } catch (error) {
      console.error('Error getting cancha:', error)
      return { success: false, error: 'Error al cargar la cancha' }
    }
  }

  static async reservarCancha(canchaId: string, userId: string, fecha: string, horario: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation
      const cancha = this.mockCanchas.find(c => c.id === canchaId)
      
      if (!cancha) {
        return { success: false, error: 'Cancha no encontrada' }
      }
      
      if (!cancha.disponible) {
        return { success: false, error: 'Cancha no disponible' }
      }
      
      if (!cancha.horarios.includes(horario)) {
        return { success: false, error: 'Horario no disponible' }
      }
      
      // In real app, this would create a reservation record
      console.log(`Reserva creada: Cancha ${canchaId}, Usuario ${userId}, Fecha ${fecha}, Horario ${horario}`)
      
      return { success: true }
    } catch (error) {
      console.error('Error creating reservation:', error)
      return { success: false, error: 'Error al crear la reserva' }
    }
  }

  static getZonas(): Array<{ value: string; label: string }> {
    return [
      { value: 'todas', label: 'Todas las zonas' },
      { value: 'centro', label: 'Centro' },
      { value: 'tambopata', label: 'Tambopata' },
      { value: 'inambari', label: 'Iñambari' },
      { value: 'las_piedras', label: 'Las Piedras' },
      { value: 'laberinto', label: 'Laberinto' }
    ]
  }

  static getTiposCanchas(): Array<{ value: string; label: string }> {
    return [
      { value: 'futbol', label: 'Fútbol' },
      { value: 'futsal', label: 'Futsal' },
      { value: 'basquet', label: 'Básquet' },
      { value: 'voley', label: 'Vóley' },
      { value: 'tenis', label: 'Tenis' }
    ]
  }
}