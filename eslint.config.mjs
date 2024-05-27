import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default antfu({
  stylistic: {
    quotes: "double",
    semi: true,
  },
  formatters: true,
  typescript: true,
  react: true,
  ...compat.config({
    extends: ["plugin:tailwindcss/recommended"],
  }),
});
