/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta Juegazo
        primary: {
          DEFAULT: '#7CB342', // Verde Primario
          dark: '#689F38',     // Verde Primario Oscuro
          light: '#8BC34A',    // Verde Primario Claro (modo oscuro)
        },
        secondary: '#FF9800',  // Naranja Secundario
        accent: '#E91E63',     // Rosa Acento
        success: '#4CAF50',    // Verde Éxito
        warning: '#FF9800',    // Naranja Advertencia
        error: '#F44336',      // Rojo Error
        whatsapp: '#25D366',   // Verde WhatsApp oficial
        
        // Tema claro
        light: {
          background: '#FFFFFF',
          surface: '#F5F5F5',   // Gris Claro
          text: {
            primary: '#1A1A1A',
            secondary: '#616161',
          }
        },
        
        // Tema oscuro
        dark: {
          background: '#1A1A1A', // Fondo Oscuro
          surface: '#2D2D2D',    // Superficie Oscura
          text: {
            primary: '#FFFFFF',
            secondary: '#616161',  // Gris Oscuro
          }
        },
        
        // Variables CSS existentes (mantener compatibilidad)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        cardForeground: 'hsl(var(--card-foreground))',
        muted: 'hsl(var(--muted))',
        mutedForeground: 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        
        // Mantener brand para compatibilidad hacia atrás
        brand: {
          DEFAULT: '#7CB342',
          600: '#689F38',
          700: '#689F38',
          800: '#689F38',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,.08)'
      },
      maxWidth: {
        '8xl': '96rem'
      }
    }
  },
  plugins: []
}
