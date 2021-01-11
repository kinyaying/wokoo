<template>
<div class="App">
      <header class="App-header">
        <img :src="logo" class="App-logo" alt="logo" />
        <p>
          Edit <code>App.vue</code> and save to reload.
        </p>
        <a
          class="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Wokoon
        </a>
      </header>
    </div>
</template>
<script>
import './app.css'
import logo from '../../public/icon.jpg'
export default {
  data: function() {
    return {
      logo
    }
  }
}
</script>
<style scoped>
</style>
