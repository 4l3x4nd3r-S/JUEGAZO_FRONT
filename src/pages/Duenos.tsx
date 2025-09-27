import { Link } from 'react-router-dom'
import { Coins, ShieldCheck, TrendingUp } from 'lucide-react'

export default function Duenos() {
  return (
    <main className="container-edge py-10">
      <h1 className="text-2xl font-bold">Dueños de canchas</h1>
      <p className="mt-2 text-mutedForeground">Publica tu cancha en Juegazo y recibe reservas sin complicaciones.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {[
          { icon: TrendingUp, title: 'Más ingresos', body: 'Algoritmo de ocupación y precios inteligentes.' },
          { icon: ShieldCheck, title: 'Pagos seguros', body: 'Liquidaciones semanales y facturación automática.' },
          { icon: Coins, title: 'Comisión justa', body: 'Modelo transparente por reserva confirmada.' },
        ].map((f, i) => (
          <div key={i} className="card p-6">
            <f.icon className="h-5 w-5" />
            <h3 className="mt-2 font-semibold">{f.title}</h3>
            <p className="text-sm text-mutedForeground">{f.body}</p>
          </div>
        ))}
      </div>
      <Link to="/dashboard" className="mt-6 inline-block rounded-xl bg-brand px-6 py-3 font-semibold text-white shadow-soft">
        Abrir panel de dueños
      </Link>
    </main>
  )
}
