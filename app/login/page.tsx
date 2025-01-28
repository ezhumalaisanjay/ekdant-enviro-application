"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Apple, Facebook, Instagram, LoaderCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function Login() {
  const [signUp, setSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <>
      <div className="flex h-[710px] justify-center items-center ">
      { (!signUp) ?
        <Card className="md:w-[460px] p-10  border border-slate-400 border-opacity-25"> 
          <CardHeader className="pb-2">
            <div className="flex flex-col justify-center text-center">
              <Button variant="ghost" className="hover:cursor-default hover:bg-white"><LogOut /></Button>
              <p className="text-lg font-semibold">Sign In</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center flex justify-center">
            <div>
              Use your email and password to sign in
            </div>
          </CardDescription>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-3">
              <div>
                <Label>Email</Label>
                <Input placeholder="Email" className="p-5"/>
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="Password" className="p-5"/>
              </div>
            </div>
            <div className="flex justify-end text-sm mt-1">
              <a href="">Forgot password?</a>
            </div>
            <Link href="/admin/dashboard">
              <Button className="flex w-full m-4" onClick={loader} disabled={isLoading}>
                {(isLoading) && <LoaderCircle className="animate-spin" /> }
                Log in
              </Button>
            </Link>
            <div className="text-center font-light text-sm m-4">Don&rsquo;t have an account? 
              <span className="font-semibold cursor-pointer"><a onClick={() => setSignUp(true)}>Sign up</a>
              </span> for free.</div>
            <div className="flex justify-evenly mt-3">
              <Button variant="secondary" className="rounded-full p-3"><Facebook /></Button>
              <Button variant="secondary" className="rounded-full p-3"><Apple /></Button>
              <Button variant="secondary" className="rounded-full p-3"><Instagram /></Button>
            </div>
          </CardContent>
        </Card> : 
        <Card className="md:w-[460px] p-10  border border-slate-400 border-opacity-25"> 
        <CardHeader className="pb-2">
          <div className="flex flex-col justify-center text-center">
            <Button variant="ghost" className="hover:cursor-default hover:bg-white"><LogOut /></Button>
            <p className="text-lg font-semibold">Sign Up</p>
          </div>
        </CardHeader>
        <CardDescription className="text-center flex justify-center">
          <div>
            Create an account with your email and password
          </div>
        </CardDescription>
        <CardContent className="mt-8">
          <div className="flex flex-col gap-3">
            <div>
              <Label>Full Name</Label>
              <Input placeholder="Full Name" className="p-5 pl-1"/>
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="Email" className="p-5 pl-1"/>
            </div>
            <div>
              <Label>Password</Label>
              <div className="flex flex-col gap-2">
                <Input type="password" placeholder="Password" className="p-5 pl-1"/>
                <Input type="password" placeholder="Confirm Password" className="p-5 pl-1"/>
              </div>
              </div>
          </div>
            <Button className="flex w-full m-4 mt-9" onClick={loader} disabled={isLoading}>
              {(isLoading) && <LoaderCircle className="animate-spin" /> }
              Sign Up
            </Button>
          <div className="text-center font-light text-sm m-4">Already have an account? 
            <span className="font-semibold cursor-pointer"><a onClick={() => setSignUp(false)}>Sign In</a>
            </span> instead.</div>
          <div className="flex justify-evenly mt-3">
            <Button variant="secondary" className="rounded-full p-3"><Facebook /></Button>
            <Button variant="secondary" className="rounded-full p-3"><Apple /></Button>
            <Button variant="secondary" className="rounded-full p-3"><Instagram /></Button>
          </div>
        </CardContent>
      </Card> }
      </div>
    </>
  )
}

export default Login