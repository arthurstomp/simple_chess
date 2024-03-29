module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-debugger": "off",
    "no-unused-expressions": "warn",
    "no-unused-labels": "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "warn"
  },
};
