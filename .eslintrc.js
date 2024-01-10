module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jquery":true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        },
        {
            "files": ["src/**/*.js"],
            "excludedFiles": ["src/dist/"],
            "rules": {
                // Add rules specific to the files you want to exclude or modify
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        // General rules for all files
    },
    "globals": {
        "DayPilot": "readonly"
    }
}
