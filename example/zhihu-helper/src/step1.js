import React from 'react'
import './app.less'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }
  handleShow = () => {
    this.setState({
      show: !this.state.show,
    })
  }
  handleMouseOver = async () => {
    this.setState({
      show: true,
    })
    wokooAppZhihu.className = 'wokoo-app-unfold'
  }
  handleMouseLeave = () => {
    this.setState({
      show: false,
    })
    wokooAppZhihu.className = 'wokoo-app-fold'
  }

  render() {
    let { show } = this.state
    return (
      <>
        {show ? (
          <ul
            className="list-ul"
            style={{ height: '100%' }}
            onMouseLeave={this.handleMouseLeave}
          >
            list
          </ul>
        ) : (
          <div
            className="octotree-toggle"
            onClick={this.handleShow}
            onMouseOver={this.handleMouseOver}
          >
            <span>专栏目录</span>
            <span className="octotree-toggle-icon" role="button">
              »
            </span>
          </div>
        )}
      </>
    )
  }
}
