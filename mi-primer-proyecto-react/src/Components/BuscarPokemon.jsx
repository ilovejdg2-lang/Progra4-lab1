import { useState } from 'react'
import './BuscarPokemon.css'

export default function BuscarPokemon() {
  const [pokemon, setPokemon] = useState(null)
  const [nombre, setNombre] = useState('')

  const buscarPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
      const data = await response.json()
      setPokemon(data)
    } catch (error) {
      console.error('Error buscando Pokémon:', error)
      setPokemon(null)
    }
  }

  return (
    <div className="buscar-container">
      <h2>Buscar Pokémon</h2>
      <input
        type="text"
        placeholder="Ingresa el nombre del Pokémon"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && buscarPokemon()}
      />
      <button onClick={buscarPokemon}>Buscar</button>

      {pokemon && (
        <div className="buscar-resultado">
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
      )}
    </div>
  )
}