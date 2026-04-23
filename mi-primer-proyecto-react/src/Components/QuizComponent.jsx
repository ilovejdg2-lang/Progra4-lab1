import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "../index.css";
const key = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const URL = "https://api.jsonbin.io/v3/b/69e06d8136566621a8bb4e7f";

export default function Quiz() {
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  const pregunta = preguntas[current];
  const total = preguntas.length;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(URL, {
          headers: { "X-Master-Key": key }
        });
        const data = await response.json();
        setPreguntas(data.record);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerClick = (index) => {
    if (selected !== null) return;

    setSelected(index);

    if (index === pregunta.correctAnswer) {
      setScore(score + 1);
      setShowConfetti(true);
    }
  };

  const handleNext = () => {
    setShowConfetti(false);

    if (current + 1 >= total) {
      setShowScore(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="quiz-container">
      {showConfetti && <Confetti />}

      {!showScore ? (
        <>
          <h2>{pregunta.question}</h2>

          <div>
            {pregunta.answers.map((option, index) => {
              let className = "option";

              if (selected !== null) {
                if (index === pregunta.correctAnswer) {
                  className = "option correct";
                } else if (index === selected) {
                  className = "option wrong";
                }
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selected !== null}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <button className="next-btn" onClick={handleNext}>
              {current + 1 === total ? "Ver resultado" : "Siguiente"}
            </button>
          )}
        </>
      ) : (
        <div className="result">
          <h2>Resultado Final</h2>
          <p>{score} de {total} correctas</p>

          <button onClick={() => window.location.reload()}>
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
}