<template>
  <div class="notes-paper">
    <span class="notes-paper-rule"/>
    <div class="notes-paper-header">
      <slot name="header"/>
    </div>
    <div class="notes-paper-content">
      <slot/>
    </div>
  </div>
</template>

<script>
  function normalizeImgHeights (lineHeight, $parent = document.body) {
    $parent.querySelectorAll('img').forEach((img) => {
      const imgHeight = parseInt(window.getComputedStyle(img).height, 10)
      const remainder = lineHeight - (imgHeight % lineHeight)
      img.style.paddingBottom = `${remainder}px`
    })
  }

  export default {
    name: 'notes-paper',
    mounted () {
      const lineHeight = parseInt(window.getComputedStyle(document.body).lineHeight, 10)
      normalizeImgHeights(lineHeight, this.$el)
      window.addEventListener('resize', () => normalizeImgHeights(lineHeight, this.$el))
    }
  }
</script>

<style lang="scss">
  $ruleColor: #efe4e4;
  $lineColor: #d9eaf3;
  $textColor: #212e64;

  $ruleWidth: 5%;

  .notes-paper {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    width: 100%;
    color: $textColor;
    background-color: white;
    font-family: "Comic Sans MS", monospace;
    border-radius: 16px;

    .notes-paper-rule {
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      border-right: 5px double $ruleColor;
      width: $ruleWidth;
      height: 100%;
    }

    .notes-paper-header {
      display: flex;
      flex-direction: column;
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
      min-height: 4rem;
      text-align: center;
      justify-content: center;
    }

    .notes-paper-content {
      flex: 1;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      background-image: repeating-linear-gradient(transparent 0px, transparent calc(1rem - 1px), $lineColor 1rem);
    }

    .notes-paper-header, .notes-paper-content {
      padding: 0 1rem 0 calc(#{$ruleWidth} + 1rem);

      * {
        margin: 0;
        padding: 0;
      }

      em {
        $highlightColor: rgba(255, 150, 150, 0.25);
        $blur: 4px;
        background-color: $highlightColor;
        border-radius: 4px;
        box-shadow: 0 0 $blur 0 $highlightColor, 0 0 $blur 0 $highlightColor;
        font-style: inherit;
      }

      code {
        vertical-align: bottom;
        text-transform: none;
      }

      section {
        margin-bottom: 1rem;

        > *:not(:last-child) {
          margin-bottom: 1rem;
        }

        > {
          h1, h2, h3, h4, h5 {
            text-transform: capitalize;
          }
        }
      }

      hr {
        margin: calc(0.5rem - 1px) 0.5rem;
        height: 0;
        border: 1px solid black;
        border-radius: 1px;
      }

      sup, sub, small {
        line-height: 0;
      }

      ul, ol {
        list-style-position: inside;
      }
    }
  }
</style>
