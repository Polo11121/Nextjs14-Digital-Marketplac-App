import { isAdmin } from "../../lib/utils";
import { User } from "../../payloadTypes";
import { Access, CollectionConfig } from "payload/types";

const yourOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") {
    return true;
  }

  if (!user) {
    return false;
  }

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductIds = products
    .map(({ product_files }) => product_files)
    .flat();

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purchasedProductIds = orders
    .map((orders) =>
      orders.products.map((product) => {
        if (typeof product === "string") {
          return req.payload.logger.error("Product is not populated");
        }

        return typeof product.product_files === "string"
          ? product.product_files
          : product.product_files.id;
      })
    )
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductIds, ...purchasedProductIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [({ req, data }) => ({ ...data, user: req.user?.id })],
  },
  access: {
    read: yourOwnAndPurchased,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
