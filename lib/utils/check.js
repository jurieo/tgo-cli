/*
 * @Author: Jurieo
 * @Date: 2019-08-07 16:41:30
 * @LastEditTime: 2019-10-14 17:33:03
 * @Description: 检查版本
 */
const semver = require("semver");
const chalk = require("chalk");
const requiredVersion = require("../../package.json").version;
const Ora = require("ora");
const spinner = new Ora();
const latestVersion = require("latest-version");

/**
 * 检测 Node 版本
 * @param {string} wanted 期望版本号
 * @param {string} id 项目名（tgo-cli）
 */
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        `你正在使用 Node${process.version},但 ${id} 需要 Node${wanted}.\n 请更新后重试`
      )
    );
    process.exit(1);
  }
  // 提示未来不再支持 node 9.x 版本
  if (semver.satisfies(process.version, "9.x")) {
    console.log(
      chalk.yellow(
        `你正在使用 Node ${process.version}.\n 未来本项目将不再支持Node.js 9.x 请及时升级.\n`
      )
    );
  }
}

/**
 * 通过 npm 检测是否更新包
 * @param {string} url npm包路径
 * @returns {Promise}
 */
function checkPackageVersion(url) {
  return new Promise((resolve, reject) => {
    spinner.start("正在检查TGO-cli的版本信息.");
    latestVersion("tgo-cli").then(version => {
      if (semver.lte(version, requiredVersion)) {
        spinner.stop();
        resolve();
      } else {
        spinner.stop();
        console.log(
          chalk.red(
            `发现新版 TGO-cli v${version}，你正在使用的 TGO-cli 版本为 v${requiredVersion}.\n请更新至最新版后再重试. \n\n>> npm update tgo-cli -g`
          )
        );
        process.exit(1);
      }
    });
  });
}

module.exports = {
  checkNodeVersion,
  checkPackageVersion
};
