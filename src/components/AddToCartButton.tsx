"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components";
import { Product } from "@/payloadTypes";
import { useCart } from "@/hooks";

type Props = {
  product: Product;
};

export const AddToCartButton = ({ product }: Props) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  const addToCartHandler = () => {
    addItem(product);
    setIsSuccess(true);
  };

  return (
    <Button onClick={addToCartHandler} size="lg" className="w-full">
      {isSuccess ? "Added to cart!" : "Add to cart"}
    </Button>
  );
};
