import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
root.id = 'wokoonApp'
document.body.appendChild(root)
const vm = new Vue({
  el: '#wokoonApp',
  render: (h) => h(App),
})
