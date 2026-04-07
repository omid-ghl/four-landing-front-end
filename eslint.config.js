import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: { globals: globals.browser },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'prefer-const': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
            'no-async-promise-executor': 'off',
        },
    },
];
