<template>
  <div :class="{labeled: Boolean(label)}">
    <h4 class="label" v-if="label" v-text="label"/>
    <code class="cmd" v-if="cmd" v-text="cmd"/>
    <ul v-if="formattedLines.length">
      <li :key="i" v-for="(line, i) in formattedLines">
        <span :class="c" :is="is" :key="j" v-for="({is, text, class: c}, j) in line" v-text="text"/>
      </li>
    </ul>
  </div>
</template>

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
      label: String,
      cmd: String,
      lines: Array,
    },
    name: 'notes-note',
    computed: {
      formattedLines () {
        return this.lines.map((line) => {
          return formatLine(line).map(([type, text]) => {
            switch (type) {
              case '`':
                return { is: 'code', class: 'code', text }
              case '\'':
                return { is: 'span', class: 'notice', text }
              default:
                return { is: 'span', class: undefined, text }
            }
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $border-size: 1px;
  $label-bg-color: rgba(255, 255, 255, 0.90);
  $code-highlight-a-color: rgba(255, 150, 150, 0.25);
  $code-highlight-b-color: rgba(150, 255, 150, 0.25);
  $code-highlight-c-color: rgba(150, 150, 255, 0.25);

  @mixin highlight($color) {
    background-color: $color;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px $color;
  }

  div {
    border-radius: 5px;
    box-shadow: inset 0 0 1px 0 black, 0 0 1px 0 black;
    padding: 1rem;
    background-color: transparent;

    &.labeled {
      .label {
        position: relative;
        top: -1.5rem;
        text-transform: uppercase;
        background-color: $label-bg-color;
        box-shadow: 0 0 5px 5px $label-bg-color;
        width: fit-content;
      }
    }
  }

  .code {
    @include highlight(rgba(255, 150, 150, 0.25));
  }

  .notice {
    @include highlight(rgba(150, 255, 150, 0.25));
  }

  .cmd {
    @include highlight(rgba(150, 150, 255, 0.25));
  }
</style>
