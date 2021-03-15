# Wokoo脚手架

- 一键式创建基于油猴插件的基础工程
- 自带的油猴配置文件 👉 tampermonkey.js
- 提供实时开发，实时查看插件效果的解决方案
- 提供绕过csp安全策略解决方案


不太了解油猴插件是什么？先阅读这篇文章补充基础知识吧 [Chrome 插件大杀器：「油猴」Tampermonkey 使用详解](https://zhuanlan.zhihu.com/p/99390731)

如何使用？ 👉 [5分钟上手开发浏览器插件——油猴脚手架wokoo(使用篇)](https://juejin.cn/post/6922815205575491597)

还提供了两款有意思的油猴插件开发案例 👉 [快速上手油猴插件开发（实战篇）](https://juejin.cn/post/6925605904561750030/)

想知道Wokoo脚手架怎么搭建的吗？ 👉 [wokoo脚手架（搭建篇）](https://juejin.cn/post/6925613440752943112#)


# 使用

1. 创建基础项目

  ```shell
   npx wokoo my-app
  ```

2. 起服务

  ```
   npm start
  ```

3. 复制tampermonkey.js内容到 [油猴插件编辑器](chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/options.html#url=&nav=new-user-script) ，注意：要复制全部内容，包括注释部分。（此步骤默认你已经安装了油猴插件，没安装的话就安装下 👉[油猴插件安装地址](https://chrome.google.com/webstore/detail/tampermonkey-beta/gcalenpjmijncebpfijmoaglllgpjagf?hl=zh-CN)）
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/811cad2db5cb4332bfec83ea697aa2a2~tplv-k3u1fbpfcp-watermark.image)


4. 打开某网页，你能看到一只的猴子🐒，代表流程已跑通，你只需开发自己的业务代码即可🎉。
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f8e6a5a044f4f2980febedf066bbcd1~tplv-k3u1fbpfcp-watermark.image)

