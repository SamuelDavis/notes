<template>
  <div id="app">
    <router-view class="content shadow"/>
    <notes-nav :routes="routes" class="nav"/>
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
  $line-height: 12px;

  .inverted-text, .inverted-text * {
    color: white;
    text-shadow: 0 0 3px black;
  }

  .shadow {
    box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.25);
  }

  html {
    font-size: $line-height;
    line-height: $line-height;
  }

  #app {
    display: flex;
    flex-direction: row;

    > .content {
      flex: 1;
      border-radius: 5px;
    }

    > .nav {
      margin-top: 1rem;
      max-width: 20%;
    }
  }
</style>
