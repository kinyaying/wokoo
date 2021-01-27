import React from 'react'
import './app.css'
import logo from '../public/icon.jpg'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: true }
  }
  handleClose() {
    this.setState({
      show: !this.state.show,
    })
  }
  render() {
    let { show } = this.state
    return (
      <>
        {show ? (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <span
                className="App-close-icon"
                onClick={this.handleClose.bind(this)}
              >
                X
              </span>
              <p>
                Edit <code>App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Wokoo
              </a>
            </header>
          </div>
        ) : (
          <div className="App-hide" onClick={this.handleClose.bind(this)}>
            <img src={logo} className="App-hide-logo" alt="logo" />
            open
          </div>
        )}
      </>
    )
  }
}
