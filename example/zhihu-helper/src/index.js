import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const wokooApp = document.createElement('div')
wokooApp.id = 'wokooApp'
wokooApp.className = 'wokoo-app-fold'

document.body.appendChild(wokooApp)
ReactDOM.render(
  <div>
    <App />
  </div>,
  wokooApp
)
