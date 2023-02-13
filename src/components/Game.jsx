import React, { useEffect, useState } from "react";
import blob_medium_yellow from "../assets/blob-medium-yellow.svg"
import blob_small_blue from "../assets/blob-small-blue.svg"
import Question from "./Question";
import { nanoid } from "nanoid"
import { decode } from "html-entities"

export default function Game() {
    const [questionsData, setQuestionsData] = useState([]);
    const [lockedAnswers, setLockedAnswers] = useState(["", "", "", "", ""]);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    // fetch new questions
    useEffect(() => {
        if (!quizSubmitted)  // means user is playing a new quiz
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then(res => res.json())
                .then(questionsData => {
                    const decodedQuestionsData = questionsData.results.map(question => {
                        return {
                            ...question,
                            question: decode(question.question),
                            correct_answer: decode(question.correct_answer),
                            incorrect_answers: question.incorrect_answers.map(answer =>
                                decode(answer)
                            )
                        }
                    })
                    setQuestionsData(decodedQuestionsData)
                    console.log(decodedQuestionsData);
                });
    }, [quizSubmitted]);

    // shuffle the answers everytime mew questions are fetched
    useEffect(() => {
        let newArray = [];
        questionsData.forEach(question => {
            newArray.push(
                [
                    question.correct_answer,
                    ...question.incorrect_answers
                ].sort(() => Math.random() - 0.5)
            )
        })

        setShuffledAnswers(newArray);
    }, [questionsData])


    const questionsElements = questionsData.map((question, index) => {
        return <Question
            key={nanoid()}
            question={question.question}
            correctAnswer={question.correct_answer}
            answers={shuffledAnswers[index]}
            selectAnswer={(answer) => lock_answer(index, answer)}
            lockedAnswer={lockedAnswers[index]}
            revealAnswers={quizSubmitted}
        />
    })

    function lock_answer(index, newAnswer) {
        if (!quizSubmitted)
            setLockedAnswers(oldAnswers => oldAnswers.map((answer, i) => {
                return i === index ? newAnswer : answer;
            }))
    }

    function checkAnswers() {
        if (quizSubmitted) { // generate a new quiz 
            setQuizSubmitted(false);
            setLockedAnswers(["", "", "", "", ""]);
            setCorrectAnswers(0);
        } else {  // check answers
            // Check if any question hasn't been answered
            if (lockedAnswers.some(answer => answer === "")) {
                alert("You need to answer all questions!");
                return;
            }

            let count = 0;
            questionsData.forEach((question, index) => {
                if (question.correct_answer === lockedAnswers[index])
                    count++;
            })
            setCorrectAnswers(count);
            setQuizSubmitted(true);
        }

    }


    return (
        <div className="Game fade-in">
            <div className="Game-main">
                {questionsElements}
                <div className="button-section">
                    {quizSubmitted && <h2>You scored {correctAnswers}/5 correct answers</h2>}
                    <button className="Game-button" onClick={checkAnswers}>
                        {quizSubmitted ? "Play again" : "Check answers"}
                    </button>
                </div>
            </div>

            <img className="blob blob-medium-yellow" src={blob_medium_yellow} />
            <img className="blob blob-small-blue" src={blob_small_blue} />
        </div>
    )
}