import React from 'react'
import axios from 'axios'
import './app.less'

const limit = 20
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      list: [],
      offset: 0,
      hasMore: true,
    }
    this.queryName = null
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
    wokooApp.className = 'wokoo-app-unfold'
    this.getQueryName()
    this.getList()
  }
  handleMouseLeave = () => {
    this.setState({
      show: false,
    })
    wokooApp.className = 'wokoo-app'
  }

  getQueryName = () => {
    let pathname = location.pathname
    let detailRegExp = /^\/p\/\d+/
    let queryName = ''
    // 专栏详情页
    if (detailRegExp.test(pathname)) {
      let aTage = document.getElementsByClassName(
        'ColumnPageHeader-TitleColumn'
      )
      let url = aTage[0].href
      queryName = url.slice(url.lastIndexOf('/'))
    } else {
      // 专栏列表页
      // http://zhuanlan.zhihu和http://zhihu/column两种情况都是专栏
      if (pathname.indexOf('/column') === 0) {
        pathname = pathname.slice('/column'.length)
      }
      queryName = pathname
    }
    this.queryName = queryName
  }

  getList = async () => {
    if (!this.state.hasMore) return
    let { offset } = this.state
    let { data } = await axios.get(
      `https://www.zhihu.com/api/v4/columns${this.queryName}/items?limit=20&offset=${offset}`
    )
    let list = data.data.map((i) => ({
      title: i.title,
      url: i.url,
      id: i.id,
      commentCount: i.comment_count,
      voteupCount: i.voteup_count,
    }))
    if (data.paging.is_end) {
      this.setState({ hasMore: false })
    }
    offset += limit

    this.setState({
      list: [...this.state.list, ...list],
      offset,
    })
  }

  render() {
    let { show, list, hasMore } = this.state
    return (
      <>
        {show ? (
          <ul className="list-ul" onMouseLeave={this.handleMouseLeave}>
            {list.map((i) => (
              <li className="list-li" key={i.id}>
                <a className="list-a" href={i.url} target="_blank">
                  {i.title}
                </a>
                <span className="list-span">{i.voteupCount} 赞同</span>
                <span className="list-span">{i.commentCount} 条评论</span>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="octotree-toggle"
            onClick={this.handleShow}
            onMouseOver={this.handleMouseOver}
            onMouseLeave={this.handleMouseLeave}
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
