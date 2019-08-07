const fs = require("fs");
const chalk = require("chalk");

module.exports = function(name) {
  return new Promise((resolve, reject) => {
    fs.exists(name, exists => {
      if (exists) {
        console.log(chalk.red(`${name} 文件夹已存在. 请检查或更换!`));
        process.exit(1);
        reject(exists);
      } else {
        resolve();
      }
    });
  });
};
