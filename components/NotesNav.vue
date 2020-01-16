<template>
  <nav>
    <ol>
      <li :class="{active: path.slice(1) && $route.path.includes(path)}" :key="i" class="shadow" v-for="({path, name}, i) in routes">
        <router-link :to="path" class="inverted-text" v-text="name"/>
      </li>
    </ol>
  </nav>
</template>

<script>
  export default {
    name: 'notes-nav',
    props: {
      routes: {
        type: Array,
        default () {
          return this.$router.options.routes.reduce((acc, route) => {
            return route.name === 'index' ? [route, ...acc] : [...acc, route]
          }, [])
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;

    > li {
      writing-mode: vertical-lr;
      margin-bottom: 0.25rem;
      background-color: #247BA0;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      width: fit-content;

      &.active {
        background-color: #50514F;
      }

      a {
        padding: 0.5rem;
        display: block;
        text-decoration: none;
        text-transform: capitalize;
      }
    }
  }
</style>
