import { useEffect, useMemo, useState } from 'react';
import './app.css'
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import Start from './components/Start';

function App({data}) {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  const moneyPyramid = useMemo(() =>
      [
        { id: 1, ammount: "$ 100" },
        { id: 2, ammount: "$ 200" },
        { id: 3, ammount: "$ 300" },
        { id: 4, ammount: "$ 500" },
        { id: 5, ammount: "$ 1000" },
        { id: 6, ammount: "$ 2000" },
        { id: 7, ammount: "$ 4000" },
        { id: 8, ammount: "$ 8000" },
        { id: 9, ammount: "$ 16000" },
        { id: 10, ammount: "$ 32000" },
        { id: 11, ammount: "$ 64000" },
        { id: 12, ammount: "$ 125000" },
        { id: 13, ammount: "$ 250000" },
        { id: 14, ammount: "$ 500000" },
        { id: 15, ammount: "$ 1000000" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 && setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).ammount);
  }, [moneyPyramid, questionNumber])

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? <h1 className='endText'>You Earned: {earned}</h1> : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber}/>
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </div>

          {/* Pyramid  */}
          <div className="pyramid">
            <ul className="monyList">
              {moneyPyramid.map((m) => (
                <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmmount">{m.ammount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername}/>
      )}
    </div>
  );
}

export default App;
