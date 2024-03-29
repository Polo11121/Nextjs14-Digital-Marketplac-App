import { getPayloadClient } from "../getPaylaod";
import { authCredentialsValidator } from "../lib/validators/authCredentialsValidator";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import * as z from "zod";

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
  verifyEmail: publicProcedure
    .input(
      z.object({
        token: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return { success: true };
    }),
  signIn: publicProcedure
    .input(authCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { req, res } = ctx;

      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
