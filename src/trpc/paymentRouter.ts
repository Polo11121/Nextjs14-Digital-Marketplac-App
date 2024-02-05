import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../getPaylaod";
import { stripe } from "../lib/stripe";
import * as z from "zod";
import type Stripe from "stripe";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      const { productIds } = input;

      if (!productIds.length) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const filteredProducts = products.filter(({ priceId }) =>
        Boolean(priceId)
      );

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts.map(({ id }) => id),
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      filteredProducts.forEach(({ priceId }) => {
        line_items.push({
          price: priceId!,
          quantity: 1,
        });
      });

      line_items.push({
        price: "price_10CeBwA19umTXGu8s4p2G3aX",
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      });

      try {
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card", "paypal"],
          mode: "payment",
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });

        return {
          url: stripeSession.url,
        };
      } catch (error) {
        console.log(error);

        return { url: null };
      }
    }),
  pollOrderStatus: publicProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input;

      const payload = await getPayloadClient();

      const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
          id: {
            equals: orderId,
          },
        },
      });

      if (!orders.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      const [order] = orders;

      return {
        isPaid: order._isPaid,
      };
    }),
});
