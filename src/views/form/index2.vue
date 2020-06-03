
<template>
  <div class="hello">
    {{ mes }}
  </div>
</template>

<script>
// import topNav from './nav/topNav'
export default {
  name: 'Hello',
  components: {
    // topNav:topNav
  },
  data() {
    return {
      mes: '子菜单23'
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.hello {
}
</style>
