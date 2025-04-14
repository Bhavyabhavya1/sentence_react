import React from "react";

const ResultScreen = ({ questions, answers }) => {
  const score = questions.reduce((acc, question, index) => {
    return acc + (question.correctAnswer === answers[index] ? 1 : 0);
  }, 0);

  return (
    <div className="result-screen">
      <h2>Game Over!</h2>
      <div className="results-details">
        <p>You have completed all questions.</p>
        <div className="score-summary">
          <p>
            <strong>Your Score: </strong>
            {score}/{questions.length}
          </p>
        </div>

        <div className="result-questions">
          {questions.map((question, index) => (
            <div key={index} className="result-question">
              <p>
                <strong>{question.question}</strong>
              </p>
              <p>Your answer: {answers[index]}</p>
              <p>Correct answer: {question.correctAnswer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
