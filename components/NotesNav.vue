<template>
  <div :style="{zIndex: depth}" class="nav-wrapper">
    <div class="content-container shadow">
      <notes-nav :child="child.child" :depth="depth + 1" :routes="child.routes" v-if="child">
        <slot/>
      </notes-nav>
      <slot v-else/>
    </div>
    <nav class="nav-container">
      <ol>
        <li :class="{active: path.slice(1) && $route.path.includes(path)}" :key="i" class="shadow" v-for="({path, name}, i) in routes">
          <router-link :to="path" class="inverted-text" v-text="name"/>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'notes-nav',
    props: {
      depth: {
        type: Number,
        default: 1
      },
      child: Object,
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
  $activeColor: #50514F;
  $tabColor: #247BA0;

  .nav-wrapper {
    display: flex;
    flex-direction: row;

    .content-container {
      border-radius: 0.5rem;
      display: flex;
      flex: 1;
      background-color: $activeColor;

      .nav-wrapper {
        flex: 1;
        margin-right: 0.5rem;
      }
    }

    .nav-container {
      margin-top: 1rem;

      ol {
        list-style-type: none;
        margin-top: 0;
        margin-left: 0;
        margin-bottom: 0;
        padding: 0;
        writing-mode: vertical-lr;

        li {
          display: inline-block;
          background-color: $tabColor;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;

          &:not(:last-child) {
            margin-bottom: 0.25rem;
          }

          &.active {
            background-color: $activeColor;
          }

          a {
            display: block;
            padding: 0.5rem;
            text-decoration: none;
            text-transform: capitalize;
          }
        }
      }
    }
  }
</style>
