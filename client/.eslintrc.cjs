module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        tabWidth: 2,
      },
    ],
    indent: ["error", 2],
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "react/react-in-jsx-scope": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
  },
};
