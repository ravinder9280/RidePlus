module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix'],
    '**/*.ts?(x)': () => 'bun run check-types',
    '*.{json,yaml}': ['prettier --write'],
  };