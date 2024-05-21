"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignUp, GetSignUpErrorMessage } from "../../../../services/firebase";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confPassword: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    try {
      await SignUp(data.email, data.password, data.username);
      router.push("/");
    } catch (error: any) {
      setError(GetSignUpErrorMessage(error.code));
      console.log(error.code);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <div className="text-red-500">{error}</div>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 6,
                message: "Username must have a minimum length of 6 characters",
              },
            })}
            className={`border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have a minimum length of 6 characters",
              },
            })}
            className={`border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            {...register("confPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className={`border ${
              errors.confPassword ? "border-red-500" : "border-gray-300"
            } px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500`}
          />
          {errors.confPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>
      <Link href="/signin" className="text-blue-500 hover:underline mt-4 block">
        Sign in
      </Link>
    </div>
  );
};

export default Page;
