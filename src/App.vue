<template>
  <div id="app">

    <testArea/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import testArea from './components/test'


export default {
  name: 'app',
  components: {
    HelloWorld,
    testArea
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
  margin-top: 0;
}
</style>
