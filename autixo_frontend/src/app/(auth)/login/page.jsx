"use client";

import { authClient } from "@/app/lib/auth-client";
import {
  Button,
  Card,
  Checkbox,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(null); // null | "credentials" | "google"

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading("credentials");

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const { email, password, rememberMe } = data;

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: rememberMe === "on",
    });

    if (error) {
      setLoading(null);
      toast.danger(error.message || "Unable to log in. Please try again.");
      return;
    }

    toast.success("Welcome back!");
    router.push("/");
  };

  const handleGoogleSignIn = async () => {
    setLoading("google");
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setLoading(null);
      toast.danger(error.message || "Unable to sign in with Google.");
    }
  };

  return (
    <Card className="w-full max-w-md rounded-2xl p-8 text-foreground">
      <h1 className="text-2xl font-semibold">Log in to your account</h1>
      <p className="mt-1 text-sm text-muted">
        Welcome back! Please enter your details.
      </p>

      <Form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <TextField
          isRequired
          className="space-y-1.5"
          name="email"
          type="email"
        >
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          className="space-y-1.5"
          name="password"
          type={showPassword ? "text" : "password"}
        >
          <Label>Password</Label>
          <div className="relative">
            <Input className="w-full pr-10" placeholder="••••••••" />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-muted"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HiEyeSlash className="size-5" />
              ) : (
                <HiEye className="size-5" />
              )}
            </button>
          </div>
          <FieldError />
        </TextField>

        <div className="flex items-center justify-between">
          <Checkbox name="rememberMe">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <span className="text-sm text-muted">Remember me</span>
            </Checkbox.Content>
          </Checkbox>
        </div>

        <Button
          className="w-full bg-accent text-accent-foreground"
          isDisabled={loading === "credentials"}
          type="submit"
        >
          {loading === "credentials" ? "Logging in..." : "Log In"}
        </Button>
      </Form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        className="w-full border border-border bg-surface-secondary text-foreground"
        isDisabled={loading === "google"}
        onPress={handleGoogleSignIn}
        variant="light"
      >
        <FcGoogle className="size-5" />
        {loading === "google" ? "Connecting..." : "Continue with Google"}
      </Button>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link
          className="font-medium text-foreground hover:underline"
          href="/register"
        >
          Sign up
        </Link>
      </p>
    </Card>
  );
}
