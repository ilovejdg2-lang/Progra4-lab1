import { useState } from 'react'
import './SaludoSamir.css'

export default function SaludoSamir() {
  const [name] = useState('Samir')

  return (
    <section className="saludo samir">
      <h2 className="saludo_title">¡Hola, {name}!</h2>
      <p className="saludo_extra">
        ¡Aquí hay un mensaje adicional!
      </p>
    </section>
  )
}