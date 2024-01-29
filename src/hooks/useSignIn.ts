import { trpc } from "@/trpc/client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ZodError } from "zod";

export const useSignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  return trpc.auth.signIn.useMutation({
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password. Please try again.");

        return;
      }
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: () => {
      toast.success("Sign in successful!");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);

        return;
      }
      if (isSeller) {
        router.push("/seller");

        return;
      }

      router.push("/");
    },
  });
};
