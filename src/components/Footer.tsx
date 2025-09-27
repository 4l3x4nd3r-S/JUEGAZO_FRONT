export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="container-edge py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-mutedForeground">
            © {new Date().getFullYear()} Juegazo. Reservas de canchas de fútbol y vóley.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Empresa</h4>
          <ul className="space-y-1 text-sm text-mutedForeground">
            <li>Nosotros</li>
            <li>Blog</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Soporte</h4>
          <ul className="space-y-1 text-sm text-mutedForeground">
            <li>Centro de ayuda</li>
            <li>Términos y privacidad</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Síguenos</h4>
          <ul className="space-y-1 text-sm text-mutedForeground">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
