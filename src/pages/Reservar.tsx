export default function Reservar() {
  return (
    <main className="container-edge py-10">
      <h1 className="text-2xl font-bold">Reservar</h1>
      <p className="mt-2 text-mutedForeground">Próximamente: calendario con disponibilidad en tiempo real, filtros por tipo de cancha y pagos integrados.</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-semibold">Paso 1: Elige cancha</h2>
          <p className="text-sm text-mutedForeground">Busca por zona, tipo y precio.</p>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold">Paso 2: Selecciona horario</h2>
          <p className="text-sm text-mutedForeground">Bloques de 60/90 minutos, con horarios peak y off-peak.</p>
        </div>
      </div>
    </main>
  )
}
