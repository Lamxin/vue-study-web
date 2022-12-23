<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> | 
      <router-link to="/login">Login</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components: {
  },
  methods: {

  }
}
</script>

