"use client";

import { authClient } from "@/app/lib/auth-client";
import {
  Button,
  Card,
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

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null); // null | "credentials" | "google"

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading("credentials");

    const data = Object.fromEntries(new FormData(event.currentTarget));
    const { name, email, imageUrl } = data;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: imageUrl || undefined,
    });

    if (error) {
      setLoading(null);
      toast.danger(error.message || "Unable to create your account.");
      return;
    }

    toast.success(` ${name}, your account has been created!`);
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
    <Card className="w-full max-w-xl rounded-2xl p-8 text-foreground">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-muted">
        Sign up to start renting cars with DriveFleet.
      </p>

      <Form
        className="mt-6 space-y-5"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField isRequired className="space-y-1.5" name="name">
            <Label>Full name</Label>
            <Input placeholder="Jane Doe" />
            <FieldError />
          </TextField>

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
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            isRequired
            className="space-y-1.5"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            validate={(value) => {
              if (value.length < 6)
                return "Password must be at least 6 characters.";
              if (!/[A-Z]/.test(value))
                return "Password must contain an uppercase letter.";
              if (!/[a-z]/.test(value))
                return "Password must contain a lowercase letter.";
              return null;
            }}
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

          <TextField
            isRequired
            className="space-y-1.5"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            validate={(value) =>
              value !== password ? "Passwords do not match." : null
            }
          >
            <Label>Confirm password</Label>
            <div className="relative">
              <Input className="w-full pr-10" placeholder="••••••••" />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-muted"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <HiEyeSlash className="size-5" />
                ) : (
                  <HiEye className="size-5" />
                )}
              </button>
            </div>
            <FieldError />
          </TextField>
        </div>

        <TextField className="space-y-1.5" name="imageUrl" type="url">
          <Label>Profile image URL (optional)</Label>
          <Input placeholder="https://example.com/avatar.png" />
          <FieldError />
        </TextField>

        <Button
          className="w-full bg-accent text-accent-foreground"
          isDisabled={loading === "credentials"}
          type="submit"
        >
          {loading === "credentials" ? "Creating account..." : "Sign Up"}
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
        Already have an account?{" "}
        <Link
          className="font-medium text-foreground hover:underline"
          href="/login"
        >
          Log in
        </Link>
      </p>
    </Card>
  );
}
