"use client";

import React from "react";
import ProtectedRoute from "../components/protectedRoute";
import { useAuth } from "../../context/auth";
import HomePage from "@/components/homePage";
const Page = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <HomePage user={user} />
    </ProtectedRoute>
  );
};

export default Page;
