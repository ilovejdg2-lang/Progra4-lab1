import { useState, useEffect } from 'react'
import './SaludoMarimar.css'

export default function SaludoMarimar() {
  const [phrase, setPhrase] = useState([]);
  const[randomNumber, setRandomNumber] = useState(0);
  const [name] = useState('Marimar');

  const motivacion=useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const response = await fetch('https://www.positive-api.online/phrases/esp');
        const data = await response.json();
        setPhrase(data);
      } catch (error) {
        console.error('Error fetching phrase:', error);
      } 
      finally 
      {
        const randomIndex = Math.floor(Math.random() *40);
        setRandomNumber(randomIndex);
      }
    };

    fetchPhrase();
  },[]);


  return (
    <div>
      <section className="saludo marimar">
        <h2 className="saludo_title">¡Hola, {name}!</h2>
        <p>{phrase[randomNumber]?.text}</p>
       <button onClick={() => setRandomNumber(Math.floor(Math.random() *40))}>Nueva frase</button>
      </section>
    </div>
  )
}