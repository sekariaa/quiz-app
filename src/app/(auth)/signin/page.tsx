"use client";

import React, { useState } from "react";
import { SignIn, GetSignInErrorMessage } from "../../../../services/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    setOpen(false);
    try {
      setIsLoading(true);
      await SignIn(data.email, data.password);
      setIsLoading(false);
      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      setError(GetSignInErrorMessage(error.code));
      setOpen(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const toggleShowPass = () => {
    setShowPass((prevShowPass) => !prevShowPass);
  };

  return (
    <div className="bg-secondary min-h-screen px-6 py-6 md:flex md:items-center md:justify-center">
      <div className="bg-light rounded-3xl mx-auto p-3 shadow-2xl max-w-md md:w-full">
        <h1 className="px-3 text-gray-900 font-bold mb-1 text-lg">
          Welcome Back!
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-3"
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              id="floating_email"
              {...register("email", { required: "Email is required" })}
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
              placeholder=" "
              autoComplete="email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={showPass ? "text" : "password"}
              id="floating_password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length of 6 characters",
                },
              })}
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
              placeholder=" "
              autoComplete="new-password"
              required
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={toggleShowPass}
            >
              {showPass ? (
                <RemoveRedEyeOutlinedIcon className="text-gray-300" />
              ) : (
                <VisibilityOffOutlinedIcon className="text-gray-300" />
              )}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-primary"
          >
            {isLoading ? (
              <span className="w-full relative px-5 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 ">
                <CircularProgress size="1rem" style={{ color: "white" }} />
              </span>
            ) : (
              <span className="w-full relative px-5 py-2 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 ">
                Create Account
              </span>
            )}
          </button>
        </form>
        <p className="flex items-center max-w-md mx-auto text-xs px-3 mb-3 text-gray-900">
          Don&apos;t have account?
          <Link
            href="/signup"
            className="text-primary hover:underline block px-1"
          >
            Sign up
          </Link>
        </p>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default LoginPage;
