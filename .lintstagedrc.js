module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{yml,yaml,html,json,json5,graphql,mdx}': ['prettier --write'],
}
