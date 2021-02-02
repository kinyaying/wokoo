import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import './app.css'
import axios from 'axios'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false, list: [], offset: 10 }
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

    let { data } = await axios.get(
      `https://www.zhihu.com/api/v4/columns${queryName}/items`
    )
    this.setState({
      list: data.data.map((i) => ({
        title: i.title,
        url: i.url,
        id: i.id,
      })),
    })
  }
  handleMouseLeave = () => {
    // this.setState({
    //   show: false,
    // })
    // wokooApp.className = 'wokoo-app'
  }
  handleInfiniteOnLoad = async () => {
    let queryName = '/powertrain'
    console.log('handleInfiniteOnLoad======')
    // let offset = this.state.offset
    // this.setState({
    //   offset: this.state.offset + 10,
    // })
    // let { data } = await axios.get(
    //   `https://www.zhihu.com/api/v4/columns${queryName}/items?limit=10&offset=${this.state.offset}`
    // )
    // let list = data.data.map((i) => ({
    //   title: i.title,
    //   url: i.url,
    //   id: i.id,
    // }))
    // this.setState({
    //   list: [...this.state.list, ...list],
    // })
    // https://www.zhihu.com/api/v4/columns/powertrain/items?limit=10&offset=10
  }

  render() {
    let { show, list } = this.state
    return (
      <>
        {show ? (
          <ul className="title-list-ul" onMouseLeave={this.handleMouseLeave}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={true}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
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
            <i className="octotree-toggle-icon" role="button"></i>
            <span>专栏目录</span>
          </div>
        )}
      </>
    )
  }
}
