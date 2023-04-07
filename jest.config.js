/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
const config = {

  testEnvironment: "jsdom",

  testMatch: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],

  setupFilesAfterEnv: ["<rootDir>/src/test/utils/setup.ts"],

  // 除外するフォルダーを指定する 
  testPathIgnorePatterns: [
    "<rootDir>/src/test/utils/", // セットアップが入っているフォルダーは除外する
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
  ],

  // コンパイル対象外のフォルダーを指定
  transformIgnorePatterns: ["/node_modules/"],

  transform: {
    ".+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true, // エラーを見やすくする( 有効じゃないと内容がズレて表示されます )

        module: {
          type: "commonjs",  // 出力するファイルをcommonjsとする
        },

        jsc: {
          parser: {
            syntax: "typescript", // ソースコードをtypescriptとしてパースする
            tsx: true, // jsx記法を許可する
          },

          transform: {
            react: {
              // 必須。省略すると "ReferenceError: React is not defined" が発生します
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};

module.exports = config;