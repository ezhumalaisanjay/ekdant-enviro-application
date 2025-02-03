"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  signUp,
  signIn,
  forgotPassword,
  resetPassword,
} from "@/lib/cognito"; // Import Cognito functions
//import { confirmSignUp } from "@/lib/cognito";
import Image from "next/image";
import logo from "../../imges/ekdant-logo-icon.png";
import { Eye, EyeClosed, Loader } from "lucide-react";

function Login() {
  const signUpMode = false;
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [confirmationCode, setConfirmationCode] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // State for forgot password mode
  const [newPassword, setNewPassword] = useState(""); // New password for reset
  const [resetConfirmationCode, setResetConfirmationCode] = useState(""); // Reset code

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle sign-up
  const handleSignUp = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await signUp(email, password, fullName, phoneNumber);
      setSignUpSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Sign-up failed. Try again.");
      } else {
        setErrorMessage("Sign-up failed. Try again.");
      }
    }
    setIsLoading(false);
  };

  // Handle confirmation code for sign-up
  
  /* const handleConfirmCode = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await confirmSignUp(fullName, confirmationCode);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Confirmation failed.");
      } else {
        setErrorMessage("Confirmation failed.");
      }
    }
    setIsLoading(false);
  }; */

  // Handle sign-in
  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await signIn(email, password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Sign-in failed. Check your credentials.");
      } else {
        setErrorMessage("Sign-in failed. Check your credentials.");
      }
    }
    setIsLoading(false);
  };

  // Handle forgot password (send reset code)
  const handleForgotPassword = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await forgotPassword(email); // Send reset code to email
      setForgotPasswordMode(true); // Switch to password reset mode
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Password reset failed.");
      } else {
        setErrorMessage("Password reset failed.");
      }
    }
    setIsLoading(false);
  };

  // Handle password reset
  const handleResetPassword = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await resetPassword(email, resetConfirmationCode, newPassword); // Reset password with new password and reset code
      setForgotPasswordMode(false); // Exit reset password mode
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Password reset failed.");
      } else {
        setErrorMessage("Password reset failed.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-[710px] justify-center items-center">
      {/* Show Sign In form if forgotPasswordMode is false */}
      {!forgotPasswordMode && !signUpMode ? (
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <div className="text-center">
              <div className="flex flex-col justify-center items-center gap-3 p-3">
                <Image
                  src={logo}
                  className="items-center"
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <div className="text-xs text-green-600 font-semibold">
                  Ekdant Enviro Services Ltd
                </div>
              </div>
              <p className="text-lg font-semibold">Sign In</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center">
            Use your username and password to sign in
          </CardDescription>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-3">
              <div>
                <Label>Username/Email</Label>
                <Input
                  placeholder="Username or Email"
                  className="p-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Label>Password</Label>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="p-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 top-11 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </span>
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm text-blue-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }} // Trigger forgot password
                >
                  Forgot Password?
                </a>
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <div className="w-full flex justify-center">
              <Button
                className="flex w-3/4 mt-8"
                onClick={handleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    {" "}
                    <Loader className="animate-spin" /> Logging in{" "}
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Show Forgot Password form when forgotPasswordMode is true */}
      {forgotPasswordMode && (
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <p className="text-lg font-semibold">Reset Password</p>
          </CardHeader>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-3">
              <div>
                <Label>Enter Reset Code</Label>
                <Input
                  placeholder="Reset Code"
                  className="p-5 pl-1"
                  value={resetConfirmationCode}
                  onChange={(e) => setResetConfirmationCode(e.target.value)}
                />
              </div>
              <div>
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="New Password"
                  className="p-5 pl-1"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <Button
              className="flex w-full mt-4"
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Reset Password"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sign-up form, if user is in sign-up mode */}
      {signUpMode && !forgotPasswordMode && (
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <div className="flex flex-col justify-center text-center">
              <p className="text-lg font-semibold">Sign Up</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center">
            Create an account with your email and password
          </CardDescription>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-3">
              <div>
                <Label>Full Name</Label>
                <Input
                  placeholder="Full Name"
                  className="p-5 pl-1"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  className="p-5 pl-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  placeholder="Phone Number"
                  className="p-5 pl-1"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="p-5 pl-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <Button
              className="flex w-full mt-4"
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign up"}
            </Button>
            {signUpSuccess && (
              <div className="mt-4">
                <p className="text-center text-green-600">
                  Sign-up successful! Please check your email for the
                  confirmation code.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Login;
