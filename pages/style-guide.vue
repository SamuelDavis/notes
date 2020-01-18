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
    <notes-quote cite="citation" href="#quote" source="source">
      <p>Quotation</p>
    </notes-quote>
    <label>Bash example:</label>
    <notes-code syntax="bash">
      ping localhost:8080
    </notes-code>
    <label>YAML example:</label>
    <pre><notes-code syntax="yaml">foo:
    bar:
      - a
      - b
    qux: this/that:version
    num:
      min: 0
      max: 1</notes-code></pre>
    <br>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../components/NotesPaper'
  import NotesCitation from '../components/NotesCitation'
  import NotesQuote from '../components/NotesQuote'
  import NotesCode from '../components/NotesCode'

  export default {
    components: {
      NotesPaper,
      NotesCitation,
      NotesQuote,
      NotesCode
    }
  }
</script>
