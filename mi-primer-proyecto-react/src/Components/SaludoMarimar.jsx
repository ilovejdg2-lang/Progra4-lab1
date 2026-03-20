import { useState } from 'react'
import './SaludoMarimar.css'

export default function SaludoMarimar() {
  const [name] = useState('Marimar')

  return (
    <section className="saludo marimar">
      <h2 className="saludo_title">¡Hola, {name}!</h2>
      <p className="saludo_extra">
        ¡Aquí hay un mensaje adicional!
      </p>
    </section>
  )
}