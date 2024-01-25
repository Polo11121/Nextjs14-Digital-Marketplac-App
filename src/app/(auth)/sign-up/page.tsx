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
import Link from "next/link";
import { trpc } from "@/trpc/client";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentials>({
    resolver: zodResolver(authCredentialsValidator),
  });
  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({});

  const submitHandler = handleSubmit((data) => mutate(data));

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">Create and account</h1>
            <Link
              href="/sign-in"
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? Sign in
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
                </div>
                <Button disabled={isLoading} type="submit">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
