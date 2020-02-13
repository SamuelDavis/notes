<template>
  <blockquote :cite="href" class="notes-quote">
    <slot/>
    <footer v-if="source || cite">
      <notes-citation :href="href" v-if="source && !cite">{{source}}</notes-citation>
      <span v-else-if="source" v-text="source"/>
      <notes-citation :href="href" v-if="cite">{{cite}}</notes-citation>
    </footer>
  </blockquote>
</template>

<script>
  import NotesOutline from './NotesOutline'
  import NotesCitation from './NotesCitation'

  export default {
    name: 'notes-quote',
    props: {
      href: String,
      cite: String,
      source: String,
    },
    components: {
      NotesOutline,
      NotesCitation
    }
  }
</script>

<style lang="scss" scoped>
  .notes-quote {
    $highlightColor: rgba(255, 255, 0, 0.25);
    $blur: 4px;
    background-color: $highlightColor;
    box-shadow: 0 0 $blur 0 $highlightColor, 0 0 $blur 0 $highlightColor;
    border-radius: 16px;
    max-width: fit-content;

    > :not(footer) {
      &::before {
        content: '\201C';
      }

      &::after {
        content: '\201D';
      }
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
</style>
