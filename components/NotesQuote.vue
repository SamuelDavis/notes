<template>
  <blockquote :cite="href">
    <slot/>
    <footer v-if="source || cite">
      <span v-if="source" v-text="source"/>
      <notes-citation :href="href" v-if="cite">{{cite}}</notes-citation>
    </footer>
  </blockquote>
</template>

<script>
  import NotesCitation from './NotesCitation'

  export default {
    name: 'notes-quote',
    props: {
      href: String,
      cite: String,
      source: String,
    },
    components: {
      NotesCitation
    }
  }
</script>

<style lang="scss" scoped>
  @import "assets/highlight";

  blockquote {
    @include highlight(rgba(100, 200, 100, 0.1), 0.5rem);
    width: fit-content;
    border-radius: 5px;

    p {
      &::before {
        content: '\201C';
      }

      &::after {
        content: '\201D';
      }
    }

    footer {
      text-align: right;

      &::before {
        content: '\2013';
        margin-right: 0.5rem;
      }

      *:not(:last-child)::after {
        content: ','
      }
    }
  }
</style>
