/*
 * @Author: Jurieo
 * @Date: 2019-08-07 16:41:30
 * @LastEditTime: 2019-09-09 16:13:16
 * @Description: 拷贝文件和安装依赖
 */
// 写入文件，安装依赖
const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");
const { spawn } = require("child_process");
const handlebar = require("handlebars");
const store = require("./store");
// const appendFiles = require("./appendFiles");
const clearConsole = require("./utils/clearConsole");
const packageManagement = require("./utils/packageManagement");

module.exports = function(answer) {
  // CLI 模板文件夹路径
  const src = path.resolve(__dirname, "../template");
  // 目标路径
  const dest = path.resolve(process.cwd(), store.dirname);

  clearConsole("cyan", `TGO-cli t v${require("../package").version}`);
  console.log(`> Creating project in ${chalk.yellow(dest)}`);
  console.log(`> ${chalk.greenBright("项目创建成功！")}`);
  console.log(`> 请稍后,正在安装依赖...`);
  console.log("");

  // 拷贝模板文件
  fs.copy(src, dest).then(() => {
    const fileName = dest + "/package.json";
    const meta = {
      name: answer.projectName,
      description: answer.description,
      author: answer.author
    };
    if (fs.existsSync(fileName)) {
      const content = fs.readFileSync(fileName).toString();
      const resultContent = handlebar.compile(content)(meta);
      fs.writeFileSync(fileName, resultContent);
    }
    console.log(dest);
    // 根据选项写入文件
    // appendFiles();
    // 执行自动安装依赖
    // spawnCmd(dest);
  });
};

/**
 * 安装依赖指令
 * @param {string} dest 需要执行指令的路径
 */
function spawnCmd(dest) {
  // 依赖安装命令
  let _packageManagement = packageManagement();
  // let cmdInstall = _packageManagement === "yarn" ? "add -D " : "install -D ";
  // store.options.dependencies.forEach(item => {
  //   cmdInstall += `${item.name}@^${item.version} `;
  // });
  // console.log(store.options.dependencies);
  // console.log(cmdInstall);
  // return;
  // 使用 taobao 镜像
  // if (_packageManagement === "npm")
  //   cmdInstall += "--registry=https://registry.npm.taobao.org";
  const ls = spawn(_packageManagement, {
    cwd: dest,
    stdio: "inherit",
    shell: true
  });
  ls.on("close", code => {
    // 成功安装依赖
    if (code === 0) {
      clearConsole("cyan", `TGO-cli v${require("../package").version}`);
      console.log("> Get started with the following commands:");
      console.log("");
      console.log(chalk.gray(" $ ") + chalk.blueBright(`cd ${store.dirname}`));
      console.log(
        chalk.gray(" $ ") +
          chalk.blueBright(
            `${packageManagement() === "npm" ? "npm run" : "yarn"} dev`
          )
      );
    }
  });
}
