import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Access } from "payload/config";
import { PRODUCT_CATEGORIES } from "@/config";
import { Product } from "@/payloadTypes";

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
