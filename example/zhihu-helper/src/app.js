import React from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import './app.css'

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
    wokooApp.className = 'wokoo-app-spread'
    this.getQueryName()
    this.getList()
  }
  handleMouseLeave = () => {
    this.setState({
      show: false,
    })
    wokooApp.className = 'wokoo-app'
  }
  handleInfiniteOnLoad = () => {
    this.getList()
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
    }))
    if (list.length === 0) {
      this.setState({ hasMore: false })
      return
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
          <ul className="title-list-ul" onMouseLeave={this.handleMouseLeave}>
            <InfiniteScroll
              dataLength={list.length} //This is important field to render the next data
              next={this.handleInfiniteOnLoad}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              height={document.documentElement.clientHeight - 53}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>到底了，没内容啦~</b>
                </p>
              }
            >
              {list.map((i) => (
                <li className="title-list-li" key={i.id}>
                  <a href={i.url}>{i.title}</a>
                </li>
              ))}
            </InfiniteScroll>
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
// ›>＞〉»
