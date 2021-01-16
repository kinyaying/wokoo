import React from 'react'
import './app.css'
import logo from '../public/icon.jpg'
export default function () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Wokoon
        </a>
      </header>
    </div>
  )
}
