const chalk = require('chalk')
const spawn = require('cross-spawn')
const { Command } = require('commander')
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const packageJson = require('./package.json')
const modifyTemplate = require('./modifyTemplate') // 修改替换ejs模板内字段
let program = new Command()
init()
// 程序入口，读取命令行脚本，获得项目名称
async function init() {
  let projectName, target
  program
    .version(packageJson.version)
    .arguments('<project-directory>') // 项目目录名 参数格式：<必选> [可选]
    .usage(`${chalk.green(`<project-directory>`)}`)
    .option('-t, --target [value]', 'chose template')
    .action((...argvs) => {
      const [name] = argvs
      projectName = name
      target = argvs[1].target
    })
    .parse(process.argv) // [node路径，脚本路径，参数]
  await createApp(projectName, target)
}
/**
 * 根据appName生成项目目录
 * @param {*} appName
 */
async function createApp(appName, target) {
  let root = path.resolve(appName) // 要生成的项目的绝对路径
  fs.ensureDirSync(appName) // 没有则创建文件夹
  console.log(`create a new app in ${chalk.green(root)}`)
  // 初始化package.json
  const packageJson = {
    name: appName,
    version: '0.0.1',
    private: true,
    scripts: {
      start: 'cross-env NODE_ENV=development webpack serve',
      build: 'webpack',
    },
  }
  // 写入package.json
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )
  // 改变工作目录，进入项目目录
  process.chdir(root)
  // 复制项目模板，安装项目依赖等
  await run(root, appName, target)
}
/**
 1、安装wokoo-template
 2、复制模板文件到临时文件夹temp，
 3、调用modifyTemplate替换其中的ejs模板
 4、删除临时文件夹temp
 5、卸载wokoo-template
 * @param {*} root 项目路径
 * @param {*} appName 项目名
 */
async function run(root, appName, target) {
  const templateName = 'wokoo-template' // 对应的wokoo模板
  const allDependencies = [templateName]
  // 安装wokoo-template包
  console.log('Installing packages. This might take a couple of minutes')
  console.log(`Installing ${chalk.cyan(templateName)} ...`)
  try {
    await doAction(root, allDependencies)
  } catch (e) {
    console.log(`Installing ${chalk.red(templateName)} failed ...`, e)
  }
  console.log(`Installing ${chalk.cyan(templateName)} succeed!`)

  // 选择模板
  const repos = ['vue', 'react']
  let targetTemplate
  if(target) {
    targetTemplate = target
  } else {
    const data = await inquirer.prompt({
      name: 'targetTemplate',
      type: 'list',
      message: 'which template do you prefer?',
      choices: repos, // 选择模式
    })
    targetTemplate = data.targetTemplate
  }

  const templatePath = path.dirname(
    require.resolve(`${templateName}/package.json`, { paths: [root] })
  )

  // 复制文件到项目目录
  const scriptsConfigDir = path.join(templatePath, 'webpack.config.js')
  const gitIgnoreDir = path.join(templatePath, '.npmignore')
  const publicDir = path.join(templatePath, 'public')
  const tempDir = path.join(root, 'temp') // 临时模板路径
  const templateDir = path.join(templatePath, `${targetTemplate}-template`)
  // 从wokoo-template中拷贝模板到项目目录
  if (fs.existsSync(templatePath)) {
    // 将templateDir内模板拷贝到temp文件，并修改模板文件中的ejs配置项
    await modifyTemplate(templateDir, 'temp', {
      projectName: appName,
      basicProject: targetTemplate,
    })

    fs.copySync(tempDir, root) // 源 目标
    fs.copySync(publicDir, root + '/public')
    fs.copyFileSync(scriptsConfigDir, root + '/webpack.config.js')
    fs.copyFileSync(gitIgnoreDir, root + '/.gitignore')
    deleteFolder(tempDir)
  } else {
    console.error(
      `Could not locate supplied template: ${chalk.green(templatePath)}`
    )
    return
  }
  // 合并template.json和package.json
  let tempPkg = fs.readFileSync(root + '/template.json').toString()
  let pkg = fs.readFileSync(root + '/package.json').toString()
  const tempPkgJson = JSON.parse(tempPkg)
  const pkgJson = JSON.parse(pkg)

  pkgJson.dependencies = {
    ...pkgJson.dependencies,
    ...tempPkgJson.package.dependencies,
  }
  pkgJson.devDependencies = {
    ...tempPkgJson.package.devDependencies,
  }
  // 编写package.json
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(pkgJson, null, 2)
  )
  fs.unlinkSync(path.join(root, 'template.json')) // 删除template.json文件

  // 再次根据dependenciesToInstall执行npm install
  const dependenciesToInstall = Object.entries({
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  })
  let newDependencies = []
  if (dependenciesToInstall.length) {
    newDependencies = newDependencies.concat(
      dependenciesToInstall.map(([dependency, version]) => {
        return `${dependency}@${version}`
      })
    )
  }
  await doAction(root, newDependencies)
  console.log(`${chalk.cyan('Installing succeed!')}`)

  // 卸载wokoo-template
  await doAction(root, 'wokoo-template', 'uninstall')

  console.log(`🎉  Successfully created project ${appName}.`)
  console.log('👉  Get started with the following commands:')
  console.log(`${chalk.cyan(`cd ${appName}`)}`)
  console.log(`${chalk.cyan('$ npm start')}`)

  process.exit(0)
}

/**
 * 使用npm安装或卸载项目依赖
 * @param {*} root 项目路径
 * @param {*} allDependencies 项目依赖
 * @param {*} action npm install 或 npm uninstall
 */
async function doAction(root, allDependencies, action = 'install') {
  typeof allDependencies === 'string'
    ? (allDependencies = [allDependencies])
    : null
  return new Promise((resolve) => {
    const command = 'npm'
    const args = [
      action,
      '--save',
      '--save-exact',
      '--loglevel',
      'error',
      ...allDependencies,
      '--prefix',
      root,
    ]
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
