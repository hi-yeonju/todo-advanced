import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: [
      "src/app/**", 
      "src/mocks/**"
    ], // 원하는 경로로 조정
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
export default eslintConfig;
