import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import dontenv from "dotenv";
import path from "path";
import nodemailer from "nodemailer";

type Args = {
  initOptions?: Partial<InitOptions>;
};

dontenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 465,
  secure: true,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

let cached = (global as any).paylaod;

if (!cached) {
  cached = (global as any).paylaod = {
    client: null,
    promise: null,
  };
}

export const getPayloadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is not defined");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      email: {
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "Digital Hippo",
      },
      local: initOptions?.express ? false : true,
      ...initOptions,
    });

    try {
      cached.client = await cached.promise;
    } catch (error) {
      cached.promise = null;
      console.error(error);
    }
  }

  return cached.client;
};
