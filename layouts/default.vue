<template>
  <div id="app">
    <notes-nav :child="navs.child" :routes="navs.routes" class="app-nav">
      <nuxt :class="{index: $route.path==='/'}" class="app-content"/>
    </notes-nav>
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
        return [...this.$router.options.routes]
          .sort((a, b) => a.path.length - b.path.length)
          .reduce((acc, route) => {
            const parts = route.path.slice(1).split('/')
            const namespace = parts.slice(0, parts.length - 1)
            if (!this.$route.path.includes(namespace.join('/'))) {
              return acc
            }
            const seek = namespace.reduce((seek, item) => {
              if (!seek.hasOwnProperty('child')) {
                seek['child'] = { routes: [] }
              }
              return seek.child
            }, acc)
            seek.routes.push(route)
            return acc
          }, { routes: [] })
      }
    }
  }
</script>

<style lang="scss">
  $line-height: 16px;

  html {
    font-size: $line-height;
    line-height: $line-height;

    h1 {
      line-height: 2rem;
    }

    a {
      color: inherit;
    }

    img {
      max-width: 100%;
    }

    * {
      min-width: min-content;
    }
  }

  #app {
    font-family: monospace;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .app-nav {
      flex: 1;
    }

    .app-content:not(.index), .notes-nav-content, .notes-nav-items li {
      box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.25);
    }
  }
</style>
