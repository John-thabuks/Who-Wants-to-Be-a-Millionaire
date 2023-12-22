import './index.css'
import moneyPyramid from "./components/data"
import { useState } from 'react';
import Trivia from "./components/Trivia"

function App() {
  const mPyramid = moneyPyramid.reverse()

  const [questionNumber, setQuestionNumber] = useState(1)
  return (
    <div className="App">
      <div className="main">
      <div className="top">
        <div className="timer">30</div>
      </div>
      <div className="bottom">
        <Trivia />
      </div>
      </div>
      
      <div className="pyramid">
      <ul className="moneyList">
        {mPyramid.map((m) => (
          <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
          <span className="moneyListItemNumber">{m.id}</span>
          <span className="moneyListItemAmount">{m.amount}</span>
        </li>
        ))}
        
      </ul>
      </div>
      
    </div>
  );
}

export default App;
