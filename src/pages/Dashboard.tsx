import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Home, 
  MapPin, 
  Calendar, 
  DollarSign, 
  User,
  Plus,
  TrendingUp,
  Users,
  Clock,
  MessageCircle,
  Star,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const JuegazoDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'canchas', label: 'Mis Canchas', icon: MapPin },
    { id: 'reservas', label: 'Mis Reservas', icon: Calendar },
    { id: 'ingresos', label: 'Mis Ingresos', icon: DollarSign },
    { id: 'perfil', label: 'Mi Perfil', icon: User }
  ];

  const themeClasses = {
    bg: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-300' : 'text-gray-600',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    sidebar: darkMode ? 'bg-gray-800' : 'bg-white'
  };

  const OwnerRegistrationForm = () => (
    <div className={`${themeClasses.cardBg} rounded-2xl p-8 shadow-xl border ${themeClasses.border}`}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 mb-4">
          <MapPin className="w-10 h-10 text-white" />
        </div>
        <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Registra tu Cancha</h2>
        <p className={`${themeClasses.textSecondary}`}>Únete a Juegazo y comienza a generar ingresos</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Nombre del Dueño</label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              placeholder="Tu nombre completo"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Teléfono WhatsApp</label>
            <input
              type="tel"
              className={`w-full px-4 py-3 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              placeholder="+51 999 999 999"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Nombre de tu Cancha</label>
          <input
            type="text"
            className={`w-full px-4 py-3 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
            placeholder="Ej: Cancha Los Campeones"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Tipo de Cancha</label>
            <select className={`w-full px-4 py-3 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:ring-2 focus:ring-green-500 focus:border-green-500`}>
              <option value="">Seleccionar</option>
              <option value="futbol">Fútbol 11</option>
              <option value="futsal">Futsal</option>
              <option value="voley">Vóley</option>
              <option value="basquet">Básquet</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Precio por Hora (S/)</label>
            <input
              type="number"
              className={`w-full px-4 py-3 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              placeholder="50"
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>Dirección</label>
          <textarea
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text} focus:ring-2 focus:ring-green-500 focus:border-green-500`}
            placeholder="Dirección completa de tu cancha"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Registrar Cancha
          </button>
          <button
            type="button"
            onClick={() => setShowOwnerRegistration(false)}
            className={`px-6 py-4 rounded-xl border-2 border-green-500 ${themeClasses.text} font-semibold hover:bg-green-50 ${darkMode ? 'hover:bg-green-900' : ''} transition-all duration-300`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardContent = () => (
    <div className="space-y-8">
      {/* Header con estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`${themeClasses.cardBg} p-6 rounded-2xl shadow-lg border ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${themeClasses.textSecondary} text-sm font-medium`}>Canchas Activas</p>
              <p className={`${themeClasses.text} text-3xl font-bold`}>5</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} p-6 rounded-2xl shadow-lg border ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${themeClasses.textSecondary} text-sm font-medium`}>Reservas Hoy</p>
              <p className={`${themeClasses.text} text-3xl font-bold`}>12</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} p-6 rounded-2xl shadow-lg border ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${themeClasses.textSecondary} text-sm font-medium`}>Ingresos Mes</p>
              <p className={`${themeClasses.text} text-3xl font-bold`}>S/2,450</p>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </div>

        <div className={`${themeClasses.cardBg} p-6 rounded-2xl shadow-lg border ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${themeClasses.textSecondary} text-sm font-medium`}>Ocupación</p>
              <p className={`${themeClasses.text} text-3xl font-bold`}>78%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Reservas de hoy */}
      <div className={`${themeClasses.cardBg} rounded-2xl shadow-lg border ${themeClasses.border} overflow-hidden`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className={`${themeClasses.text} text-xl font-bold`}>Reservas de Hoy</h3>
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300">
              Ver Todas
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {[
            { cancha: 'Cancha Los Campeones', hora: '09:00 - 10:00', cliente: 'Carlos Mendoza', estado: 'confirmado' },
            { cancha: 'Cancha San Martín', hora: '15:00 - 16:00', cliente: 'María García', estado: 'pendiente' },
            { cancha: 'Cancha Victoria', hora: '18:00 - 19:00', cliente: 'José López', estado: 'confirmado' }
          ].map((reserva, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className={`${themeClasses.text} font-semibold`}>{reserva.cancha}</p>
                  <p className={`${themeClasses.textSecondary} text-sm`}>{reserva.hora} • {reserva.cliente}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reserva.estado === 'confirmado' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {reserva.estado === 'confirmado' ? 'Confirmado' : 'Pendiente'}
                </span>
                <button className="text-blue-500 hover:text-blue-700">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">¿Tienes más canchas?</h3>
            <p className="opacity-90">Agrégalas y aumenta tus ingresos con Juegazo</p>
          </div>
          <button
            onClick={() => setShowOwnerRegistration(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Agregar Cancha
          </button>
        </div>
      </div>
    </div>
  );

  const CanchasContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`${themeClasses.text} text-2xl font-bold`}>Mis Canchas</h2>
        <button
          onClick={() => setShowOwnerRegistration(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Nueva Cancha
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { nombre: 'Cancha Los Campeones', tipo: 'Fútbol 11', precio: 60, ocupacion: 85, rating: 4.8 },
          { nombre: 'Cancha San Martín', tipo: 'Futsal', precio: 50, ocupacion: 72, rating: 4.6 },
          { nombre: 'Cancha Victoria', tipo: 'Vóley', precio: 40, ocupacion: 68, rating: 4.7 },
          { nombre: 'Cancha El Dorado', tipo: 'Básquet', precio: 45, ocupacion: 59, rating: 4.5 }
        ].map((cancha, index) => (
          <div key={index} className={`${themeClasses.cardBg} rounded-2xl shadow-lg border ${themeClasses.border} overflow-hidden`}>
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{cancha.rating}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`${themeClasses.text} text-xl font-bold mb-1`}>{cancha.nombre}</h3>
                  <p className={`${themeClasses.textSecondary} text-sm`}>{cancha.tipo}</p>
                </div>
                <div className="text-right">
                  <p className={`${themeClasses.text} text-2xl font-bold`}>S/{cancha.precio}</p>
                  <p className={`${themeClasses.textSecondary} text-sm`}>por hora</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`${themeClasses.textSecondary} text-sm`}>Ocupación</span>
                  <span className={`${themeClasses.text} text-sm font-medium`}>{cancha.ocupacion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                    style={{ width: `${cancha.ocupacion}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-100 transition-colors duration-200">
                  <Eye className="w-4 h-4 inline mr-2" />
                  Ver
                </button>
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200">
                  <Edit className="w-4 h-4 inline mr-2" />
                  Editar
                </button>
                <button className="bg-red-50 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (showOwnerRegistration) return <OwnerRegistrationForm />;
    
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'canchas':
        return <CanchasContent />;
      case 'reservas':
        return (
          <div className={`${themeClasses.text} text-center py-20`}>
            <Calendar className="w-24 h-24 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">Mis Reservas</h2>
            <p className={`${themeClasses.textSecondary}`}>Gestiona todas las reservas de tus canchas</p>
          </div>
        );
      case 'ingresos':
        return (
          <div className={`${themeClasses.text} text-center py-20`}>
            <DollarSign className="w-24 h-24 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">Mis Ingresos</h2>
            <p className={`${themeClasses.textSecondary}`}>Revisa tus ganancias y estadísticas</p>
          </div>
        );
      case 'perfil':
        return (
          <div className={`${themeClasses.text} text-center py-20`}>
            <User className="w-24 h-24 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">Mi Perfil</h2>
            <p className={`${themeClasses.textSecondary}`}>Configura tu información personal</p>
          </div>
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${themeClasses.sidebar} shadow-xl transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J</span>
            </div>
            <span className={`${themeClasses.text} text-xl font-bold`}>JUEGAZO</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setShowOwnerRegistration(false);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : `${themeClasses.text} hover:bg-green-50 ${darkMode ? 'hover:bg-green-900' : ''}`
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className={`${themeClasses.cardBg} shadow-sm border-b ${themeClasses.border} px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className={`${themeClasses.text} text-2xl font-bold`}>
                  {showOwnerRegistration ? 'Registrar Nueva Cancha' :
                   activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
                <p className={`${themeClasses.textSecondary} text-sm`}>
                  {showOwnerRegistration ? 'Completa el formulario para agregar tu cancha' : 'Panel de control para dueños de canchas'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl ${darkMode ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-200 text-gray-700'} hover:scale-110 transition-all duration-300`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className={`${themeClasses.text} font-medium`}>Carlos Mendoza</p>
                  <p className={`${themeClasses.textSecondary} text-sm`}>Dueño</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default JuegazoDashboard;