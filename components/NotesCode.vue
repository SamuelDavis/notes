<template>
  <code :class="syntax">
    <slot/>
  </code>
</template>

<script>
  import hljs from 'highlight.js/lib/highlight'
  import 'highlight.js/styles/atom-one-dark-reasonable.css'

  export default {
    name: 'notes-code',
    props: {
      syntax: { type: String }
    },
    created () {
      import(`highlight.js/lib/languages/${this.syntax}`)
        .then((res) => hljs.registerLanguage(this.syntax, res.default))
        .then(() => {
          this.$nextTick(() => document.querySelectorAll('code').forEach((el) => {
            hljs.highlightBlock(el)
          }))
        })
    }
  }
</script>

<style lang="scss">
  .hljs {
    padding: 0 3px !important;
    border-radius: 3px;
    width: fit-content;
    overflow-y: hidden;
  }

  pre .hljs {
    width: inherit;
  }

  p, h1, h2, h3, h4, h5, li {
    .hljs {
      display: inline;
    }
  }
</style>
