import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./QuizFati.css";

export default function QuizFati() {
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const key = import.meta.env.VITE_JSONBIN_MASTER_KEY;
  
  
    useEffect(() => {
    const fetchQuiz = async () => {
      const headers = new Headers();
      headers.append(
        "X-Master-Key", key

      );

      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/69e06e3a856a6821893c5818",
          { headers }
        );
        const data = await response.json();
        setPreguntas(data.record);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuiz();
  }, [key]);

  if (preguntas.length === 0) return <p>Cargando...</p>;

  const preguntaActual = preguntas[current];

  const handleAnswerClick = (index) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === preguntaActual.correctAnswer) {
      setIsCorrect(true);
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 2000);
    } else {
      setIsCorrect(false);
    }
  };

  const siguientePregunta = () => {
    setCurrent(current + 1);
    setSelected(null);
    setIsCorrect(null);
  };

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="container">
        <h2 className="title">{preguntaActual.question}</h2>

        {preguntaActual.answers.map((option, index) => {
          let className = "button";

          if (selected !== null) {
            if (index === preguntaActual.correctAnswer) {
              className += " correct";
            } else if (index === selected) {
              className += " incorrect";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={className}
            >
              {option}
            </button>
          );
        })}

        {isCorrect === true && (
          <p className="message">Respuesta correcta</p>
        )}
        {isCorrect === false && (
          <p className="message">Respuesta incorrecta</p>
        )}

        {selected !== null && current < preguntas.length - 1 && (
          <button className="nextButton" onClick={siguientePregunta}>
            Siguiente
          </button>
        )}

        {current === preguntas.length - 1 && selected !== null && (
          <h3>Has terminado el quiz</h3>
        )}
      </div>
    </>
  );
}