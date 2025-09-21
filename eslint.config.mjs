import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore generated + build folders
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "components/ui/**/*",
    ],
  },

  // Extend recommended configs
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "standard",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "prettier"
    // ⚠️ Removed plugin:tailwindcss/recommended → not needed for Tailwind v4
  ),

  // General rules
  {
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "object"],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "comma-dangle": "off",
      "react/react-in-jsx-scope": "off", // Next.js handles this
      "no-undef": "off", // TypeScript already checks this
    },
  },

  // TypeScript-specific overrides
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },
];

export default eslintConfig;
