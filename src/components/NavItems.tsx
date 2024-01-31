"use client";

import { useRef, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
import { NavItem } from "@/components/NavItem";
import { useOnClickOutside } from "@/hooks";

export const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const ref = useRef<HTMLDivElement>(null);

  const isAnyOpen = activeIndex !== null;

  useOnClickOutside(ref, () => setActiveIndex(null));

  return (
    <div ref={ref} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const openHandler = () =>
          activeIndex === index ? setActiveIndex(null) : setActiveIndex(index);

        const isOpen = activeIndex === index;

        return (
          <NavItem
            isAnyOpen={isAnyOpen}
            key={category.value}
            category={category}
            isOpen={isOpen}
            onOpen={openHandler}
          />
        );
      })}
    </div>
  );
};
