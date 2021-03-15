import React from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
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
    wokooAppZhihu.className = 'wokoo-app-unfold'
    this.getQueryName()
    this.getList()
  }
  handleMouseLeave = () => {
    this.setState({
      show: false,
    })
    wokooAppZhihu.className = 'wokoo-app-fold'
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
    if (this.queryName === '/') return
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
            <InfiniteScroll
              dataLength={list.length}
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
                <li className="list-li" key={i.id}>
                  <a className="list-a" href={i.url} target="_blank">
                    {i.title}
                  </a>
                  <span className="list-span">
                    <span className="svg-icon">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        width="10"
                        height="10"
                      >
                        <path
                          d="M2 18.242c0-.326.088-.532.237-.896l7.98-13.203C10.572 3.57 11.086 3 12 3c.915 0 1.429.571 1.784 1.143l7.98 13.203c.15.364.236.57.236.896 0 1.386-.875 1.9-1.955 1.9H3.955c-1.08 0-1.955-.517-1.955-1.9z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    {i.voteupCount} 赞同
                  </span>
                  <span className="list-span">
                    <span className="svg-icon">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        width="1.2em"
                        height="1.2em"
                      >
                        <path
                          d="M10.241 19.313a.97.97 0 0 0-.77.2 7.908 7.908 0 0 1-3.772 1.482.409.409 0 0 1-.38-.637 5.825 5.825 0 0 0 1.11-2.237.605.605 0 0 0-.227-.59A7.935 7.935 0 0 1 3 11.25C3 6.7 7.03 3 12 3s9 3.7 9 8.25-4.373 9.108-10.759 8.063z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    {i.commentCount} 条评论
                  </span>
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
