<template>
  <code :class="syntax" class="notes-code">
    <slot/>
  </code>
</template>

<script>
  import hljs from 'highlight.js/lib/highlight'
  import 'highlight.js/styles/github-gist.css'

  export default {
    name: 'notes-code',
    props: {
      syntax: { type: String }
    },
    created () {
      this.syntax.split(' ').map(syntax => {
        console.log(`highlight.js/lib/languages/${syntax}`)
        import(`highlight.js/lib/languages/${syntax}`)
          .then((res) => hljs.registerLanguage(syntax, res.default))
          .then(() => this.$nextTick(() => hljs.highlightBlock(this.$el)))
      })
    }
  }
</script>

<style lang="scss">
  .notes-code {
    background-color: transparent !important;
    overflow: scroll;
    border-radius: 4px;
    text-indent: -1rem;
    padding: 0 0.5rem 0 1.5rem !important;
  }

  p, .label, h1, h2, h3, h4, h5 {
    .notes-code {
      display: inline-block;
    }
  }

  pre .notes-code {
    text-indent: inherit;
    padding: 0 1rem 1rem !important;
  }
</style>
