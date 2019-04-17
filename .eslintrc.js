/**
 * Rules  https://eslint.org/docs/rules/
 */
module.exports = {
    "root": true,
    env:{
        'es6':true,
        'node':true
    },
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    extends:['eslint:recommended'],
    parserOptions: {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": false
        },
        "project": "src/tsconfig.json"
    },
    rules: {
        // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
        'typescript/class-name-casing': 'error',

        // 禁用未声明的变量
        'no-undef': 'off',
        // 禁止在语句末尾使用分号
        'semi': ['error', 'never'],
        // 强制在逗号后使用空格
        'comma-spacing': ['error', {"before": false, "after": true}],
        // 限定单引号字符串
        'quotes': ['error', 'single'],
        // 限定代码缩进4个空格
        'indent': ['error', 4],
        // 强制使用 Unix 换行符： \n
        'linebreak-style': ['error', 'unix'],
        // 允许使用console
        'no-console': 'off'
    }
}
