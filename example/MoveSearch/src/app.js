import React from 'react'
import axios from 'axios'
import './app.less'

// 弹窗宽度
const MODAL_WIDTH = 350
/**
 * 边界检测，鼠标点击modal之外，modal隐藏
 * @param {*} x 鼠标的x轴位置
 * @param {*} y 鼠标的y轴位置
 * @param {*} modalPosition 弹窗的left和top
 */
function boundaryDetection(x, y, modalPosition = { left: 0, top: 0 }) {
  let { left, top } = modalPosition
  if (
    x > left &&
    x < left + MODAL_WIDTH &&
    y > top &&
    y < top + MoveSearchApp.offsetHeight
  ) {
    return true
  }
  return false
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      selectedText: '',
      modalPosition: {},
      data: null,
    }
  }
  componentDidMount() {
    document.addEventListener('mouseup', (e) => {
      var selectionObj = window.getSelection()
      var selectedText = selectionObj.toString()
      // 选中文字为空，说明当前操作为点击
      if (selectedText.length === 0) {
        if (this.state.show) {
          // 重新计算是否关闭弹窗
          // 检测鼠标位置是否在弹窗内，不是则关闭弹窗
          var inModal = boundaryDetection(
            e.clientX,
            e.clientY,
            this.state.modalPosition
          )
          if (!inModal) {
            this.setState({
              show: false,
              data: [],
            })
          }
        }
      } else {
        // 选中文字不为空，1. 请求百度接口，2. 根据返回数据确定是否显示弹窗
        var selectionObjRect = selectionObj
          .getRangeAt(0)
          .getBoundingClientRect()
        let { x, y, height, width } = selectionObjRect // 获取选中文字的位置，x y是横纵坐标，height width是选中文字的高度和宽度
        // 计算弹窗位置，算出left和top
        var left = x - MODAL_WIDTH / 2 + width / 2
        left = left > 10 ? left : 10
        left =
          left < window.innerWidth - MODAL_WIDTH - 10
            ? left
            : window.innerWidth - MODAL_WIDTH - 10
        var top = y + height
        var scrollLeft =
          document.documentElement.scrollLeft || document.body.scrollLeft
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        axios
          .get(
            `https://movesearch.vercel.app/api/baidu?query=${selectedText}&pageNum=1&pageSize=10`
          )
          .then((res) => {
            let { data } = res.data.data.documents
            if (data.length) {
              this.setState({
                data,
                show: true,
                selectedText: selectedText,
                modalPosition: {
                  left: left + scrollLeft,
                  top: top + scrollTop,
                },
              })
            }
          })
      }
    })
  }

  render() {
    let { show, selectedText, modalPosition, data } = this.state
    return (
      <>
        {show && data && data.length ? (
          <div
            className="move-search"
            id="MoveSearchApp"
            style={{
              ...modalPosition,
            }}
          >
            <div className="move-search-content">
              <ul className="move-search-ul">
                {data.map((l) => (
                  <li className="move-search-li" key={l.id}>
                    <a href={l.url} target="_blank">
                      {l.title}
                    </a>
                    <span>{l.summary}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="move-search-bottom-fade"></div>
            <footer className="move-search-footer">
              <a
                href={`https://kaifa.baidu.com/searchPage?wd=${selectedText}`}
                target="_blank"
              >
                Read More
              </a>
            </footer>
          </div>
        ) : null}
      </>
    )
  }
}
