import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./Quiz.css";

const API_KEY = import.meta.env.VITE_JSONBIN_ACCESS_KEY;
const URL = "https://api.jsonbin.io/v3/b/69dc6e2faaba882197f1c968";
const LETTERS = ["A", "B", "C", "D"];

export default function Quiz() {
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pregunta = preguntas[current];
  const total = preguntas.length;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(URL, { headers: { "X-Access-Key": API_KEY } });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setPreguntas(data.record);
      } catch (err) {
        console.error("Error al obtener los datos del cuestionario:", err);
        setError("No se pudieron cargar las preguntas. Verifica tu API key.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerClick = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === pregunta.correct_answer) {
      setScore((s) => s + 1);
      setShowConfetti(true);
    }
  };

  const handleNext = () => {
    setShowConfetti(false);
    if (current + 1 >= total) {
      setShowScore(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  if (loading) {
    return (
      <div className="mq-loading">
        <div className="mq-loading-text">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mq-loading">
        <div className="mq-loading-text">{error}</div>
      </div>
    );
  }

  if (!pregunta && !showScore) return null;

  const pct = Math.round((score / total) * 100);

  return (
    <div className="mq-root">
      {showConfetti && <Confetti />}

      <div className="mq-container">
        <div className="mq-header">
          <div className="mq-badge">QUIZ</div>
          <div className="mq-title">Manhwa Quiz</div>
          <div className="mq-subtitle">Pon a prueba tu conocimiento</div>
        </div>

        {!showScore && (
          <>
            <div className="mq-progress">
              <div className="mq-progress-header">
                <span>{current + 1} / {total}</span>
              </div>
              <div className="mq-progress-bar">
                <div
                  className="mq-progress-fill"
                  style={{ width: `${((current + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <div className="mq-card">
              <div className="mq-card-banner">
                <span className="mq-roman">QUIZ</span>
              </div>

              <div className="mq-card-body">
                {pregunta.image && (
                  <div className="mq-img-wrap">
                    <img className="mq-img" src={pregunta.image} alt="pregunta" />
                    <div className="mq-img-overlay" />
                  </div>
                )}

                <div className="mq-question">{pregunta.question}</div>

                <div className="mq-options">
                  {pregunta.options.map((option, index) => (
                    <button
                      key={index}
                      className={
                        selected === null
                          ? "mq-option"
                          : index === pregunta.correct_answer
                          ? "mq-option mq-correct"
                          : index === selected
                          ? "mq-option mq-wrong"
                          : "mq-option mq-dimmed"
                      }
                      disabled={selected !== null}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <span className="mq-option-letter">{LETTERS[index]}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {selected !== null && (
                  <>
                    <div className="mq-explanation">
                      <div className="mq-exp-header">
                        <div className="mq-exp-icon">!</div>
                        <div className="mq-exp-title">Explicación</div>
                      </div>
                      <div className="mq-exp-body">
                        <div
                          className={`mq-result-badge ${
                            selected === pregunta.correct_answer
                              ? "mq-badge-correct"
                              : "mq-badge-wrong"
                          }`}
                        >
                          {selected === pregunta.correct_answer ? "Correcto" : "Incorrecto"}
                        </div>
                        <p>{pregunta.explanation ?? "Sin explicación disponible"}</p>
                      </div>
                    </div>

                    <button className="mq-next" onClick={handleNext}>
                      {current + 1 === total ? "Ver resultado" : "Siguiente"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {showScore && (
          <div className="mq-score-panel">
            <div className="mq-score-top">
              <div className="mq-score-label">Resultado Final</div>
              <div className="mq-score-num">{score}</div>
              <div className="mq-score-max">de {total}</div>
            </div>

            <div className="mq-score-body">
              <div className="mq-stats">
                <div className="mq-stat">
                  <span className="mq-stat-val">{score}</span>
                  <span className="mq-stat-lbl">Correctas</span>
                </div>
                <div className="mq-stat">
                  <span className="mq-stat-val">{total - score}</span>
                  <span className="mq-stat-lbl">Incorrectas</span>
                </div>
                <div className="mq-stat">
                  <span className="mq-stat-val">{pct}%</span>
                  <span className="mq-stat-lbl">Precisión</span>
                </div>
              </div>

              <button className="mq-restart" onClick={() => window.location.reload()}>
                Reiniciar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}