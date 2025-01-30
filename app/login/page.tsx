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
import { signUp, confirmSignUp, signIn } from "@/lib/cognito"; // Import sign-in function

function Login() {
  const [signUpMode, setSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Store error messages

  // Handle user sign-up
  const handleSignUp = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Clear errors
    try {
      await signUp(email, password, fullName, phoneNumber);
      setSignUpSuccess(true);
    } catch (error) {
      setErrorMessage(error.message || "Sign-up failed.");
    }
    setIsLoading(false);
  };

  // Handle confirmation code submission
  const handleConfirmCode = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await confirmSignUp(fullName, confirmationCode);
    } catch (error) {
      setErrorMessage(error.message || "Invalid confirmation code.");
    }
    setIsLoading(false);
  };

  // Handle user sign-in
  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await signIn(email, password);
    } catch (error) {
      setErrorMessage(
        error.message || "Sign-in failed. Check your credentials."
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-[710px] justify-center items-center">
      {!signUpMode ? (
        // SIGN-IN FORM
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <div className="flex flex-col justify-center text-center">
              <p className="text-lg font-semibold">Sign In</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center">
            Use your email and password to sign in
          </CardDescription>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-3">
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  className="p-5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  className="p-5"
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
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log in"}
            </Button>
            <div className="text-center font-light text-sm mt-4">
              Don&rsquo;t have an account?{" "}
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setSignUpMode(true)}
              >
                Sign up
              </span>
            </div>
          </CardContent>
        </Card>
      ) : (
        // SIGN-UP FORM
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
                <div className="mt-4">
                  <Label>Enter Confirmation Code</Label>
                  <Input
                    placeholder="Confirmation Code"
                    className="p-5 pl-1"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                  />
                </div>
                <Button
                  className="flex w-full mt-4"
                  onClick={handleConfirmCode}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Confirm Code"}
                </Button>
              </div>
            )}
            <div className="text-center font-light text-sm mt-4">
              Already have an account?{" "}
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setSignUpMode(false)}
              >
                Log in
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Login;
