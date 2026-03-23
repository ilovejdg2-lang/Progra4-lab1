import { useState } from 'react'
import './SaludoFati.css'

export default function SaludoFati() {
  const [name] = useState('Fáti')

  return (
    <section className="saludo fati">
      <h2 className="saludo_title">¡Hola, {name}!</h2>
      <p className="saludo_extra">
        ¡Aquí hay un mensaje adicional!
      </p>
    </section>
  )
}