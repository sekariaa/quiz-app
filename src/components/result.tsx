"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { getScore } from "../../services/firebase";

const Result = () => {
  const { user } = useAuth();
  const [scoreData, setScoreData] = useState<{
    correct: number;
    incorrect: number;
    score: number;
  } | null>(null);

  useEffect(() => {
    const fetchScore = async () => {
      if (user) {
        const userData = await getScore(user.uid);
        setScoreData(userData);
      }
    };

    fetchScore();
  }, [user]);

  return (
    <div>
      <h1>Result</h1>
      {scoreData && (
        <div>
          <p>Correct: {scoreData.correct}</p>
          <p>Incorrect: {scoreData.incorrect}</p>
          <p>Score: {scoreData.score}</p>
        </div>
      )}
    </div>
  );
};

export default Result;
