import React from "react";

export default function Question({ question, answers, lockedAnswer, selectAnswer }) {

    const buttonElements =
        answers ?
            answers.map((answer, index) =>
                <button
                    key={index}
                    className={`answer-button ${answer === lockedAnswer ? "selected" : ""}`}
                    onClick={() => selectAnswer(answer)}
                >
                    {answers[index]}
                </button>

            )
            : <h2>Loading...</h2>

    return (
        <div className="Question">
            <h2>{question}</h2>
            {buttonElements}
            <hr />
        </div>
    )
}