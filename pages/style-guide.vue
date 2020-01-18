<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Style Guide</h1>
    </template>
    <section>
      <h3>headers</h3>
      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <h5>h5</h5>
    </section>
    <section>
      <h3>text formatters</h3>
      <em>emphasis</em>
      <i>italics</i>
      <sup>super</sup>
      <sub>sub</sub>
      <label>label</label>
      <small>small</small>
      <pre>Here is
    some pre
  content</pre>
      <code>Here is some code content</code>
    </section>
    <section>
      <h3>lists</h3>
      <ul>
        <li :key="i" v-for="i in 3" v-text="`ul item ${i}`"/>
      </ul>
      <ol>
        <li :key="i" v-for="i in 3" v-text="`ol item ${i}`"/>
      </ol>
    </section>
    <section>
      <h3>citation</h3>
      <notes-citation href="#href">Citation</notes-citation>
    </section>
    <section>
      <h3>quotation</h3>
      <notes-quote cite="citation" href="#quote" source="source">
        <p>Quotation: Lorem ipsum dolor sit amet.</p>
        <h4>another quote</h4>
        <span>last quote</span>
      </notes-quote>
    </section>
    <section>
      <h3>content outlines</h3>
      <notes-outline>
        <p>outlined para 1</p>
        <p>outlined para 2</p>
      </notes-outline>
      <notes-outline label="outline label">
        <div>Some outlined content</div>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <strong>
            <em>outline</em><i>label</i>
          </strong>
        </template>
        <p>outlined para 1</p>
        <p>outlined para 2</p>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="php"><?= print_r(["a" => 1 + 2], true);</notes-code>
        </template>
        <p>outlined para 1</p>
        <p>outlined para 2</p>
      </notes-outline>
    </section>
    <section>
      <h3>highlighted code in header</h3>
      <h1>Code in headers will overflow:
        <notes-code syntax="javascript">window.console.log("Lorem ipsum dolor sit amet.")</notes-code>
      </h1>
    </section>
    <section>
      <h3>highlighted code</h3>
      <notes-code syntax="bash">
        ping localhost:8080
      </notes-code>
    </section>
    <section>
      <h3>highlighted multiline code</h3>
      <pre><notes-code syntax="yaml">
foo:
  bar:
    - a
    - b
  qux: this/that:version
  num:
    min: 0
    max: 1
</notes-code></pre>
    </section>
    <section>
      <h3>text containers</h3>
      <p>paragraph: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eveniet expedita iusto molestiae nobis quibusdam repudiandae sequi. Beatae consequuntur obcaecati, provident repellat saepe sapiente suscipit.</p>
      <div>div: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores, autem, dicta distinctio dolorum eaque earum eligendi explicabo, fugit labore laborum officiis omnis reiciendis voluptatum.</div>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../components/NotesPaper'
  import NotesCitation from '../components/NotesCitation'
  import NotesQuote from '../components/NotesQuote'
  import NotesCode from '../components/NotesCode'
  import NotesOutline from '../components/NotesOutline'

  export default {
    components: {
      NotesPaper,
      NotesCitation,
      NotesQuote,
      NotesCode,
      NotesOutline
    }
  }
</script>

<style lang="scss" scoped>
  section > h3:first-child {
    text-transform: uppercase;

    &:after {
      content: '\2026';
    }
  }
</style>
