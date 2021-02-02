import Vue from 'vue'
import App from './app.vue'

const wokooApp = document.createElement('div')
wokooApp.id = 'wokooApp'
document.body.appendChild(wokooApp)
const vm = new Vue({
  el: '#wokooApp',
  render: (h) => h(App),
})
