<template>
  <div id="app">
    <nuxt class="page"/>
    <notes-nav :key="namespace" :routes="routes" class="nav" v-for="{routes, namespace} in navs" v-if="$route.path.includes(namespace)"/>
  </div>
</template>

<script>
  import NotesNav from '../components/NotesNav'

  export default {
    components: {
      NotesNav
    },
    computed: {
      navs () {
        return Object.values(this.$router.options.routes.reduce((acc, route) => {
          const parts = route.path.split('/')
          const namespace = parts.slice(0, parts.length - 1).join('/')
          if (!acc.hasOwnProperty(namespace)) {
            acc[namespace] = { namespace, len: parts.length - 1, routes: [] }
          }
          acc[namespace].routes.push(route)
          return acc
        }, {}))
          .sort((a, b) => b.len - a.len)
          .map((nav) => ({ ...nav, routes: nav.routes.sort((a, b) => a.path.length - b.path.length) }))
      }
    }
  }
</script>

<style lang="scss">
  $line-height: 12px;

  html {
    font-size: $line-height;
    line-height: $line-height;
  }

  #nav-container {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: row;
  }

  .inverted-text, .inverted-text * {
    color: white;
    text-shadow: 0 0 3px black;
  }

  .shadow {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.25);
  }

  #app {
    display: flex;
    flex-direction: row;

    > .page {
      flex: 1;
      border-radius: 5px;
    }

    > .nav {
      margin-top: 1rem;
      max-width: 20%;
    }
  }
</style>
