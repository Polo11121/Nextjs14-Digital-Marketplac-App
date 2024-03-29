"use client";

import { Button, Icons, Input, Label, buttonVariants } from "@/components";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentials,
  authCredentialsValidator,
} from "@/lib/validators/authCredentialsValidator";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "@/hooks";
import Link from "next/link";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(authCredentialsValidator),
  });
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSeller = searchParams.get("as") === "seller";

  const { mutate, isLoading } = useSignIn();

  const submitHandler = handleSubmit((data) => mutate(data));

  const continueAsCustomerHandler = () => router.replace("/sign-in");

  const continueAsSellerHandler = () => router.replace("/sign-in?as=seller");

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller" : ""} account
            </h1>
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Don&apos;t have an account? Sign up
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={submitHandler}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="you@example.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="********"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button disabled={isLoading} type="submit">
                  Sign In
                </Button>
              </div>
            </form>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button
                onClick={continueAsCustomerHandler}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as a customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSellerHandler}
                variant="secondary"
                disabled={isLoading}
              >
                Continue as a seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
