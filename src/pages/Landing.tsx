import { Link } from 'react-router-dom'
import { Calendar, ShieldCheck, Zap, Search } from 'lucide-react'
import { useState } from 'react'

const zonasPuertoMaldonado = [
  'Centro Histórico',
  'Pueblo Viejo', 
  'Bellavista',
  'Inambari',
  'Los Olivos',
  'Alto Tambopata',
  'La Joya',
  'Tahuamanu',
  'El Triunfo'
]

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedZona, setSelectedZona] = useState('')

  const handleSearch = () => {
    // Lógica de búsqueda
    console.log('Buscando en:', selectedZona || searchQuery)
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop"
            alt="Cancha de fútbol vista aérea"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          {/* Subtle green tint */}
          <div className="absolute inset-0 bg-primary/20"></div>
          {/* Pattern Overlay for Soccer Field Effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-edge text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
            Encuentra y reserva la<br />
            <span className="text-secondary drop-shadow-lg">cancha perfecta</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white mb-12 max-w-3xl mx-auto drop-shadow-md">
            JUEGAZO te conecta con las mejores canchas deportivas de Puerto Maldonado. Reserva fácilmente 
            y disfruta de tu deporte favorito.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-full shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
              {/* Location Dropdown */}
              <div className="flex-1">
                <select
                  value={selectedZona}
                  onChange={(e) => setSelectedZona(e.target.value)}
                  className="w-full px-6 py-4 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 text-base"
                >
                  <option value="">Buscar canchas por ubicación</option>
                  {zonasPuertoMaldonado.map((zona) => (
                    <option key={zona} value={zona}>
                      {zona}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="flex-1 sm:border-l border-gray-200">
                <input
                  type="text"
                  placeholder="O buscar por nombre de cancha..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 text-base"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-colors min-w-[120px] justify-center"
              >
                <Search className="h-5 w-5" />
                Buscar
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link 
              to="/reservar" 
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Reservar Ahora
            </Link>
            <Link 
              to="/dueños" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-full font-semibold transition-colors backdrop-blur-sm"
            >
              Soy Dueño de Cancha
            </Link>
          </div>
        </div>
      </section>
      
      {/* Strip */}
      <section className="bg-muted py-10">
        <div className="container-edge grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, kpi: '2k+', label: 'Reservas/mes' },
            { icon: Calendar, kpi: '120+', label: 'Canchas activas' },
            { icon: ShieldCheck, kpi: '99.9%', label: 'Uptime' },
          ].map((item) => (
            <div key={item.label} className="card p-5 text-center">
              <item.icon className="mx-auto h-5 w-5" />
              <p className="mt-1 text-2xl font-extrabold">{item.kpi}</p>
              <p className="text-sm text-mutedForeground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
