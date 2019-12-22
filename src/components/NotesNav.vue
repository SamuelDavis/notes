<template>
  <nav>
    <ol>
      <li :class="{active: name === $route.name}" :key="i" v-for="({path, name}, i) in routes">
        <router-link :to="path" class="inverted-text" v-text="name"/>
      </li>
    </ol>
  </nav>
</template>

<script>
  import ColorRepo from '../services/ColorRepo'

  const colorRepo = new ColorRepo()

  export default {
    name: 'notes-nav',
    props: {
      routes: Array
    }
  }
</script>

<style lang="scss" scoped>
  $tabRadius: 3px;

  * {
    margin: 0;
    padding: 0;
  }

  ol {
    list-style: none;

    > li {
      border-top-right-radius: $tabRadius;
      border-bottom-right-radius: $tabRadius;
      margin-bottom: 0.1rem;
      box-shadow: 2px 1px 3px 0 #888;
      width: fit-content;
      background-color: #247BA0;

      &:first-child {
        background-color: #50514F;
      }

      &.active {
        position: relative;
        left: -0.5rem;
      }

      a {
        display: block;
        padding: 0.5rem;
        text-decoration: none;
      }
    }
  }
</style>
