import { useEffect, useState } from "react"
import Confetti from "react-confetti";
export default function QuizFati () {

const[preguntas, setPreguntas] = useState([]);
const [showConfetti, setShowConfetti] = useState(false);

useEffect(() => {
     const fetchQuiz = async () => {
        const headers = new Headers()
        headers.append("X-Master-Key", "$2a$10$7swchPsJYMSSQMDfFVT0UOpaUhiqntDIG4346OJk9Gc4EelN/bzuS"); // Error muy garve de seguridad
        
        try {
            const response = await fetch("https://api.jsonbin.io/v3/b/69e06e3a856a6821893c5818", { headers });
            const data = await response.json();
            setPreguntas(data.record);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
     };
     fetchQuiz();
}, []);

const handleAnswerClick = (index) => {
    if (preguntas[0]?.correctAnswer === index) { // Suponiendo que la respuesta correcta es la primera opción
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 3000); // El confeti desaparecerá después de 3 segundos
    }
};

return (
    <>
            {showConfetti && <Confetti />}
            <div>
                <h2>Quiz Component</h2>
                {preguntas[0]?.question}

                <div>
                    {preguntas[0]?.answers.map((option, index) => (
                        <button key={index} onClick={() => handleAnswerClick(index)}>
                            {option}
                        </button>
                    ))}
                </div>
            
            </div>
    </>
    
)       
};