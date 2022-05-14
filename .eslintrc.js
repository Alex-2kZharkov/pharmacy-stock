module.exports = {
  extends: [
    // https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:sonarjs/recommended",
    "plugin:promise/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
  ],
  plugins: ["prettier", "formatjs", "jest"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
        project: "./tsconfig.json",
      },
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
        "@typescript-eslint/method-signature-style": 2,
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/member-delimiter-style": [
          "error",
          {
            multiline: {
              delimiter: "semi",
              requireLast: true,
            },
            singleline: {
              delimiter: "semi",
              requireLast: false,
            },
          },
        ],
        // '@typescript-eslint/member-ordering': 1, // to be discussed
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": 1,
        // '@typescript-eslint/no-unnecessary-condition': 1, // need to check. It works pretty strange at the moment
        "@typescript-eslint/no-unnecessary-type-arguments": 1,
        "@typescript-eslint/prefer-includes": 1,
        "@typescript-eslint/prefer-nullish-coalescing": 1,
        "@typescript-eslint/prefer-optional-chain": 1,
        "@typescript-eslint/prefer-string-starts-ends-with": 1,
        "@typescript-eslint/prefer-ts-expect-error": 2,
        "@typescript-eslint/promise-function-async": 1,
        "@typescript-eslint/type-annotation-spacing": 1,
        "@typescript-eslint/no-unused-vars": 2,
        "@typescript-eslint/explicit-function-return-type": 0, // TODO TBD do we need it or we can totally skip this rule?
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": 2,
        "@typescript-eslint/no-var-requires": 2,
        "@typescript-eslint/array-type": [2, { default: "array-simple" }],
        "@typescript-eslint/no-magic-numbers": [
          2,
          {
            ignore: [-1, 0, 1, 2],
            enforceConst: true,
            ignoreArrayIndexes: true,
          },
        ],
      },
    },
    {
      files: ["**/*.styles.ts", "**/*.types.ts", "**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-magic-numbers": 0,
      },
    },
    {
      files: [
        "**/*.test.ts?(x)",
        "**/*.stories.ts?(x)",
        "src/utils/storybook/*.stories.tsx",
      ],
      rules: {
        "react/no-multi-comp": 0,
        "import/no-default-export": 0,
        "import/no-anonymous-default-export": 0,
        "sonarjs/no-duplicate-string": 0,
      },
    },
    {
      files: ["**/*.test.ts?(x)"],
      rules: {
        "react/jsx-handler-names": 0,
        "jest/consistent-test-it": [2, { fn: "it", withinDescribe: "it" }],
        "jest/no-duplicate-hooks": 2,
        "jest/no-large-snapshots": ["warn", { maxSize: 12, inlineMaxSize: 6 }], // TODO correct sizes
        "jest/prefer-hooks-on-top": 2,
        "jest/prefer-spy-on": 1,
        "jest/prefer-todo": 1,
        "jest/require-to-throw-message": 2,
        "jest/require-top-level-describe": 2,
        "jest/expect-expect": [
          "error",
          {
            assertFunctionNames: [
              "expect",
              "expectQuerySetPayload",
              "expectQueryRejectWithError",
              "expectActionSetPayload",
              "expectActionRejectWithError",
              "testSaga",
              "expectSaga",
            ],
          },
        ],
      },
    },
    {
      files: ["src/types/dto/**/*.types.ts"],
      rules: {
        "@typescript-eslint/no-namespace": 0,
        "no-redeclare": 0,
        "@typescript-eslint/ban-types": 0,
        "id-length": 0,
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "import/no-default-export": 0,
      },
    },
    {
      files: ["contentful/**/*.*"],
      rules: {
        "sonarjs/no-duplicate-string": 0,
      },
    },
  ],
  rules: {
    // fix "ESLint: 'React' was used before it was defined.(no-use-before-define)"
    // https://stackoverflow.com/a/64024916
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": 2,
    "prettier/prettier": 1,
    curly: 2,
    "no-redeclare": 2,
    "no-shadow": 2,
    "prefer-template": 2,
    "no-useless-concat": 2,
    "no-console": 2,
    "no-debugger": 2,
    "id-length": [
      2,
      {
        exceptions: [
          "i",
          "j",
          "_",
          "e",
          "to",
          "cc",
          "fn",
          "fs",
          "id",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "ws",
          "qs",
          "is",
        ],
        min: 3,
        max: 100,
        properties: "always",
      },
    ],
    "react/jsx-curly-brace-presence": 2,
    "react/jsx-key": 2,
    "react/jsx-handler-names": [
      0,
      {
        eventHandlerPrefix: "(handle|on)",
        eventHandlerPropPrefix: "on",
        checkLocalVariables: true,
        checkInlineFunction: false,
      },
    ],
    "react/destructuring-assignment": 2,
    "react/no-multi-comp": 2,
    "react/no-typos": 2,
    "react/no-unused-prop-types": 2,
    "react/require-default-props": 0, // TODO
    "react/prop-types": 0, // TODO
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 2,
    "import/no-namespace": [
      2,
      {
        ignore: ["yup"],
      },
    ],
    "import/newline-after-import": 2,
    // 'import/no-extraneous-dependencies': 2, // TODO check how can we use it
    "import/no-mutable-exports": 2,
    "import/no-unused-modules": 2,
    "import/no-default-export": 2,
    "import/default": 0,
    // todo: this rule was temporary disabled, it isn't compatible with path aliases.
    "import/no-unresolved": 0,
    "react/react-in-jsx-scope": 0,
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        pathGroups: [
          {
            pattern: "react+(|-dom)",
            group: "external",
            position: "before",
          },
          {
            pattern: "~/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "formatjs/no-offset": 2, // https://formatjs.io/docs/tooling/linter/
    "formatjs/no-multiple-plurals": 2,
    "formatjs/enforce-placeholders": 2,
    "promise/no-return-wrap": [2, { allowReject: true }],
    "promise/prefer-await-to-then": 2,
    "@typescript-eslint/no-var-requires": 0, // TODO to remove
    "object-shorthand": 2,
  },
};
