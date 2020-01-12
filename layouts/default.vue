<template>
  <div id="app">
    <nuxt class="content shadow"/>
    <notes-nav class="nav"/>
  </div>
</template>

<script>
  import NotesNav from '../components/NotesNav'

  export default {
    components: {
      NotesNav
    }
  }
</script>

<style lang="scss">
  $line-height: 12px;

  html {
    font-size: $line-height;
    line-height: $line-height;
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
