## <%=projectName%>

基于 wokoo 搭建的初始化工程，用于油猴插件开发。

**基础配置：**

- <%=basicProject%>
- less

## 目录结构
.
├── README.md               说明
├── package-lock.json
├── package.json
├── public                  静态文件
│   ├── favicon.ico
│   ├── icon.jpg
│   └── index.html          html文件
├── src
│   ├── app.less
│   ├── app.vue
│   └── index.js            项目入口
├── tampermonkey.txt        油猴脚本入口文件
├── webpack.config.base.js  
└── webpack.config.js       webpack配置

## 开发

**启动**
```shell
npm start
```

**调试**
1. 打开浏览器，输入`localhost:8080`，查看页面展示是否正常。
2. 安装油猴插件
3. 打开油猴插件编辑界面，将tampermonkey.txt里的内容复制到编辑框中，保存。
4. 打开任意一个网页，比如`www.baidu.com`，
  - 查看油猴icon是否有一个 1 的数字标志，如果有说明油猴脚本已经成功激活
  - 网页的右上角会出现初始页面

**构建**
```shell
npm run build
```

## 如何发布插件到油猴市场
油猴市场的优点是不用审核，即发即用，非常方便。
1. 将/dist/app.bundle.js文件部署到cdn上，获取到对应url。（可以放到github上，如果托管到git上最好做cdn加速）
2. 登录[油猴市场](https://greasyfork.org/)，谷歌账号或 github账号都可使用。
3. 点击账号名称，再点击**发布你编写的脚本**
4. 进入编辑页，将tampermonkey.txt里的内容复制到编辑框中，记得将里面的`localhost:8080`网址替换成静态资源url
5. 切换脚本语言为 「中文」, 否则影响搜索
6. 点击 「发布脚本」即可

## 例子 demo
我已经使用wokoo脚手架开发了多个demo，并发布到[油猴市场](https://greasyfork.org/)，欢迎安装试用。
[wokoo-demo](https://greasyfork.org/zh-CN/scripts/420327-wokoo-demo)

## 了解更多

如果想了解更多内容，请访问下面的网址：
[油猴脚手架 Wokoon 使用说明](https://juejin.cn/post/6917643212119244813)
[油猴脚手架 Wokoo git 仓库](https://github.com/kinyaying/wokoo)
