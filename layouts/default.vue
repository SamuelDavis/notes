<template>
  <div id="app">
    <nuxt class="page shadow"/>
    <div id="nav-container">
      <notes-nav :style="{zIndex: routes.length - i}" :key="i" :routes="nav.routes" v-for="(nav, i) in routes" v-if="shouldShowNav(nav)"/>
    </div>
  </div>
</template>

<script>
  import NotesNav from '../components/NotesNav'

  export default {
    components: {
      NotesNav
    },
    data () {
      const routes = [...this.$router.options.routes]
        .reduce((acc, route) => {
          const parts = route.path.slice(1).split('/')
          const namespace_parts = parts.slice(0, parts.length - 1)
          const namespace = namespace_parts.join('.')
          if (!acc.hasOwnProperty(namespace)) {
            acc[namespace] = {
              namespace,
              namespace_parts,
              routes: []
            }
          }
          acc[namespace].routes.push(route)
          acc[namespace].routes.sort((a, b) => a.path.length - b.path.length)
          return acc
        }, {})
      return { routes: Object.values(routes).sort((a, b) => b.namespace_parts.length - a.namespace_parts.length) }
    },
    methods: {
      shouldShowNav (group) {
        return this.$route.path.slice(1).replace('\/', '.').includes(group.namespace)
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
