const MetalSmith = require('metalsmith') // 遍历文件夹
let { render } = require('consolidate').ejs
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
render = promisify(render) // 包装渲染方法
console.log('MetalSmith:', render)
// 没有ask文件说明不需要编译
// if (!fs.existsSync(path.join(target, 'ask.js'))) {
//   await ncp(target, path.join(path.resolve(), projectName))
// } else {
// const target = 'vue-template' // 源路径
// const projectName = 'temp' // 目标路径
/**
 *
 * @param {*} fromPath 源路径
 * @param {*} toPath 目标路径
 */
async function handleTemplate(fromPath, toPath) {
  await new Promise((resovle, reject) => {
    MetalSmith(__dirname)
      .source(fromPath) // 遍历下载的目录
      .destination(path.join(path.resolve(), toPath)) // 输出渲染后的结果
      .use(async (files, metal, done) => {
        console.log('middleware 1')
        // 弹框询问用户
        // const result = await Inquirer.prompt(
        //   require(path.join(fromPath, 'ask.js'))
        // )
        let result = {
          projectName: 'my test',
          private: false,
          author: 'kin',
          description: 'this is test',
          license: 'MIT',
          version: '0.0.1',
          basicProject: 'react',
        }
        const data = metal.metadata()
        Object.assign(data, result) // 将询问的结果放到metadata中保证在下一个中间件中可以获取到
        // delete files['ask.js']
        done()
      })
      .use((files, metal, done) => {
        console.log('middleware 2')
        Reflect.ownKeys(files).forEach(async (file) => {
          let content = files[file].contents.toString() // 获取文件中的内容
          if (
            file.includes('.js') ||
            file.includes('.json') ||
            file.includes('.txt') ||
            file.includes('.md')
          ) {
            // 如果是js或者json才有可能是模板
            if (content.includes('<%')) {
              // 文件中用<% 我才需要编译
              content = await render(content, metal.metadata()) // 用数据渲染模板
              console.log('Buffer.from(content)::', content)

              // fs.writeFileSync(
              //   path.join('', 'package.json'),
              //   JSON.stringify(appPackage, null, 2) + os.EOL
              // )

              files[file].contents = Buffer.from(content) // 渲染好的结果替换即可
            }
          }
        })
        done()
      })
      .build((err) => {
        console.log('middleware 3', err)
        // 执行中间件
        if (!err) {
          resovle()
        } else {
          reject(err)
        }
      })
  })
}

// handleTemplate().then((r) => {
//   console.log('success')
// })
module.exports = handleTemplate
