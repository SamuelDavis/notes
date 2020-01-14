<template>
  <nav>
    <ol>
      <li :class="{active: name === $route.name}" :key="i" class="shadow" v-for="({path, name}, i) in routes">
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
          return this.$router.options.routes
            .reduce((acc, route) => {
              return route.name === 'index' ? [route, ...acc] : [...acc, route]
            }, [])
            .sort((a, b) => a.path.indexOf(b.path))
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

      &:first-child {
        background-color: #50514F;
      }

      &.active {
        position: relative;
        left: -1rem;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
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
