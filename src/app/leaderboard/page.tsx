"use client";
import React from "react";
import Leaderboard from "@/components/leaderboard";
import ProtectedRoute from "@/components/protectedRoute";

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
