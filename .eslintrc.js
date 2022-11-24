module.exports = {
    parser: 'vue-eslint-parser',
    extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'prettier/prettier': 'error',
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/multi-word-component-names': 'off',
    },
};
