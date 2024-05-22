"use client";

import React from "react";
import Result from "@/components/result";
import ProtectedRoute from "@/components/protectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <Result />
    </ProtectedRoute>
  );
};

export default page;
