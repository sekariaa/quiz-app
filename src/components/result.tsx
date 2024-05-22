import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { getScore } from "../../services/firebase";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CircularProgress from "@mui/material/CircularProgress";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Result = () => {
  const { user } = useAuth();
  const [scoreData, setScoreData] = useState<{
    correct: number;
    incorrect: number;
    score: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      if (user) {
        setIsLoading(true);
        const userData = await getScore(user.uid);
        setScoreData(userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Failed to fetch result data.");
      }
    };

    fetchScore();
  }, [user]);

  return (
    <div className="bg-secondary min-h-screen px-6 py-6 ">
      <div className="max-w-[1640px] mx-auto">
        <Link href="/" passHref>
          <button className="text-primary">
            <ArrowBackIosIcon />
            Back
          </button>
        </Link>
        <h1 className="text-center text-lg text-primary font-bold pb-2">
          Quiz Result
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress style={{ color: "#21888E" }} />
        </div>
      ) : (
        scoreData && (
          <div className="bg-light rounded-3xl p-5 flex-col mx-auto space-y-3 md:w-1/3 xl:w-1/6 shadow-2xl">
            <div className="text-center">
              <p className="text-gray-900">Score</p>
              <p className="font-bold text-5xl text-primary">
                {scoreData.score}
              </p>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <div className="outline outline-1 outline-primary rounded-xl p-2 w-1/2">
                <p className="text-xs text-gray-900 text-center">Correct</p>
                <p className="font-bold text-center text-gray-900">
                  {scoreData.correct}
                </p>
              </div>
              <div className="outline outline-1 outline-primary rounded-xl p-2 w-50 w-1/2">
                <p className="text-xs text-gray-900 text-center">Incorrect</p>
                <p className="font-bold text-center text-gray-900">
                  {scoreData.incorrect}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link href="quiz" passHref>
                <div className="flex justify-between space-x-2 outline outline-1 rounded-full py-1 px-2 text-primary hover:font-bold">
                  <button>Restart Quiz</button>
                  <RestartAltIcon />
                </div>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Result;
