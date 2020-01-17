<template>
  <div class="outline-wrapper" :style="{paddingTop: label || $slots.label ? 0 : undefined}">
    <label>
      <span v-if="label" v-text="label"/>
      <slot name="label"/>
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
      top: -0.5rem;
      font-weight: bold;
      max-width: 100%;
      @include highlight(white, 12px, 3px);

      * {
        position: relative;
        padding: 0;
        margin: 0;
      }
    }
  }
</style>
