import Quiz from "./Components/Quiz";
import "./index.css";

export default function App() {
  return (
    <div className="mq-root">
        <div className="mq-speed-lines"></div>
      <div className="mq-container">
        <Quiz />
      </div>
    </div>
  );
}