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
import Image from "next/image";
import logo from "../../imges/ekdant-logo-icon.png"
import { Eye, EyeClosed, Loader } from "lucide-react";

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle user sign-up
  const handleSignUp = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Clear errors
    try {
      await signUp(email, password, fullName, phoneNumber);
      setSignUpSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Sign-in failed. Check your credentials.");
      } else {
        setErrorMessage("Sign-in failed. Check your credentials.");
      }
    }
    setIsLoading(false);
  };

  // Handle confirmation code submission
  const handleConfirmCode = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await confirmSignUp(fullName, confirmationCode);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "Sign-in failed. Check your credentials.");
      } else {
        setErrorMessage("Sign-in failed. Check your credentials.");
      }
    }
    setIsLoading(false);
  };

  // Handle user sign-in
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

  return (
    <div className="flex h-[710px] justify-center items-center">
      {!signUpMode ? (
        // SIGN-IN FORM
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <div className="text-center">
              <div className="flex flex-col justify-center items-center gap-3 p-3">
                <Image src={logo} className="items-center" alt="Logo" width={50} height={50}/>
                <div className="text-xs text-green-600 font-semibold">Ekdant Enviro Services Ltd</div>
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
                  placeholder="username or Email"
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
                  {isPasswordVisible ? <Eye className="size-5" /> : <EyeClosed className="size-5"  />}
                </span>
              </div>
              <div className="flex justify-end">
                <a href="" className="text-sm text-blue-500">Forgot Password?</a>
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
                {isLoading ? <>  <Loader className="animate-spin" /> Logging in </> : "Log in"}
              </Button>
            </div>
            {/*
            <div className="text-center font-light text-sm mt-4">
              Don&rsquo;t have an account?{" "}
              <span
                className="font-semibold cursor-pointer"
                onClick={() => setSignUpMode(true)}
              >
                Sign up
              </span>
            </div> */}
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
