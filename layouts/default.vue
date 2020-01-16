<template>
  <div id="app">
    <div :key="namespace" :style="{zIndex: i + 1, width: `calc(100% - ${i * 2}rem)`, right: `${i * 2}rem`}" class="nav-container" v-for="({routes, namespace}, i) in navs">
      <div class="nav-spacer">
        <nuxt class="page" v-if="i === navs.length -1"/>
      </div>
      <notes-nav :routes="routes" class="nav"/>
    </div>
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
          if (!this.$route.path.includes(namespace)) {
            return acc
          }
          if (!acc.hasOwnProperty(namespace)) {
            acc[namespace] = { namespace, len: parts.length - 1, routes: [] }
          }
          acc[namespace].routes.push(route)
          return acc
        }, {}))
          .sort((a, b) => a.len - b.len)
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

    .nav-container {
      display: flex;
      flex-direction: row;
      flex: 1;
      position: absolute;

      .nav-spacer {
        flex: 1;
        background-color: #50514F;
        border-radius: 5px;
      }
    }

    .page {
      background-color: white;
      border-radius: 5px;
      margin: 0.5rem 1rem 0.5rem 0.5rem;
    }

    .nav {
      margin-top: 1rem;
      max-width: 20%;
    }
  }
</style>
