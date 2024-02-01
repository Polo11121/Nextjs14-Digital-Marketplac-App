"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components";

export const AddToCartButton = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  const addToCartHandler = () => setIsSuccess(true);

  return (
    <Button onClick={addToCartHandler} size="lg" className="w-full">
      {isSuccess ? "Added to cart!" : "Add to cart"}
    </Button>
  );
};
