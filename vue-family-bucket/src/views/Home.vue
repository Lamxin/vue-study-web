<template>
  <div>
    Home
    <p @click="$store.commit('add')">counter {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">async counter {{$store.state.counter}}</p>
    <p>double counter {{$store.getters.doubleCounter}}</p>
    {{student.name}}
    {{student.age}}
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      student: {}
    }
  },
  mounted() {
    Object.defineProperty(this.student, 'age', { // 响应式
      get: () => this.$store.state.counter
    })
    this.student.name = this.$store.state.counter // 非响应式
  }
}
</script>

<style>

</style>