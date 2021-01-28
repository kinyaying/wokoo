import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

const root = document.createElement('div')
root.id = 'wokoonApp'
document.body.appendChild(root)
ReactDOM.render(<App />, wokoonApp)

//<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://platform.linkedin.com ">
