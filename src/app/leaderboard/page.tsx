"use client"
import React from "react";
import Leaderboard from "@/_components/leaderboard";
import ProtectedRoute from "@/_components/protectedRoute";

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    </div>
  );
};

export default page;
