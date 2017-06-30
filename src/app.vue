<template>
  <div id="app" class="app-viewport">
    <md-toolbar class="main-toolbar">
      <h2 class="md-title" style="flex: 1">Reasonable Foodie <md-icon>restaurant</md-icon></h2>
    </md-toolbar>
    <router-view class="main-content"></router-view>
    <md-toolbar class="bottom-toolbar">
      <h2 class="md-title" style="flex: 1"></h2>
      <md-button v-on:click="goHome()" class="md-icon-button">
        <md-icon>home</md-icon>
      </md-button>
    </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    goHome: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
.app-viewport {
  height: 100%;
  overflow: hidden;
}

.app-viewport {
  display: flex;
  flex-flow: column;
}

.main-toolbar {
  position: relative;
}

.main-content {
  position: relative;
  overflow: auto;
  margin-bottom: 64px;
}

.bottom-toolbar {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}

.fixed {
  position:fixed;
  width: 100%;
  z-index: 1000;
}
</style>
