import { useEffect, useState } from 'react'
import './SaludoSamir.css'

export default function SaludoSamir() {
  const [name] = useState('Samir')
  // Agrega aquí el estado para la frase y el número aleatorio
  const [phrase, setPhrase] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

  // Función para generar una frase aleatoria
  useEffect(() => {
    const fetchPhrases = async () => {
      try{
      const response = await fetch('https://positive-api.online/phrases/esp');
      const data = await response.json();

      setPhrase(data);
      }catch(error){
        console.error('Error fetching phrases:', error);
      }
      finally
      {
        const randomIndex = Math.floor(Math.random() * 40)
        setRandomNumber(randomIndex);
      }
    }
    fetchPhrases();
  }, []);

  return (
    <section className="saludo samir">
      <h2 className="saludo_title">¡Hola, {name}!</h2>
      <p className="saludo_extra">
        ¡Aquí hay un mensaje adicional!
      </p>
      <p>holaaaaaa</p>
      <br></br>
      
      <p className="saludo_phrase">
        {phrase[randomNumber]?.text}
      </p>

      <button onClick={() => setRandomNumber(Math.floor(Math.random() * 40))}>
        Generar frase motivacional
      </button>
    </section>
  )
}