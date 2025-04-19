module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    'import/no-unresolved': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-duplicates': 'off',
    '@next/next/no-img-element': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-key': 'warn'
  }
} 