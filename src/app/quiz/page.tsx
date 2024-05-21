"use client";
import React from "react";
import Quiz from "@/_components/quiz";
import ProtectedRoute from "@/_components/protectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
        <Quiz />
    </ProtectedRoute>
  );
};

export default page;
