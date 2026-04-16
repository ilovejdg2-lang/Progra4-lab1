import { useEffect, useState } from 'react'
import './SaludoYeisson.css'

export default function SaludoYeisson() {
  //#1 decaramos todos 
  const [phrase, setPhrase]= useState([]);
  const [randomNumber, setRandomNumber]=useState(0);
  const [name] = useState('Yeisson')

  // #2 Cargamos la prase motivacional al inicia el componente 
  const motivacion = useEffect(() => {
  const fetchPhrase = async () => {
    try {
      const response = await fetch("https://www.positive-api.online/phrases/esp"); 
      const data = await response.json();

      setPhrase(data);
    } catch (error)
    {
      console.error("Error fetching phrase:", error);
    }
    finally
    {
      const randomIndex=Math.floor(Math.random() * 40);
      setRandomNumber(randomIndex);
    }
  }

  fetchPhrase(); 
  },[]); 

  // #3 renderizamos al componente 
  return (
    <div className="saludo yeisson">
      <h2 className="saludo_title">¡Hola, {name}!</h2>
      <p className="saludo_extra">
        ¡Aquí hay un mensaje adicional!
      </p>
      <p>{phrase[randomNumber]?.text}</p>
       <button onClick={()=> setRandomNumber(Math.floor(Math.random()*40))}>NUEVO MENSAJE</button>
    </div>
  )
}


 