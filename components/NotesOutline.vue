<template>
  <div :class="{labeled}" class="notes-outline">
    <div class="label" v-if="labeled">
      <label v-if="label" v-text="label"/>
      <slot name="label">
      </slot>
    </div>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'notes-outline',
    props: {
      label: String
    },
    data () {
      return {
        labeled: Boolean(this.label)
      }
    },
    mounted () {
      this.labeled = this.labeled || Boolean(this.$slots.label)
    }
  }
</script>

<style lang="scss" scoped>
  .notes-outline {
    width: fit-content;
    box-shadow: inset 0 0 1px 0 black, 0 0 1px 0 black;
    border-radius: 4px;
    padding: 1rem 0.5rem;
    margin: 1rem 0;

    &.labeled {
      padding-top: 0;

      > :first-child {
        white-space: nowrap;
        margin: 0;
        max-width: fit-content;
        $backgroundColor: rgb(255, 255, 255);
        $blur: 0.25rem;
        position: relative;
        top: -0.5rem;
        left: 1rem;
        border-radius: 4px;
        box-shadow: #{2 * $blur} 0 $blur 0 $backgroundColor, #{-2 * $blur} 0 $blur 0 $backgroundColor;

        &:not(.hljs) {
          background-color: $backgroundColor;
        }
      }
    }

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }

    > :not(:last-child) {
      margin-bottom: 1rem;
    }
  }
</style>
