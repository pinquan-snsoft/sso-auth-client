import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/base/button";
import { Card, CardContent } from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { FPMS_REFRESH_TOKEN_NAME } from "@/lib/constants";
import api from "@/services/api";
import { signInSchema, SignInData } from "../validation/sign-in-form"; // Import centralized schema
import { InputOTPForm } from "./components/otp";

const SignInForm: React.FC<{ className?: string }> = ({
  className,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInData>({ resolver: zodResolver(signInSchema) });

  const [isOTP, setIsOTP] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const hasAuthCookie = document.cookie
      .split(";")
      .some((cookie) =>
        cookie.trim().startsWith(`${FPMS_REFRESH_TOKEN_NAME}=`)
      );

    if (hasAuthCookie) {
      const redirectUrl =
        new URLSearchParams(window.location.search).get("redirect") || "/";
      window.location.href = redirectUrl;
    }
  }, []);

  const onSubmit = async (data: SignInData) => {
    try {
      const response = await api.post("/sign-in", data);
      if (response.data.requireOTP) {
        setIsOTP(false);
      } else {
        const redirectUrl =
          new URLSearchParams(window.location.search).get("redirect") ||
          import.meta.env.VITE_DEFAULT_SIGN_IN_REDIRECT_URL;
        window.location.href = redirectUrl;
      }
      setServerError("");
    } catch (error) {
      console.error(error);
      setServerError("Sign in failed. Please check your credentials.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Sign in to your FPMS account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {!isOTP && (
                <div className="grid gap-2">
                  <hr className="border-border my-4" />
                  <Label htmlFor="OTP" className="text-center">
                    Enter Your OTP
                  </Label>
                  <InputOTPForm
                    className="mx-auto text-center"
                    setValues={(value) => setValue("otp", value)}
                    errors={errors}
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {isOTP ? "Verify OTP" : "Sign In"}
              </Button>
            </div>
            {serverError && (
              <p className="text-red-500 text-sm text-center mt-2">
                {serverError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignInForm;
