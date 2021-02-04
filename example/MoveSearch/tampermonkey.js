// ==UserScript==
// @name         MoveSearch
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  划词翻译，在网页中选中文字，会出现弹窗，弹窗内容是百度搜索的内容
// @author       kinyaying
// @match        https://*/*
// @match        http://*/*

// ==/UserScript==

;(function () {
  'use strict'
  if (location.href === 'http://localhost:8080/') return
  var script = document.createElement('script')
  script.src = 'http://localhost:8080/app.bundle.js'
  document.body.appendChild(script)
})()
