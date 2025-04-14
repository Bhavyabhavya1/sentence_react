import React, { useEffect, useState } from "react";
import Question from "./Question";
import ResultScreen from "./ResultScreen";
import data from "./data/sample.json"; 
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [blanks, setBlanks] = useState([]); 
  const [timer, setTimer] = useState(60); 
  const [showResult, setShowResult] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setShowResult(true); 
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    setQuestions(data.data.questions);
  }, []);

  
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentIndex];
      const initialBlanks = new Array(
        (currentQuestion.question.match(/___________/g) || []).length
      ).fill(null); 
      setBlanks(initialBlanks);

    
      const initialAnswers = new Array(initialBlanks.length).fill(null);
      setUserAnswers(initialAnswers);
    }
  }, [currentIndex, questions]);

  
  const handleBlankClick = (index) => {
    console.log(`Blank ${index} clicked`);
  };

  
  const handleOptionClick = (option) => {
    const updatedBlanks = [...blanks];
    const updatedAnswers = [...userAnswers];

    
    const firstEmptyBlankIndex = updatedBlanks.indexOf(null);
    if (firstEmptyBlankIndex !== -1) {
      updatedBlanks[firstEmptyBlankIndex] = option;
      updatedAnswers[firstEmptyBlankIndex] = option;
      setBlanks(updatedBlanks);
      setUserAnswers(updatedAnswers);
    }
  };

  
  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  
  const allBlanksFilled = blanks.every(blank => blank !== null);

  return (
    <div className="app">
      <h1>Sentence Construction</h1>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : showResult ? (
        <ResultScreen questions={questions} answers={userAnswers} />
      ) : (
        <Question
          questionData={questions[currentIndex]}
          index={currentIndex}
          blanks={blanks}
          onBlankClick={handleBlankClick}
          onOptionClick={handleOptionClick}
          onNext={handleNext}
          timer={timer}
        />
      )}
      <button
        disabled={!allBlanksFilled} 
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default App;
