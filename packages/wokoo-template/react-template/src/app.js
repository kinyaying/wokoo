import React from 'react'
import './app.less'
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
          <div className="Wokoo">
            <header className="Wokoo-header">
              <img src={logo} className="Wokoo-logo" alt="logo" />
              <span
                className="Wokoo-close-icon"
                onClick={this.handleClose.bind(this)}
              >
                X
              </span>
              <p>
                Edit <code>App.js</code> and save to reload.
              </p>
              <a
                className="Wokoo-link"
                href="https://juejin.cn/post/6922815205575491597"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Wokoo
              </a>
            </header>
          </div>
        ) : (
          <div className="Wokoo-hide" onClick={this.handleClose.bind(this)}>
            <img src={logo} className="Wokoo-hide-logo" alt="logo" />
            open
          </div>
        )}
      </>
    )
  }
}
