const MetalSmith = require('metalsmith') // 遍历文件夹
let { render } = require('consolidate').ejs
const { promisify } = require('util')
const path = require('path')
render = promisify(render) // 包装渲染方法

/**
 *
 * @param {*} fromPath 源路径
 * @param {*} toPath 目标路径
 */
async function handleTemplate(fromPath, toPath, config) {
  await new Promise((resovle, reject) => {
    MetalSmith(__dirname)
      .source(fromPath) // 遍历下载的目录
      .destination(path.join(path.resolve(), toPath)) // 输出渲染后的结果
      .use(async (files, metal, done) => {
        // result 替换模板内数据
        let result = {
          license: 'MIT',
          version: '0.0.1',
          ...config,
        }
        const data = metal.metadata()
        Object.assign(data, result) // 将询问的结果放到metadata中保证在下一个中间件中可以获取到
        done()
      })
      .use((files, metal, done) => {
        Reflect.ownKeys(files).forEach(async (file) => {
          let content = files[file].contents.toString() // 获取文件中的内容
          if (
            file.includes('.js') ||
            file.includes('.json') ||
            file.includes('.txt') ||
            file.includes('.md')
          ) {
            // 如果是md或者txt才有可能是模板
            if (content.includes('<%')) {
              // 文件中用<% 我才需要编译
              content = await render(content, metal.metadata()) // 用数据渲染模板
              files[file].contents = Buffer.from(content) // 渲染好的结果替换即可
            }
          }
        })
        done()
      })
      .build((err) => {
        // 执行中间件
        if (!err) {
          resovle()
        } else {
          reject(err)
        }
      })
  })
}

module.exports = handleTemplate
