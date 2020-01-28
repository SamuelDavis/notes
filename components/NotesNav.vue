<template>
  <div class="notes-nav-wrapper">
    <div :class="{active}" class="notes-nav-content">
      <notes-nav :child="child.child" :depth="depth + 1" :routes="child.routes" v-if="child">
        <slot/>
      </notes-nav>
      <slot v-else/>
    </div>
    <nav :style="{zIndex: depth}" class="notes-nav-items">
      <ol>
        <li :class="{active}" :key="i" v-for="({path, name, active}, i) in navItems">
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
    },
    computed: {
      active () {
        return this.navItems.reduce((acc, item) => acc || item.active, false)
      },
      navItems () {
        return this.routes.map((route) => {
          return {
            active: this.$route.path === route.path || (route.path !== '/' && this.$route.path.includes(route.path)),
            path: route.path,
            name: route.name.split('-').slice(this.depth - 1).join('-'),
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $activeColor: #50514F;
  $inactiveColor: #247BA0;

  .notes-nav-wrapper {
    display: flex;
    flex-direction: row;
    min-height: 100%;

    .notes-nav-content {
      flex: 1;
      min-width: 0;
      background-color: $activeColor;
      border-radius: 8px;

      &.active {
        padding-right: 0.25rem;
      }
    }

    .notes-nav-items ol {
      list-style-type: none;
      writing-mode: vertical-lr;
      margin-top: 0;
      margin-left: 0;
      margin-bottom: 1rem;
      min-height: max-content;

      li {
        display: inline-block;
        background-color: $inactiveColor;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0.25rem;

        &:not(:last-child) {
          margin-bottom: 1rem;
        }

        &.active {
          background-color: $activeColor
        }

        a {
          text-transform: capitalize;
          text-decoration: none;
          color: white;
          text-shadow: 0 0 2px black;
        }
      }
    }
  }
</style>
