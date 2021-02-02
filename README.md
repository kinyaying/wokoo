油猴：
优势：

1. 不用发布审核
2. 油猴封装的 api

缺点：
能力依赖油猴插件，如果油猴插件不支持则搞不定

油猴插件支持的原生能力：

记得确认 node 版本：^10 || ^12 || >=14，否则会安装失败

# Wokoo 使用说明

此项目使用 Wokoo 脚手架搭建的。[Wokoo](https://github.com/facebook/create-react-app).

## 开发

1. 起服务
   `npm start`
2. 浏览器打开网页，确认项目正常
3. 复制 tampermonkey.txt 里的内容到油猴脚本中即可。

## 构建

1. 构建出包
   `npm run build`
2. 将油猴脚手架中的文件指向本地构建出的文件地址，测试是否正常
3. 部署 dist 目录下的文件

## 自带的库

- vue
- less

## 目录结构

## 了解更多

如果想了解更多内容，请访问下面的网址：
油猴脚手架 Wokoo 开发篇
油猴脚手架 Wokoo 使用说明
油猴脚手架 Wokoo git 仓库
