export interface Cancha {
  id: string
  nombre: string
  direccion?: string
  zona: string
  precio: number
  disponible: boolean
  tipoCancha: 'futbol' | 'futsal' | 'basquet' | 'voley' | 'tenis'
  capacidad: number
  techada: boolean
  imagenUrl?: string
  descripcion?: string
  servicios: string[]
  horarios: string[]
  propietarioId: string
  createdAt: string
  updatedAt: string
}

export interface CanchaFilter {
  zona?: string
  tipoCancha?: string
  precioMin?: number
  precioMax?: number
  techada?: boolean
  disponible?: boolean
  busqueda?: string
}

export interface CanchaFilters {
  searchQuery: string
  selectedZona: string
  selectedDeporte: string
}

export interface Reserva {
  id: string
  canchaId: string
  userId: string
  fecha: string
  horaInicio: string
  horaFin: string
  precio: number
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  createdAt: string
  updatedAt: string
}

export interface ReservaData {
  canchaId: string
  fecha: string
  horaInicio: string
  horaFin: string
  tipoDeporte: string
}