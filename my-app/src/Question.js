import React from "react";

const Question = ({
  questionData,
  index,
  blanks,
  onBlankClick,
  onOptionClick,
  onNext,
  timer,
}) => {
  if (!questionData || !questionData.question || !Array.isArray(questionData.options)) {
    return <div>Loading question...</div>;
  }

  const blankCount = (questionData.question.match(/___________/g) || []).length;

  return (
    <div className="question-box">
      <p>
        <strong>Question {index + 1}:</strong>
      </p>

      <p className="sentence">
        {questionData.question.split("___________").map((chunk, i) => (
          <span key={i}>
            {chunk}
            {i < blankCount && (
              <span
                className="blank"
                onClick={() => onBlankClick(i)}
                aria-label={`Fill in blank ${i + 1}`}
              >
                {blanks[i] || "______"}
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="options">
        {questionData.options.map((opt, i) => (
          <button
            key={i}
            disabled={blanks.includes(opt)}
            onClick={() => onOptionClick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="footer">
        <span>Time:{String(timer).padStart(2, "0")}s</span>
      </div>
    </div>
  );
};

export default Question;
