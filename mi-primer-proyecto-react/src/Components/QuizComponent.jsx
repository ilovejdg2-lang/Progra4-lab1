import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./QuizComponent.css";

export default function QuizComponent() {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [validada, setValidada] = useState(false);
  const [mostrarConfetti, setMostrarConfetti] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const masterKey = import.meta.env.VITE_JSONBIN_MASTER_KEY;
  useEffect(() => {
    const headers = new Headers();

    if (masterKey) {
      headers.set("X-Master-Key", masterKey);
    }

    const fetchQuiz = async () => {
      try {
        setCargando(true);

        if (!masterKey) {
          throw new Error("Falta VITE_JSONBIN_MASTER_KEY en el archivo .env");
        }

        const response = await fetch(
          "https://api.jsonbin.io/v3/b/69dd50d8856a6821892ddcc4",
          { headers }
        );

        const data = await response.json();

        const preguntasRecibidas = Array.isArray(data.record)
          ? data.record
          : data.record.preguntas;

        setPreguntas(preguntasRecibidas);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("No se pudieron cargar las preguntas.");
      } finally {
        setCargando(false);
      }
    };

    fetchQuiz();
  }, []);

  const pregunta = preguntas[preguntaActual];
  const progreso =
    preguntas.length > 0 ? ((preguntaActual + 1) / preguntas.length) * 100 : 0;

  const seleccionarRespuesta = (index) => {
    if (validada) return;
    setRespuestaSeleccionada(index);
  };

  const validarRespuesta = () => {
    if (respuestaSeleccionada === null) return;

    setValidada(true);

    if (respuestaSeleccionada === pregunta.correctAnswer) {
      setPuntaje((prev) => prev + 1);
      setMostrarConfetti(true);

      setTimeout(() => {
        setMostrarConfetti(false);
      }, 10000);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual((prev) => prev + 1);
      setRespuestaSeleccionada(null);
      setValidada(false);
      setMostrarConfetti(false);
    } else {
      setPreguntaActual((prev) => prev + 1);
    }
  };

  const reiniciarQuiz = () => {
    setPreguntaActual(0);
    setRespuestaSeleccionada(null);
    setValidada(false);
    setMostrarConfetti(false);
    setPuntaje(0);
  };

  if (cargando) {
    return (
      <div className="quiz-page">
        <div className="quiz-shell">
          <div className="quiz-card">
            <h2 className="quiz-title">Cargando preguntas...</h2>
            <p className="quiz-text">
              Preparando el quiz de biología.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-page">
        <div className="quiz-shell">
          <div className="quiz-card">
            <h2 className="quiz-title">Error</h2>
            <p className="quiz-text">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!pregunta) {
    return (
      <div className="quiz-page">
        <div className="quiz-shell">
          <div className="quiz-card quiz-finish">
            <div className="quiz-icon">🧬</div>
            <h2 className="quiz-title">Quiz completado</h2>
            <p className="quiz-final-score">
              Puntaje final: {puntaje} / {preguntas.length}
            </p>
            <div className="quiz-finish-image-wrapper">
                <img
                className="quiz-finish-image"
                src="https://tse3.mm.bing.net/th/id/OIP.g7MOo8KtMcoMZTVg527eyQHaIV?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Celebración de biología"
                />
            </div>

            <button className="quiz-primary-button" onClick={reiniciarQuiz}>
              Reiniciar quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      {mostrarConfetti && <Confetti recycle={false} numberOfPieces={220} />}

      <div className="quiz-shell">
        <div className="quiz-side-panel">
          <div className="quiz-side-card">
            <div className="quiz-side-icon">🌿</div>
            <h2>Biología</h2>
            <p>
              ¿A que no es bonita?
            </p>
          </div>

          <div className="quiz-side-card">
            <h3>Progreso</h3>
            <p>
              Pregunta <strong>{preguntaActual + 1}</strong> de{" "}
              <strong>{preguntas.length}</strong>
            </p>
            <p>
              Puntaje actual: <strong>{puntaje}</strong>
            </p>
          </div>
        </div>

        <div className="quiz-card">
          <div className="quiz-topbar">
            <div>
              <p className="quiz-kicker">Charles Darwin's test</p>
              <h1 className="quiz-title">Quiz de Biología</h1>
              <p className="quiz-subtitle">
                Selecciona una sola opción.
              </p>
            </div>

            <div className="quiz-badge">Puntaje: {puntaje}</div>
          </div>

          <div className="quiz-progress">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progreso}%` }}
            />
          </div>

          <div className="quiz-meta">
            <span>Pregunta {preguntaActual + 1}</span>
            <span>{preguntas.length} en total</span>
          </div>

          <div className="quiz-question-box">
            <div className="quiz-question-icon">🔬</div>
            <p className="quiz-question">{pregunta.question}</p>
          </div>

          <div className="quiz-answers">
            {pregunta.answers.map((respuesta, index) => {
              let className = "quiz-answer-button";

              if (!validada && index === respuestaSeleccionada) {
                className += " selected";
              }

              if (validada) {
                if (index === pregunta.correctAnswer) {
                  className += " correct";
                } else if (
                  index === respuestaSeleccionada &&
                  respuestaSeleccionada !== pregunta.correctAnswer
                ) {
                  className += " wrong";
                } else {
                  className += " disabled-look";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => seleccionarRespuesta(index)}
                  disabled={validada}
                  className={className}
                >
                  <span className="quiz-answer-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="quiz-answer-text">{respuesta}</span>
                </button>
              );
            })}
          </div>

          {validada && (
            <div
              className={
                respuestaSeleccionada === pregunta.correctAnswer
                  ? "quiz-feedback success"
                  : "quiz-feedback error"
              }
            >
              {respuestaSeleccionada === pregunta.correctAnswer
                ? "¡Respuesta correcta! Excelente observación biológica."
                : `Respuesta incorrecta. La correcta es: ${
                    pregunta.answers[pregunta.correctAnswer]
                  }`}
            </div>
          )}

          <div className="quiz-actions">
            {!validada ? (
              <button
                className="quiz-primary-button"
                onClick={validarRespuesta}
                disabled={respuestaSeleccionada === null}
              >
                Validar respuesta
              </button>
            ) : (
              <button className="quiz-primary-button" onClick={siguientePregunta}>
                {preguntaActual === preguntas.length - 1
                  ? "Ver resultado"
                  : "Siguiente pregunta"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}