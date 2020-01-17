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
  @import "../assets/highlight";

  $rule-color: #efe4e4;
  $line-color: #d9eaf3;
  $text-color: #212e64;

  $rule-size: 7.5%;
  $rule-border: 5px;
  $rule-margin: 1.5%;
  $rule-width: calc(#{$rule-size} - #{$rule-border} - #{$rule-margin});

  .ruled-paper {
    position: relative;
    font-family: monospace;
    display: flex;
    flex-direction: column;

    * {
      margin: 0;
      padding: 0;
      color: $text-color;
      border-color: $text-color;
    }

    em {
      @include highlight($code-highlight-a-color);
    }

    .rule {
      position: absolute;
      height: 100%;
      width: $rule-width;
      border-right: $rule-border double $rule-color;
    }

    .header {
      z-index: 1;
      text-align: center;
      line-height: 2rem;
      min-height: 4rem;
      padding-top: 1rem;
    }

    .content {
      flex: 1;
      padding: 0 $rule-width 0 $rule-size;
      background-image: repeating-linear-gradient(transparent 0px, transparent calc(1rem - 1px), $line-color 1rem);

      section, section > div {
        > * {
          margin-bottom: 1rem;
        }
      }

      h1, h2, h3 {
        text-transform: capitalize;
        margin-bottom: 1rem;
        position: relative;
        z-index: 1;
      }

      sup, sub, small {
        line-height: 0;
      }

      ul, ol {
        list-style-position: inside;
      }

      hr {
        height: 1rem;
        border: 0;
        background-image: linear-gradient(transparent 0px, transparent 0.4rem, black, transparent 0.5rem, transparent 1rem);
      }
    }
  }
</style>
