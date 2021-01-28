# wokoo-template

是 wokoo 脚手架的模板部分，配合 [wokoo-scripts](https://www.npmjs.com/package/wokoo-scripts)，用于初始化一个有基础配置的油猴项目。

## 功能

- 提供 vue 和 react 的基本工程项目，根据用户选择生成指定基础项目
- 提供基础的 webpack 配置
- tampermonkey.txt 提供基本的油猴脚本配置

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

- vue
- react
- less
- webpack

## 目录结构

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── icon.jpg
│   └── index.html
├── react-template
│   ├── README.md
│   ├── src
│   │   ├── app.css
│   │   ├── app.js
│   │   └── index.js
│   ├── tampermonkey.txt
│   ├── template.json
│   └── webpack.config.base.js
├── vue-template
│   ├── README.md
│   ├── src
│   │   ├── app.less
│   │   ├── app.vue
│   │   └── index.js
│   ├── tampermonkey.txt
│   ├── template.json
│   └── webpack.config.base.js
└── webpack.config.js
```

## 了解更多

如果想了解更多内容，请访问下面的网址：
[油猴脚手架 wokoo 使用说明](https://juejin.cn/post/6917643212119244813)
[油猴脚手架 wokoo git 仓库](https://github.com/kinyaying/wokoo)
