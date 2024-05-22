"use client";
import React from "react";
import Quiz from "@/components/quiz";
import ProtectedRoute from "@/components/protectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <Quiz />
    </ProtectedRoute>
  );
};

export default page;
