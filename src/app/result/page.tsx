"use client";

import React from "react";
import Result from "@/_components/result";
import ProtectedRoute from "@/_components/protectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  );
};

export default page;
