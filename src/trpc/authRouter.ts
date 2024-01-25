import { getPayloadClient } from "../getPaylaod";
import { authCredentialsValidator } from "../lib/validators/authCredentialsValidator";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(authCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await payload.create({
        collection: "users",
        data: {
          role: "user",
          email,
          password,
        },
      });

      return {
        success: true,
        sentToEmail: email,
      };
    }),
});