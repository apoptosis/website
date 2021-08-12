module.exports = {
    "root": true,
    "env": {
        "es6": true
    },
    "plugins": ["@typescript-eslint"],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "rules": {
        "indent": ["error", 4]
    },
    "ignorePatterns": ["gatsby-config.js", ".eslintrc.js"],
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "plugins": ["@typescript-eslint"],
            "parser": "@typescript-eslint/parser",
            "rules": {
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "semi": ["error", "never"]
            }
        },
        {
            "files": ["*.ts", "*.tsx"],
            "plugins": [
                "simple-import-sort",
                "unused-imports",
                "import",
                "import-newlines"
            ],
            "rules": {
                "indent": "off",
                "no-unused-vars": "off",
                "unused-imports/no-unused-imports": "error",
                "unused-imports/no-unused-vars": [
                    "warn",
                    {
                        "vars": "all",
                        "varsIgnorePattern": "^_",
                        "args": "after-used",
                        "argsIgnorePattern": "^_"
                    }
                ],
                "@typescript-eslint/indent": ["error", 4],
                "import/first": "error",
                "import/newline-after-import": ["error", { "count": 2 }],
                "import/no-duplicates": "error",
                "import/no-absolute-path": "error",
                "no-multiple-empty-lines": ["warn", { "max": 2 }],
                "padded-blocks": ["error", "never"],

                "import-newlines/enforce": [
                    "error",
                    {
                        "items": 2,
                        "max-len": 100,
                        "semi": false
                    }
                ],

                "object-curly-newline": [
                    "error",
                    {
                        "ObjectExpression": { "multiline": true },
                        "ObjectPattern": { "multiline": true }
                    }
                ],

                "simple-import-sort/imports": [
                    "error",
                    {
                        "groups": [
                            // Node.js builtins. You could also generate this regex if you use a `.js` config.
                            // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
                            [
                                "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)"
                            ],
                            // Packages. `react` related packages come first.
                            // Internal packages.
                            ["^react"],
                            ["^[a-zA-Z]*"],
                            ["^@(?!react-ecs)(.*|$)"],
                            ["^@react-ecs/(.*|$)"],
                            // Side effect imports.
                            ["^\\u0000"],
                            // Parent imports. Put `..` last.
                            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            // Style imports.
                            ["^.+\\.s?css$"]
                        ]
                    }
                ],

                "simple-import-sort/exports": "error",

                "comma-dangle": [
                    "error",
                    {
                        "arrays": "always-multiline",
                        "objects": "always-multiline",
                        "imports": "always-multiline",
                        "exports": "always-multiline",
                        "functions": "never"
                    }
                ]
            }
        }
    ]
}
