<template>
  <router-link to="/ops/docker">Docker</router-link>
</template>

<script>
  export default {
    middleware ({ redirect }) {
      return redirect('/ops/docker')
    }
  }
</script>
