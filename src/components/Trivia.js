import React, { useEffect, useState } from 'react'
import useSound from "use-sound"
import play from "../../src/sounds/play.mp3"
import correct from "../../src/sounds/correct.mp3"
import wrong from "../../src/sounds/wrong.mp3"


function Trivia({data, setStop, setQuestionNumber, questionNumber}) {

    const [question, setQuestion] = useState(null)
    const [selectedAnswe, setSelectedAnswer] = useState(null)
    const [className, setClassName] = useState("answer")
    const [ letsPlay, { stop: stopPlay }] = useSound(play)
    const [correctAnswer] = useSound(correct)
    const [wrongAnswer] = useSound(wrong)
    

    useEffect(() => {
        // Play sound when the page is refreshed
        letsPlay();
    
        // Cleanup function to stop the sound when the component is unmounted or refreshed
        return () => {
            stopPlay();
        };
    }, [letsPlay, stopPlay]);

    

    function delay(duration, callback){
        setTimeout(() =>{
            callback()            
        }, duration)
    }

    function handleClick(a){
        setSelectedAnswer(a)
        setClassName("answer active")
        delay(3000, ()=>  setClassName(a.correct ? "answer correct" : "answer wrong"))
        delay(5000, ()=>  {
            if(a.correct){
                correctAnswer()
                delay(1000, (()=>{
                    setQuestionNumber((prev) => prev +1)
                    setSelectedAnswer(null)
                }))
            }else{
                wrongAnswer()
                delay(1000, ()=>{
                    setStop(true)
                })
            }
        })
    }

    useEffect(() =>{
        setQuestion(data[questionNumber-1])
    },[data, questionNumber])

    return (
        <div className="trivia">
            <div className="question" >{question && question.question}</div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div className={selectedAnswe ===a ? className : "answer"} 
                    onClick={() => !selectedAnswe && handleClick(a)}>
                            {a.text}
                    </div>                
                ))}
            </div>
        </div>
    )
}

export default Trivia