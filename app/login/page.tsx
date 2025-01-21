"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Apple, Facebook, Instagram, LoaderCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const loader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <>
      <div className="flex h-[710px] justify-center items-center bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200">
        <Card className="w-max">
          <CardHeader>
            <div className="flex flex-col justify-center text-center">
              <Button variant="ghost" className="hover:cursor-default hover:bg-white"><LogOut /></Button>
              <p>Sign in with email</p>
            </div>
          </CardHeader>
          <CardDescription className="text-center flex justify-center">
            <div className="w-3/4">
              Make a new doc to bring  your words, data and teams together.
            </div>
          </CardDescription>
          <CardContent className="mt-8">
            <div className="flex flex-col gap-2">
              <Input placeholder="Email" />
              <Input type="password" placeholder="Password"/>
            </div>
            <div className="flex justify-end text-sm mt-1">
              <a href="">Forgot password?</a>
            </div>
            <Link href="/dashboard">
              <Button className="flex w-full m-2" onClick={loader} disabled={isLoading}>
                {(isLoading) && <LoaderCircle className="animate-spin" /> }
                Log in
              </Button>
            </Link>
            <div className="text-center text-sm">or Sign in with</div>
            <div className="flex justify-evenly mt-3">
              <Button variant="secondary" className="rounded-full p-3"><Facebook /></Button>
              <Button variant="secondary" className="rounded-full p-3"><Apple /></Button>
              <Button variant="secondary" className="rounded-full p-3"><Instagram /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Login