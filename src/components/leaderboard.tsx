"use client";

import React, { useEffect, useState } from "react";
import { getAllScores } from "../../services/firebase";

interface UserScore {
  username: string;
  score: number;
}

const Leaderboard = () => {
  const [topScores, setTopScores] = useState<UserScore[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allScores = await getAllScores();
      if (allScores) {
        const sortedScores = allScores.sort((a, b) => b.score - a.score);
        const topFive = sortedScores.slice(0, 5);
        setTopScores(topFive);
      } else {
        console.log("Failed to fetch leaderboard data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-xs">Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {topScores.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
