import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <div>
            <p>Hi,</p>
            <p>Thanks for signing up to Digital Hipo!</p>
            <p>Click <a href="#${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">here</a> to verify your email address.</p>
          </div>
        `;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
