import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Access } from "payload/config";
import { PRODUCT_CATEGORIES } from "../config";
import { Product } from "@/payloadTypes";
import { Metadata } from "next";

export const isAdmin: Access = ({ req }) => req.user?.role === "admin";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatPrice = (
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) => {
  const { currency = "USD", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};

export const getProductLabel = (product: Product) =>
  PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;

export const getProductsTotal = (items: { product: Product }[]) =>
  items.reduce((acc, item) => acc + item.product.price, 0);

export function constructMetadata({
  title = "DigitalHippo - the marketplace for digital assets",
  description = "DigitalHippo is an open-source marketplace for high-quality digital goods.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@test",
    },
    icons,
    metadataBase: new URL("https://digitalhippo.up.railway.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
