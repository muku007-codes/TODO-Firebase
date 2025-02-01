"use client";

import type * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/auth components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/Context/Firebase";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  view?: "login" | "signup";
}

export function AuthForm({ view = "login", ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const {
    signinWithEmailandPassword,
    signupWithEmailandPassword,
    isLoggedIn,
    signInWithGoogle,
  } = useFirebase();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (view === "signup") {
      signupWithEmailandPassword(email, password, name);
      console.log("✨Account Created✨");
    } else {
      await signinWithEmailandPassword(email, password);
      console.log("✨Sign In Successfully✨");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
    console.log("✨Sign In with google Successfully✨");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/overview");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/overview");
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Icons.logo className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">TaskFlow</span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {view === "login" ? "Welcome back" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {view === "login"
              ? "Login with your Email or Google account"
              : "Sign up with your Email or Google account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {/* <Button variant="outline" className="w-full" disabled={isLoading}>
              <Icons.apple className="mr-2 h-4 w-4" />
              {view === "login" ? "Login with Apple" : "Sign up with Apple"}
            </Button> */}
            <Button
              variant="outline"
              className="w-full"
              disabled={isLoading}
              onClick={handleSignInWithGoogle}
            >
              <Icons.google className="mr-2 h-4 w-4" />
              {view === "login" ? "Login with Google" : "Sign up with Google"}
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              {view === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Mukesh Kumar"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {/* {view === "login" && (
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  )} */}
                </div>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {view === "login" ? "Login" : "Sign up"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            {view === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p> */}
        </CardFooter>
      </Card>
    </div>
  );
}
