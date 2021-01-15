const chalk = require('chalk')
const spawn = require('cross-spawn')
const { Command } = require('commander')
const fs = require('fs-extra')
const { resolve } = require('path')
const path = require('path')
const { inherits } = require('util')
const { runInContext } = require('vm')
const packageJson = require('./package.json')
const { exec } = require('child_process')
const handleTemplate = require('./handleTemplate')
let program = new Command()
init()
async function init() {
  let projectName
  program
    .version(packageJson.version)
    .arguments('<project-directory>') // 项目目录名 参数格式：<必选> [可选]
    .usage(`${chalk.green(`<project-directory>`)}`)
    .action((name) => {
      projectName = name
      console.log('projectName:::', projectName)
    })
    .parse(process.argv) // [node路径，脚本路径，参数]
  await createApp(projectName)
}
console.log('program::::', program.info)
async function createApp(appName) {
  let root = path.resolve(appName) // 要生成的项目的绝对路径
  fs.ensureDirSync(appName) // 没有则创建文件夹
  console.log(`create a new app in ${chalk.green(root)}`)

  const packageJson = {
    name: appName,
    version: '0.0.1',
    private: true,
  }
  // 编写package.json
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )
  const originalDirectory = process.cwd()
  process.chdir(root) //改变工作目录，进入项目目录
  console.log('----', originalDirectory, root, appName)

  await run(root, appName, originalDirectory)
}
/**
 *
 * @param {*} root 项目路径
 * @param {*} appName 项目名
 * @param {*} originalDirectory 原始工作目录
 */
async function run(root, appName, originalDirectory) {
  const scriptName = 'moment'
  const templateName = 'wokoo-template'
  const allDependencies = [templateName, scriptName, 'lodash']
  // 安装wokoo-template包
  console.log('Installing packages. This might take a couple of minutes')
  console.log(`Installing ${chalk.cyan(templateName)} ...`, 1111)
  try {
    await install(root, allDependencies)
  } catch (e) {
    console.log(`Installing ${chalk.red(templateName)} failed ...`, e)
  }

  // // 根目录 项目名字 是否显示详细信息 原始目录  模板
  // let data = [root, appName, true, originalDirectory, templateName]
  // let source = `
  //     var init = require('react-scripts/scripts/init.js')
  //     console.log('process.argv[1]::::', process.argv[1])
  //     init.apply(null, JSON.parse(process.argv[1]))
  // `
  // await executeNodeScript({ cwd: process.cwd() }, data, source)

  // /Users/kin/MyCode/wokoo/packages/wokoo-template
  const templatePath = path.dirname(
    require.resolve(`${templateName}/package.json`, { paths: [root] })
  )
  console.log('templatePath:::', templatePath)
  // Copy the files for the user
  const scriptsConfigDir = path.join(templatePath, 'webpack.config.js')
  const gitConfigDir = path.join(templatePath, '.gitignore')
  console.log('templatePath:', templatePath, scriptsConfigDir)
  // const removeList = ['vue-template', 'react-template', '']
  const tempDir = path.join(root, 'temp')
  if (fs.existsSync(templatePath)) {
    // /Users/kin/MyCode/wokoo/packages/wokoo-template
    // fs.copySync(templatePath, root) //拷贝整个模板到项目路径
    await handleTemplate(templatePath + '/vue-template', 'temp')
    console.log('success')
    // 删除不用的文件，整理目录
    fs.copySync(tempDir, root) // 源 目标
    fs.copySync(templatePath + '/public', root + '/public')
    fs.copyFileSync(scriptsConfigDir, root + '/webpack.config.js')
    fs.copyFileSync(gitConfigDir, root + '/.gitignore')
    deleteFolder(tempDir)
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    )
    return
  }

  console.log('done!')
  process.exit(0)
}
// async function executeNodeScript({ cwd }, data, source) {
//   return new Promise((resolve) => {
//     // 开启子线程
//     const child = spawn(
//       process.execPath,
//       ['-e', source, '--', JSON.stringify(data)],
//       { cwd, stdio: 'inherit' }
//     ) // node -e source -- JSON.stringify(data)  => 把data传给source
//     child.on('close', resolve)
//   })
// }
async function install(root, allDependencies) {
  return new Promise((resolve) => {
    const command = 'npm'
    const args = [
      'install',
      '--save',
      '--save-exact',
      '--loglevel',
      'error',
      ...allDependencies,
      '--cwd',
      root,
    ]
    // const args = ['add', '--exaxt', ...allDependencies, '--cwd', root] // root指定子进程工作目录
    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('close', resolve) // 安装成功后触发resolve
  })
}

/**
 * 删除文件、文件夹
 * @param {*} path 要删除资源的路径
 */
function deleteFolder(path) {
  let files = []
  if (fs.existsSync(path)) {
    if (!fs.statSync(path).isDirectory()) {
      // path是文件，直接删除
      fs.unlinkSync(path)
    } else {
      // 删除文件夹
      files = fs.readdirSync(path)
      files.forEach(function (file) {
        let curPath = path + '/' + file
        deleteFolder(curPath)
      })
      fs.rmdirSync(path)
    }
  }
}

async function copyFile(from, to) {
  return new Promise((resolve, reject) => {
    fs.copyFile(from, to, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve('success')
      }
    })
  })
}
