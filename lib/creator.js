/*
 * @Author: Jurieo
 * @Date: 2019-08-07 16:41:30
 * @LastEditTime: 2019-09-10 09:46:45
 * @Description: 拷贝文件和安装依赖
 */
// 写入文件，安装依赖
const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");
const { spawn } = require("child_process");
const handlebar = require("handlebars");
const store = require("./store");
const clearConsole = require("./utils/clearConsole");
const packageManagement = require("./utils/packageManagement");

module.exports = function(answer) {
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, "../template");
  // 目标路径
  const dest = path.resolve(process.cwd(), store.dirname);

  console.log("");
  console.log(`> 正在创建项目，路径为 ${chalk.yellow(dest)}`);
  console.log(`> ${chalk.greenBright("项目创建成功！")}`);

  // 拷贝模板文件
  fs.copy(src, dest).then(() => {
    const pkgfile = dest + "/package.json";
    const startfile = dest + "/start.json";
    const meta = {
      name: answer.projectName,
      description: answer.description,
      author: answer.author
    };
    if (fs.existsSync(pkgfile)) {
      const content = fs.readFileSync(pkgfile).toString();
      const resultContent = handlebar.compile(content)(meta);
      fs.writeFileSync(pkgfile, resultContent);
    }
    if (fs.existsSync(startfile)) {
      const content = fs.readFileSync(startfile).toString();
      const resultContent = handlebar.compile(content)(meta);
      fs.writeFileSync(startfile, resultContent);
    }
    // 执行自动安装依赖
    if (answer.installDev) spawnCmd(dest);
    else finshShowCmd(1);
  });
};

/**
 * 安装依赖指令
 * @param {string} dest 需要执行指令的路径
 */
function spawnCmd(dest) {
  console.log(`> 请稍后,正在安装依赖...\n`);
  // 依赖安装命令
  let _packageManagement = packageManagement();
  const cmd = _packageManagement === "npm" ? "npm install" : "yarn";

  const ls = spawn(cmd, {
    cwd: dest,
    stdio: "inherit",
    shell: true
  });
  ls.on("close", code => {
    // 成功安装依赖
    if (code === 0) {
      console.log(`\n> ${chalk.greenBright(`依赖安装完成！`)}`);
      finshShowCmd();
    }
  });
}

function finshShowCmd(type) {
  const pkgm = packageManagement() === "npm" ? "npm run" : "yarn";

  console.log("> 从以下命令开始吧:\n");
  console.log("");
  console.log(chalk.gray(" $ ") + chalk.greenBright(`cd ${store.dirname}`));
  if (type) {
    console.log(chalk.gray(" $ ") + chalk.greenBright(`${pkgm} install`));
  }

  console.log(chalk.gray(" $ ") + chalk.greenBright(`${pkgm} dev`));
  console.log("");
  // clearConsole();
}
