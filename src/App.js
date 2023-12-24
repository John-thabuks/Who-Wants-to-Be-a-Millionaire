import "./index.css";
import Data from "./components/data";
import { useEffect, useState } from "react";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const { moneyPyramid, data } = Data();
  const mPyramid = moneyPyramid.reverse();

  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber]);

  return (
    <div className="App">
      {!userName ? (
        <Start setUserName={setUserName} />
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned} </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    {" "}
                    <Timer
                      setStop={setStop}
                      questionNumber={questionNumber}
                    />{" "}
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    setQuestionNumber={setQuestionNumber}
                    questionNumber={questionNumber}
                  />
                </div>
              </>
            )}
          </div>

          <div className="pyramid">
            <ul className="moneyList">
              {mPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
