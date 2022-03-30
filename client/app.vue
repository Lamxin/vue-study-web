<template>
  <div id="app">
    <p style="text-align:center;color:#ffffff">{{counter}}</p>
    <p style="text-align:center;color:#ffffff">{{fullName}}</p>
    <Header></Header>
    <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link>
    <router-view/>
    <router-view name="foot"></router-view>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
export default {
  metaInfo: {
    title: '默认的title'
  },
  components: {
    Header
  },
  mounted () {
    let i = 1
    setInterval(() => {
      this.updateCount({ num: i++, num2: 2 })
    }, 1000)
    // this.updateCountSync({
    //   num: 5,
    //   time: 2000
    // })
    this['a/updateText']('123')
  },
  computed: {
    ...mapState({
      counter: 'count',
      textA: state => state.a.text
    }),
    ...mapGetters({
      fullName: 'fullName'
    }),
    // textA () {
    //   return this.$store.state.a.text
    // },
    textB () {
      return this.$store.state.b.text
    }
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions(['updateCountSync']),
    ...mapMutations(['updateCount', 'a/updateText'])
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
