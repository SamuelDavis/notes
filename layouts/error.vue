<template>
  <notes-paper>
    <template v-slot:header>
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
    </template>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../components/NotesPaper'

  export default {
    props: ['error'],
    components: {
      NotesPaper
    }
  }
</script>
