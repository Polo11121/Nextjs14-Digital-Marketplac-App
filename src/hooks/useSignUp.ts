import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

export const useSignUp = () => {
  const router = useRouter();

  return trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");

        return;
      }
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);

        return;
      }

      toast.error("Something went wrong. Please try again.");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push(`/verify-email?toEmail=${sentToEmail}`);
    },
  });
};
