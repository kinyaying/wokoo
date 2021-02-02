import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
root.id = 'wokooApp'
document.body.appendChild(root)
const vm = new Vue({
  el: '#wokooApp',
  render: (h) => h(App),
})
