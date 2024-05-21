"use client";

import React, { useState } from "react";
import { SignIn, GetSignInErrorMessage } from "../../../../services/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);

    try {
      await SignIn(data.email, data.password);
      router.push("/");
    } catch (error: any) {
      setError(GetSignInErrorMessage(error.code));
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      <Link href="/signup" className="text-blue-500 hover:underline mt-4 block">
        Sign up
      </Link>
    </div>
  );
};

export default LoginPage;
