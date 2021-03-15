import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const wokooApp = document.createElement('div')
wokooApp.id = 'wokooAppZhihu'
wokooApp.className = 'wokoo-app-fold'

document.body.appendChild(wokooApp)
ReactDOM.render(
  <div>
    <App />
  </div>,
  wokooApp
)
