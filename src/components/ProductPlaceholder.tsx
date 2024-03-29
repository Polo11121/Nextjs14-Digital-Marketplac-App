import { Skeleton } from "@/components";

export const ProductPlaceholder = () => (
  <div className="flex flex-col w-full">
    <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
      <Skeleton className="w-full h-full" />
    </div>
    <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
    <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
    <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
  </div>
);
