import React, { useEffect, useState } from "react";
import blob_medium_yellow from "../assets/blob-medium-yellow.svg"
import blob_small_blue from "../assets/blob-small-blue.svg"
import Question from "./Question";
import { nanoid } from "nanoid"
import { decode } from "html-entities"

export default function Game() {
    const [questionsData, setQuestionsData] = useState([]);
    const [lockedAnswers, setLockedAnswers] = useState(["", "", "", "", ""]);
    const [shuffledAnswers, setShuffledAnswers] = useState([])

    // fetch new questions
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(questionsData => {
                setQuestionsData(questionsData.results)
                console.log(questionsData.results);
            });
    }, []);

    // shuffle the answers everytime mew questions are fetched
    useEffect(() => {
        let newArray = [];
        questionsData.forEach(question => {
            newArray.push(
                [
                    decode(question.correct_answer),
                    ...question.incorrect_answers.map(answer => decode(answer))
                ].sort(() => Math.random() - 0.5)
            )
        })

        setShuffledAnswers(newArray);
    }, [questionsData])


    const questionsElements = questionsData.map((question, index) => {
        return <Question
            key={nanoid()}
            question={decode(question.question)}
            answers={shuffledAnswers[index]}
            selectAnswer={(answer) => lock_answer(index, answer)}
            lockedAnswer={lockedAnswers[index]}
        />
    })

    function lock_answer(index, newAnswer) {
        console.log(index, newAnswer);
        setLockedAnswers(oldAnswers => oldAnswers.map((answer, i) => {
            return i === index ? newAnswer : answer;
        }))
    }

    console.log(lockedAnswers);


    return (
        <div className="Game">
            <div className="Game-main">
                {questionsElements}
                <button className="Game-button">Check answers</button>
            </div>

            {/* <img className="blob blob-medium-yellow" src={blob_medium_yellow} />
            <img className="blob blob-small-blue" src={blob_small_blue} /> */}
        </div>
    )
}