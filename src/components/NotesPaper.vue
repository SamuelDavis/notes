<template>
  <div class="ruled-paper">
    <span class="rule"/>
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'notes-paper',
  }
</script>

<style lang="scss">
  .ruled-paper {
    @import "../assets/_variables.scss";

    color: $text-color;

    position: relative;
    display: flex;
    flex-direction: column;
    font-family: monospace;

    > .rule {
      position: absolute;
      width: $rule-width;
      height: 100%;
      border-right: $rule-border double $rule-color;
    }

    > :not(.rule) {
      padding-left: $rule-width;
    }

    > .header {
      height: $header-height;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > .content {
      flex: 1;
      background-image: repeating-linear-gradient(transparent 0px, transparent calc(#{$line-height} - 1px), $line-color $line-height);
      padding: 0 $rule-width $line-height $rule-size;
    }

    * {
      margin: 0;
      padding: 0;
      border-width: 0;
      line-height: $line-height;
      background-color: transparent;
    }

    sup, sub {
      line-height: 0;
    }

    ul, ol {
      list-style-position: inside;

      > li {
        > *:first-child {
          margin-left: -0.5rem;
        }
      }
    }

    hr {
      margin: calc(#{$line-height / 2} - 1px) 0;
      border: 1px solid black;
    }

    input:not([type=submit]) {
      line-height: calc(#{$line-height} - 3px);
      border-bottom: 1px dashed black;
    }
  }
</style>
