/*
 * @Author: Jurieo
 * @Date: 2019-08-07 16:41:30
 * @LastEditTime: 2019-09-09 17:21:23
 * @Description: 输出日志
 */
const chalk = require("chalk");
const readline = require("readline");
const store = require("../store");

/**
 * 控制台清空，并输出提示信息
 * @param {String} 输出信息颜色
 * @param {String} 输出信息
 */

function clearConsole(color, str) {
  if (process.stdout.isTTY && store.cmd !== "test") {
    console.log("");
    const cutLine = ` TGO-cli ${require("../../package.json").version} `;
    console.log(
      chalk.bgCyan(
        " -".repeat((process.stdout.columns - cutLine.length) / 4) +
          cutLine +
          "- ".repeat((process.stdout.columns - cutLine.length) / 4)
      )
    );
    const blank = "\n".repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    console.info(chalk[color](str));
    console.log("");
  }
}

module.exports = clearConsole;
