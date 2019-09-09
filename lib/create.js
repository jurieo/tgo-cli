/*
 * @Author: Jurieo
 * @Date: 2019-08-07 16:41:30
 * @LastEditTime: 2019-09-09 16:32:00
 * @Description: 问题选项
 */
// 初始化创建步骤选项列表
const inquirer = require("inquirer");
const store = require("./store");

module.exports = async function() {
  const answers = await inquirerBase();
  require("./creator")(answers);
};

// 一级菜单 基本选项
function inquirerBase() {
  return new Promise(resolve => {
    inquirer.prompt(questions).then(answers => {
      // console.log(answers);
      resolve(answers);
    });
  });
}

const questions = [
  {
    name: "projectName",
    message: "请输入项目名称",
    default: process.argv[3]
  },
  {
    name: "description",
    message: "请输入项目描述信息",
    default: "这是tgo-cli脚手架生成的项目"
  },
  {
    name: "author",
    message: "请输入作者名称",
    default: process.env.USERNAME
  }
];
