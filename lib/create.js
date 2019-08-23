// 初始化创建步骤选项列表
const { inquirerList, dependencies } = require("./store");
const inquirer = require("inquirer");
const store = require("./store");

module.exports = async function() {
  const answersStep = [];
  await inquirerBase(answersStep);
  await hasPrecss(answersStep);
  require("./creator")();
};

// 一级菜单 基本选项
function inquirerBase(answersStep) {
  return new Promise(resolve => {
    const inquirerOptions = inquirer.createPromptModule();
    inquirerOptions(inquirerList).then(answers => {
      answers.options.forEach(item => {
        if (store.options[item] === false) store.options[item] = true;
      });
      resolve();
    });
  });
}
