import { Product } from "@/payloadTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartItem = {
  product: Product;
};

type Cart = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<Cart>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({ items: [...state.items, { product }] })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId.id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);
