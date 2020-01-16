<template>
  <div class="outline-wrapper">
    <label>
      <span>{{label}}
      <slot name="label"/>
      </span>
    </label>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'notes-outline',
    props: {
      label: String
    }
  }
</script>

<style lang="scss" scoped>
  @import "assets/highlight";

  .outline-wrapper {
    box-shadow: inset 0 0 1px 0 black, 0 0 1px 0 black;
    border-radius: 0.5rem;
    padding: 1rem;

    *:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
    }

    label {
      position: relative;
      top: -1.5rem;
      font-weight: bold;
      max-width: 100%;
      @include highlight(white, 0.5rem);

      > span {
        position: relative;
      }

      * {
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
