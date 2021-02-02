import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
// root需要替换成wokooApp
// class: app 改成wokooapp
// app 和 root都会重名
// webpack配置不完全
// webpack history-fallback vue插件，用于不用配置history路由，如果没有则跳首页
// react@^16.0.0
const wokooApp = document.createElement('div')
wokooApp.id = 'wokooApp'
wokooApp.className = 'wokoo-app'
console.log('root:', root)
document.body.appendChild(wokooApp)
ReactDOM.render(<App />, wokooApp)
