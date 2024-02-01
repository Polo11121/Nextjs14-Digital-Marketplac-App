"use client";

import { useEffect, useState } from "react";
import { ProductPlaceholder } from "@/components";
import { Slider } from "@/components/Slider";
import { PRODUCT_CATEGORIES } from "@/config";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/payloadTypes";
import Link from "next/link";

type Props = {
  product: Product | null;
  index: number;
};

export const ProductListing = ({ product, index }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) {
    return <ProductPlaceholder />;
  }

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <Slider urls={validUrls} />
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};
