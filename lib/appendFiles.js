// 根据配置写入文件

const fs = require("fs-extra");
const store = require("./store");
const version = require("../package.json").version;

// index.html 模板文件
const htmlTemp = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${store.dirname}</title>
</head>
<body>
  <p>TGO-cli v${version}</p>
</body>
</html>
`;

const entry = [
  `./src/scripts/index.js`,
  `./src/styles/index.${store.options.precss}`,
  "normalize.css"
];
if (store.options.mobileLayout) entry.push("hotcss");

// tgo.config.js 配置文件
const configTemp = `module.exports = {
  // 入口文件
  entry: [\n    '${entry.join("',\n    '").toString()}'\n  ],
  eslint: ${store.options.eslint},
  babel: ${store.options.babel},
  // 设计稿宽度
  designWidth: ${store.options.mobileLayout ? 750 : 0},
};
`;

// package.json
const packageTemp = `{
    "name": "${store.dirname}",
    "version": "0.1.0",
    "scripts": {
        "serve": "cross-env NODE_ENV=serve x-service",
        "build": "cross-env NODE_ENV=build x-service"
    },
    "license": "ISC",
    "devDependencies": {
      "@babel/core": "7.4.5",
      "@babel/plugin-transform-runtime": "7.4.4",
      "@babel/preset-env": "7.4.5",
      "@babel/runtime": "7.4.5",
      "autoprefixer": "9.6.0",
      "babel-eslint": "10.0.1",
      "babel-loader": "8.0.6",
      "clean-webpack-plugin": "3.0.0",
      "cross-env": "5.2.0",
      "css-loader": "2.1.1",
      "eslint": "5.16.0",
      "eslint-loader": "2.1.2",
      "file-loader": "3.0.1",
      "html-loader": "0.5.5",
      "html-webpack-plugin": "3.2.0",
      "mini-css-extract-plugin": "0.7.0",
      "normalize.css": "8.0.1",
      "postcss-loader": "3.0.0",
      "style-loader": "0.23.1",
      "url-loader": "1.1.2",
      "webpack": "4.33.0",
      "webpack-cli": "3.3.2",
      "webpack-dev-server": "3.5.1",
      "webpack-merge": "4.2.1",
      "x-build": "5.1.3"
    }
 }
`;

/**
 * 遍历创建文件
 * @param {string} dest 相对路径 + 文件名
 * @param {string} temp 文件模板
 */

const confList = [
  {
    // 创建配置文件
    dest: `./${store.dirname}/tgo.config.js`,
    temp: configTemp
  },
  {
    // 通过选项创建 html
    dest: `./${store.dirname}/src/index.html`,
    temp: htmlTemp
  },
  {
    // 创建package.json文件
    dest: `./${store.dirname}/package.json`,
    temp: packageTemp
  }
];

module.exports = function appendFiles() {
  confList.forEach(item => {
    fs.appendFileSync(item.dest, item.temp, {
      flag: "w"
    });
  });
  fs.rename(
    `./${store.dirname}/src/styles/index.css`,
    `./${store.dirname}/src/styles/index.${store.options.precss || "css"}`
  );
};
