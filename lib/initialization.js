// 初始化基本命令及参数

const program = require("commander");
const { checkPackageVersion } = require("./utils/check");
const requiredNodeVersion = require("../package.json").engines.node;
const requiredPackageVersion = require("../package.json").version;
const clearConsole = require("./utils/clearConsole");
const { checkNodeVersion } = require("./utils/check");
const hasDir = require("./utils/hasDir");
const store = require("./store");

// 初始化命令
function programConfig() {
  program.version(requiredPackageVersion).usage("<command> [options]");

  // 配置 项目创建指令
  program
    .command("create <app-name>")
    .description("通过tgo-cli脚手架创建一个项目")
    .option("-n, noversion", `禁止版本检测`)
    .action(async (name, cmd) => {
      // 判断是否存在创建的目录
      await hasDir(name);
      store.cmd = "create";
      store.dirname = name;
      // 清空控制台，并输出当前 tgo-cli 版本
      clearConsole("cyan", `TGO-cli v${requiredPackageVersion}`);

      // 检测 tgo-cli 版本（通过 npm 获取 latest 版本号）
      // await checkPackageVersion(store.npmVersionUrl);

      require("./creator")();
    });

  // 执行
  program.parse(process.argv);
}

module.exports = function initialization() {
  // 检测 node 版本
  checkNodeVersion(requiredNodeVersion, "tgo-cli");
  // commander 配置
  programConfig();
};
