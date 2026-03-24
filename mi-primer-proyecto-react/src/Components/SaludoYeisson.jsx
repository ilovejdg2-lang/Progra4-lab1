import { useState } from 'react'
import './SaludoYeisson.css'

export default function SaludoYeisson() {
  const [name] = useState('Yeisson')

  return (
    <section className="saludo yeisson">
      <h2 className="saludo_title">¡Hola, {name}!</h2>
      <p className="saludo_extra">
        ¡Aquí hay un mensaje adicional!
      </p>
    </section>
  )
}