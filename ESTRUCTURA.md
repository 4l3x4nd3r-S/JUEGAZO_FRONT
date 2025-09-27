# Estructura del Proyecto Juegazo

## 📁 Organización de Carpetas

La nueva estructura del proyecto sigue las mejores prácticas para aplicaciones React escalables:

```
src/
├── components/          # Componentes reutilizables
│   ├── Footer.tsx
│   └── Navbar.tsx
├── contexts/           # Contextos de React
│   └── AuthContext.tsx
├── hooks/              # Hooks personalizados
│   ├── useAuthActions.ts
│   └── useCanchas.ts
├── pages/              # Páginas/Rutas principales
│   ├── Canchas.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── ...
├── router/             # Configuración de rutas
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── services/           # Servicios/API calls
│   ├── authService.ts
│   └── canchasService.ts
├── types/              # Definiciones de tipos TypeScript
│   ├── auth.ts
│   ├── cancha.ts
│   ├── common.ts
│   └── index.ts
└── assets/             # Recursos estáticos
    └── logo_golazo.png
```

## 🔧 Tecnologías y Herramientas

### Core
- **React 18** con TypeScript
- **Vite** como bundler
- **React Router** para navegación
- **Tailwind CSS** para estilos

### Estado y Contexto
- **React Context API** para manejo de estado global (autenticación)
- **Custom Hooks** para lógica reutilizable

### Arquitectura
- **Separación de responsabilidades** clara
- **Tipado fuerte** con TypeScript
- **Estructura escalable** y mantenible

## 📋 Funcionalidades Principales

### ✅ Autenticación
- Sistema completo de login/registro
- Verificación por SMS (simulado)
- Contexto de autenticación global
- Rutas protegidas
- Persistencia en localStorage

### ✅ Gestión de Canchas
- Lista de canchas con filtros
- Búsqueda por zona y tipo
- Reservas con validación de autenticación
- Datos mock para desarrollo

### ✅ UI/UX
- Diseño responsivo
- Tema personalizado con colores de marca
- Componentes reutilizables
- Navegación intuitiva

## 🏗️ Componentes Principales

### AuthContext
Maneja el estado global de autenticación:
- Usuario actual
- Estado de autenticación
- Funciones de login/logout/registro

### AuthService
Servicios de autenticación:
- Login/registro simulado
- Verificación de teléfono
- Manejo de errores y validaciones

### CanchasService
Servicios para gestión de canchas:
- Obtener lista de canchas con filtros
- Crear reservas
- Datos mock para desarrollo

### Custom Hooks
- **useAuthActions**: Lógica de autenticación
- **useCanchas**: Gestión de estado de canchas

## 🎨 Sistema de Diseño

### Colores
```css
Primary: #1a365d (azul oscuro)
Accent: #e53e3e (rojo)
Background: Responsive light/dark
```

### Componentes UI
- Navbar responsive con autenticación
- Footer consistente
- Cards de canchas
- Formularios de autenticación
- Botones y inputs styled

## 🛡️ Tipos TypeScript

### Interfaces Principales
```typescript
// Usuario
interface User {
  id: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  email: string
  phoneNumber: string
  // ...
}

// Cancha
interface Cancha {
  id: string
  nombre: string
  zona: string
  precio: number
  tipoCancha: 'futbol' | 'futsal' | 'basquet' | 'voley' | 'tenis'
  // ...
}

// Filtros
interface CanchaFilter {
  zona?: string
  tipoCancha?: string
  precioMin?: number
  precioMax?: number
  // ...
}
```

## 🚀 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting
```

## 🔄 Estado Actual

### ✅ Completado
- Estructura de carpetas profesional
- Sistema de autenticación completo
- Gestión de canchas con filtros
- Componentes reutilizables
- Tipado TypeScript
- Build exitoso

### 🚧 Próximos Pasos Sugeridos
1. Integración con API real
2. Implementación de pagos
3. Sistema de notificaciones
4. Panel de administración
5. Tests unitarios
6. PWA features

## 📖 Cómo Usar

### Desarrollo
```bash
git clone <repo>
cd juegazo-web
npm install
npm run dev
```

### Autenticación
- Registro: Número de teléfono + datos personales
- Login: Teléfono + contraseña
- Código de verificación: 123456 (mock)

### Canchas
- Navegar a /canchas
- Usar filtros por zona/tipo
- Hacer clic en "Reservar" (requiere login)

La estructura está lista para escalar y permite fácil mantenimiento y testing. 🎯