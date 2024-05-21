import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../../utils/api";
import { useRouter } from "next/navigation";
import { SaveScore } from "../../services/firebase";
import { useAuth } from "../../context/auth";

const decodeEntities = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  user_answer?: string;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>(
    () => {
      const storedAnswers = JSON.parse(
        localStorage.getItem("quizAnswers") || "{}"
      );
      return storedAnswers;
    }
  );
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const storedQuestions = localStorage.getItem("quizQuestions");
        if (storedQuestions) {
          setQuestions(JSON.parse(storedQuestions));
        } else {
          const data = await fetchQuestions();
          const decodedData = data.map((question: Question) => ({
            ...question,
            question: decodeEntities(question.question),
            correct_answer: decodeEntities(question.correct_answer),
            incorrect_answers: question.incorrect_answers.map((answer) =>
              decodeEntities(answer)
            ),
          }));
          localStorage.setItem("quizQuestions", JSON.stringify(decodedData));
          setQuestions(decodedData);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuizQuestions();
  }, []);

  useEffect(() => {
    const endTime = localStorage.getItem("quizEndTime");
    if (!endTime) {
      const newEndTime = new Date().getTime() + 60 * 1000;
      localStorage.setItem("quizEndTime", newEndTime.toString());
      setTimeRemaining(60);
    } else {
      const remainingTime = Math.floor(
        (parseInt(endTime) - new Date().getTime()) / 1000
      );
      setTimeRemaining(remainingTime > 0 ? remainingTime : 0);
    }

    const timer = setInterval(() => {
      const updatedRemainingTime = Math.floor(
        (parseInt(localStorage.getItem("quizEndTime") || "0") -
          new Date().getTime()) /
          1000
      );
      if (updatedRemainingTime <= 0 && !submitted) {
        clearInterval(timer);
        submitQuiz();
      } else {
        setTimeRemaining(updatedRemainingTime);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const submitQuiz = () => {
    if (submitted) return;
    setSubmitted(true);

    const updatedScore = questions.reduce(
      (acc, question, index) => {
        if (userAnswers[index] === question.correct_answer) {
          return { ...acc, correct: acc.correct + 1 };
        } else {
          return { ...acc, incorrect: acc.incorrect + 1 };
        }
      },
      { correct: 0, incorrect: 0 }
    );

    setScore(updatedScore);
    console.log("benar", updatedScore.correct);
    console.log("salah", updatedScore.incorrect);
    SaveScore(user.uid, updatedScore.correct, updatedScore.incorrect);
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("quizEndTime");
    router.push("/result");
  };

  const handleAnswer = (selectedAnswer: string) => {
    const updatedAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: selectedAnswer,
    };
    setUserAnswers(updatedAnswers);
    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure about submitting your answers?")) {
      submitQuiz();
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Quiz</h1>
      <p>
        Time Remaining: {Math.floor(timeRemaining / 60)}:
        {timeRemaining % 60 < 10
          ? `0${timeRemaining % 60}`
          : timeRemaining % 60}
      </p>
      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <div>
        <h3>{currentQuestion.question}</h3>
        <ul>
          {currentQuestion.incorrect_answers.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <label>
                <input
                  type="radio"
                  name="answers"
                  value={answer}
                  onChange={() => handleAnswer(answer)}
                  checked={userAnswers[currentQuestionIndex] === answer}
                />
                {answer}
              </label>
            </li>
          ))}
          <li>
            <label>
              <input
                type="radio"
                name="answers"
                value={currentQuestion.correct_answer}
                onChange={() => handleAnswer(currentQuestion.correct_answer)}
                checked={
                  userAnswers[currentQuestionIndex] ===
                  currentQuestion.correct_answer
                }
              />
              {currentQuestion.correct_answer}
            </label>
          </li>
        </ul>
      </div>
      <button
        onClick={handlePreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>
      <button
        onClick={handleNextQuestion}
        disabled={currentQuestionIndex === questions.length - 1}
      >
        Next
      </button>
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default Quiz;
