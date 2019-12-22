<template>
  <div id="app">
    <router-view id="container"/>
    <notes-nav :routes="routes" id="nav"/>
  </div>
</template>

<script>
  import Home from './views/Home'
  import NotesPaper from './components/NotesPaper'
  import NotesNav from './components/NotesNav'
  import { routes } from './router/index'

  export default {
    name: 'app',
    components: {
      Home,
      NotesPaper,
      NotesNav
    },
    computed: {
      routes () {
        return routes.filter((route) => route.meta && route.meta.global)
      }
    }
  }
</script>

<style lang="scss">
  #app {
    display: flex;
    flex-direction: row;

    #container {
      flex: 1;
      border-radius: 5px;
      box-shadow: 0 0 3px 0 #888;
    }

    #nav {
      margin-top: 0.5rem;
      max-width: 20%;
    }
  }

  .inverted-text {
    &, * {
      color: white;
      text-shadow: 0 0 1px black;
    }
  }
</style>
