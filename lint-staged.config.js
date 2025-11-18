module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
    '**/*.ts?(x)': () => 'bun run check-types',
    '*.{json,yaml}': ['prettier --write'],
  };