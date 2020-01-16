<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Style Guide</h1>
    </template>
    <h1>h1</h1>
    <h2>h2</h2>
    <h3>h3</h3>
    <h4>h4</h4>
    <h5>h5</h5>
    <hr>
    <sup>sup</sup>
    <sub>sub</sub>
    <label>Label</label>
    <small>small</small>
    <pre>Here is some pre content</pre>
    <code>Here is some code content</code>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem commodi dicta impedit incidunt laboriosam mollitia quis quo tempore totam?</p>
    <br>
    <ul>
      <li :key="i" v-for="i in 3" v-text="`ul item ${i}`"/>
    </ul>
    <ol>
      <li :key="i" v-for="i in 3" v-text="`ol item ${i}`"/>
    </ol>
    <notes-citation href="#href">Citation</notes-citation>
    <notes-quote href="#quote" source="source" cite="citation">
      <p>Quotation</p>
    </notes-quote>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../components/NotesPaper'
  import NotesCitation from '../components/NotesCitation'
  import NotesQuote from '../components/NotesQuote'

  export default {
    components: {
      NotesPaper,
      NotesCitation,
      NotesQuote
    }
  }
</script>
