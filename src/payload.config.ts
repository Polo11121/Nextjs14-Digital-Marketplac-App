import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { Users } from "./collections/Users";
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Products/Media";
import { ProductFiles } from "./collections/Products/ProductFiles";
import { Orders } from "./collections/Products/Orders";
import path from "path";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [Users, Products, Media, ProductFiles, Orders],
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",
    bundler: webpackBundler(),
    meta: {
      titleSuffix: " - Digital Hippo",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.png",
    },
  },
  rateLimit: {
    max: 200,
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payloadTypes.ts"),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL || "",
  }),
});
