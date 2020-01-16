<template>
  <div id="app">
    <notes-nav :child="navs.child" :routes="navs.routes" class="nav">
      <nuxt class="page shadow"/>
    </notes-nav>
  </div>
</template>

<script>
  import NotesNav from '../components/NotesNav'
  import hljs from 'highlight.js/lib/highlight'
  import bash from 'highlight.js/lib/languages/bash'
  import 'highlight.js/styles/github.css'

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
    },
    created () {
      hljs.registerLanguage('bash', bash)
    },
    mounted () {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  }
</script>

<style lang="scss">
  $line-height: 16px;

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
    .page {
      border-radius: 1rem;
      flex: 1;
      background-color: white;
    }
  }

  pre > code {
    padding: 0 0.5rem !important;
    background-color: rgba(248, 248, 248, 0) !important;
    width: fit-content !important;
  }
</style>
