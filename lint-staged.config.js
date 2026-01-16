module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],

  "**/*.ts?(x)": () => "bun run check-types",

  "!*.{js,jsx,ts,tsx}": "prettier --write --ignore-unknown",
};
