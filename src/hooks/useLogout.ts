import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      toast.success("You have been logged out.");

      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return { logout };
};
