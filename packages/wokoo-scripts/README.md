# wokoo-scripts

使用 nodejs 编写的脚本工具，用于初始化一个基于 [wokoo-template](https://www.npmjs.com/package/wokoo-template) 模板的，有基础配置的油猴项目

## 功能

- 分析用户在控制台输入的命令
- 和用户交互，拉取 wokoo-template，生成对应的初始项目

## 使用

1. 安装

```
npm i wokoo -g
```

2. 创建项目

```
wokoo my-plugin
```

3. 命令行中会弹出询问：
   ? which template do you prefer?
   [ ] react
   [ ] vue
4. 选择对应模板，生成初始化项目

## 使用到的库

- [chalk](https://www.npmjs.com/package/chalk) 丰富控制台显示的字颜色
- [cross-spawn](https://www.npmjs.com/package/cross-spawn) 开启子线程
- [commander](https://www.npmjs.com/package/commander) 提供命令行交互
- [fs-extra](https://www.npmjs.com/package/fs-extra) 操作文件
- [inquirer](https://www.npmjs.com/package/inquirer) 命令行弹出选项
- [metalsmith](https://www.npmjs.com/package/metalsmith) 遍历文件夹
- [consolidate](https://www.npmjs.com/package/consolidate) 渲染 ejs 模板

## 目录结构

```
.
├── README.md
├── bin
│   └── www
├── index.js
├── modifyTemplate.js
├── package-lock.json
└── package.json
```

## 了解更多

如果想了解更多内容，请访问下面的网址：
[油猴脚手架 wokoo 使用说明](https://juejin.cn/post/6922815205575491597)
[油猴脚手架 wokoo git 仓库](https://github.com/kinyaying/wokoo)
