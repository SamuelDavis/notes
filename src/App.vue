<template>
  <div id="app">
    <home class="container" v-if="$route.name === 'home'"/>
    <notes-paper class="container" v-else>
      <template v-slot:header>
        <h1 class="header" v-text="$route.name"/>
      </template>
      <template v-slot>
        <router-view class="content"/>
      </template>
    </notes-paper>
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

    #nav {
      margin-top: 0.5rem;
      max-width: 20%;
    }
  }

  .container {
    flex: 1;
    border-radius: 5px;
    box-shadow: 0 0 3px 0 #888;
  }

  .inverted-text {
    &, * {
      color: white;
      text-shadow: 0 0 1px black;
    }
  }
</style>
