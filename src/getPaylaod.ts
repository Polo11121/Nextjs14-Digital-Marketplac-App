import type { InitOptions } from "payload/config";
import payload, { Payload } from "payload";
import dontenv from "dotenv";
import path from "path";

type Args = {
  initOptions?: Partial<InitOptions>;
};

dontenv.config({
  path: path.resolve(__dirname, "../.env"),
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
