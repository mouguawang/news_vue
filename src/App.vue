<template>
  <div id="app" ref="app">
    <!-- <myHeader></myHeader> -->
    <router-view></router-view>
  </div>
</template>

<script>
import myHeader from './components/header/header.vue'

export default {
  name: 'App',
  components: {
    myHeader
  }
}
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
