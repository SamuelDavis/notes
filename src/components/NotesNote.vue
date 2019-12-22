<script>
  export default {
    props: {
      content: [Array, Object]
    },
    name: 'notes-note',
    render (h) {
      if (this.content instanceof Array)
        return h('ul', this.content.map((line) => {
          const formatted = line.split('`').reduce((a, e, i) => {
            return e.trim() ? a.concat([h(i % 2 === 1 ? 'code' : 'span', e)]) : a
          }, [])
          return h('li', formatted)
        }))
      return h('div', [
        h('h3', this.content.label),
        h('notes-note', { props: { content: this.content.lines } })
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/_variables.scss";
  code {
    background-color: $code-highlight-color;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px $code-highlight-color;
  }
</style>
