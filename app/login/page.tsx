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
import { signUp } from "@/lib/cognito"; // Import the signUp function

function Login() {
  const [signUpMode, setSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(""); // Add state for confirmation code
  const [signUpSuccess, setSignUpSuccess] = useState(false); // Track if sign-up was successful

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp(email, password, fullName, phoneNumber);
      setIsLoading(false);
      setSignUpSuccess(true); // Set sign-up success to true
    } catch (error) {
      console.error("Sign-up error:", error);
      setIsLoading(false);
    }
  };

  const handleConfirmCode = () => {
    // Handle code confirmation logic here (e.g., call API to confirm code)
    console.log("Confirmation code submitted:", confirmationCode);
  };

  return (
    <div className="flex h-[710px] justify-center items-center">
      {!signUpMode ? (
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <div className="flex flex-col justify-center text-center">
              <Button
                variant="ghost"
                className="hover:cursor-default hover:bg-white"
              >
                {/* Your Icon */}
              </Button>
              <p className="text-lg font-semibold">Sign In</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center flex justify-center">
            <div>Use your email and password to sign in</div>
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
            <Button
              className="flex w-full m-4"
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading && <div className="animate-spin">...</div>}
              Log in
            </Button>
            <div className="text-center font-light text-sm m-4">
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
        <Card className="md:w-[460px] p-10 border border-slate-400 border-opacity-25">
          <CardHeader className="pb-2">
            <div className="flex flex-col justify-center text-center">
              <Button
                variant="ghost"
                className="hover:cursor-default hover:bg-white"
              >
                {/* Your Icon */}
              </Button>
              <p className="text-lg font-semibold">Sign Up</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center flex justify-center">
            <div>Create an account with your email and password</div>
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
            <Button
              className="flex w-full m-4"
              onClick={handleSignUp}
              disabled={isLoading}
            >
              {isLoading && <div className="animate-spin">...</div>}
              Sign up
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
                  className="flex w-full m-4"
                  onClick={handleConfirmCode}
                  disabled={isLoading}
                >
                  Confirm Code
                </Button>
              </div>
            )}
            <div className="text-center font-light text-sm m-4">
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
