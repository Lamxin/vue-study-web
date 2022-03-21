<template>
  <div id="app">
    <Header></Header>
    <!-- <Todo></Todo> -->
    <router-link to="/app/123">app</router-link>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
  #app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    #cover
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999
        opacity 0.2
        z-index -1
</style>
