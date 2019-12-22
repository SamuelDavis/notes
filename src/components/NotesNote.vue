<script>
  function formatLine (line) {
    return line.split('').reduce((acc, chr, i, arr) => {
      const state = acc[acc.length - 1][0]

      switch (state) {
        case '`':
          if (chr === '`') { return acc.push(['', '']) && acc }
          break
        case '\'':
          if (chr === '\'') { return acc.push(['', '']) && acc }
          break
        default: {
          switch (chr) {
            case '`':
              return acc.push(['`', '']) && acc
            case '\'':
              if (!/\b/.test(arr[i - 1]))
                return acc.push(['\'', '']) && acc
          }
        }
      }

      acc[acc.length - 1][1] += chr

      return acc
    }, [['', '']])
  }

  export default {
    props: {
      content: [Array, Object]
    },
    name: 'notes-note',
    render (h) {
      if (this.content instanceof Array)
        return h('ul', this.content.map((line) => {
          const formatted = formatLine(line).map(([type, text]) => {
            switch (type) {
              case '`':
                return h('code', { class: 'highlight-1' }, text)
              case '\'':
                return h('code', { class: 'highlight-2' }, text)
              default:
                return h('span', text)
            }
          })
          return h('li', formatted)
        }))
      return h('div', [
        h('h4', this.content.label),
        h('code', this.content.cmd),
        h('notes-note', { props: { content: this.content.lines } })
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/_variables.scss";

  .highlight-1 {
    @include highlight($code-highlight-a-color)
  }

  .highlight-2 {
    @include highlight($code-highlight-b-color)
  }

  div > code {
    @include highlight($code-highlight-c-color)
  }

  h4 {
    width: max-content;
    font-weight: bold;
  }
</style>
