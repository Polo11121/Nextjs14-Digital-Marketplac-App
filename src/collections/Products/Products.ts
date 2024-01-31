import { PRODUCT_CATEGORIES } from "../../config";
import { isAdmin } from "../../lib/utils";
import { CollectionConfig, FieldAccess } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "description",
      label: "Product details",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      label: "Price in USD",
      min: 0,
      max: 100000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
        label,
        value,
      })),
    },
    {
      name: "product_files",
      label: "Product files",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: isAdmin as FieldAccess,
        update: isAdmin as FieldAccess,
        read: isAdmin as FieldAccess,
      },
      options: [
        { label: "Pending verification", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Denied", value: "denied" },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
