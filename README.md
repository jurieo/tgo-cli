<!--
 * @Author: Jurieo
 * @Date: 2019-08-07 16:32:27
 * @LastEditTime: 2019-09-10 10:04:11
 * @Description: readme
 -->

## TGO-cli

TGO-cli 是一套基于 SSR 快速搭建 TGO 开发环境的脚手架工具，基于 NUXTJS 和 vant UI 框架，使用 pm2 做负载均衡。

### 安装

使用 yarn

```
$ yarn global add tgo-cli
```

使用 npm

```
$ npm install tgo-cli -g
```

### 使用

创建项目

```
$ tgo create my-project
$ cd my-project
```

启动开发环境

```
$ yarn dev
```

生成打包并使用 pm2 启动项目

```

$ yarn pm2start

```
