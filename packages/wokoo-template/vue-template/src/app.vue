<template>
  <div class="App" v-if="show">
    <header class="App-header">
      <img :src="logo" class="App-logo" alt="logo" />
      <span
        class="App-close-icon"
        @click="handleClose"
      >
        ×
      </span>
      <p>
        Edit <code>App.vue</code> and save to reload.
      </p>
      <a
        class="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Wokoo
      </a>
    </header>
  </div>
  <div class="App-hide" @click="handleClose" v-else>
    <img :src="logo" class="App-hide-logo" alt="logo" />
    open
  </div>
</template>
<script>
import './app.less'
import logo from '../public/icon.jpg'
export default {
  data: function() {
    return {
      logo,
      show: true
    }
  },
  methods: {
    handleClose() {
      this.show = !this.show
    }
  }
}
</script>
<style scoped>
</style>
