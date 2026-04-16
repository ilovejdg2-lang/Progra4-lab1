import { useState } from 'react'
import './SaludoSamir.css'

export default function BuscarPoke() {

const [nombre, setNombre] = useState('');
const [pokemon, setPokemon] = useState(null);

const buscarPokemon = async () => {
    try { 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        const data = await response.json();
        setPokemon(data);
    }catch (error) {
        console.error('Error fetching Pokémon:', error);
        setPokemon(null);
    }
    
}

return(
    <div>
        <h2>Buscar Pokémon</h2>
        <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre del Pokémon"
        />
        <button onClick={buscarPokemon}>Buscar</button>
        {pokemon && (
            <div>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>Altura: {pokemon.height}</p>
                <p>Peso: {pokemon.weight}</p>
            </div>
        )}
    </div>
);
}