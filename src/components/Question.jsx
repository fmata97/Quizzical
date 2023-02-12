import React from "react";

export default function Question(props) {

    const { question, correctAnswer, answers, lockedAnswer, selectAnswer, revealAnswers } = props;

    const buttonElements =
        answers ?
            answers.map((answer, index) => {
                let className = `answer-button `;
                if (revealAnswers) {  // quiz submitted
                    if (answer === correctAnswer)
                        className += `correct`;
                    else if (answer === lockedAnswer)
                        className += `wrong transparent`;
                } else {  // still answering the quiz
                    className += `${answer === lockedAnswer ? "selected" : ""}`
                }

                return (
                    <button
                        key={index}
                        className={className}
                        onClick={() => selectAnswer(answer)}
                    >
                        {answers[index]}
                    </button>
                )
            }

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