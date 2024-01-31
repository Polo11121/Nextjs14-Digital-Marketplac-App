import { isAdmin } from "../../lib/utils";
import { User } from "../../payloadTypes";
import { Access, CollectionConfig, FieldAccess } from "payload/types";

const yourOwn: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (user?.role === "admin") {
    return true;
  }

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders on DigitalHippo",
  },
  access: {
    read: yourOwn,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: isAdmin as FieldAccess,
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      admin: {
        hidden: true,
      },
      relationTo: "users",
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
