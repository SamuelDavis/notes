<template>
  <notes-paper>
    <template v-slot:header>
      <h1>
        <notes-citation href="https://www.youtube.com/embed/6U7cLUygMeI">Dave Thomas' Keynote: EMPEX NYC</notes-citation>
      </h1>
    </template>
    <section>
      <h1>Vocabulary</h1>
      <ul>
        <li>A <em>library</em> is a stateless application.</li>
        <li>A <em>component</em> is a stateful application.</li>
        <li>An <em>assembly</em> is a configuration of components and libraries which is packaged as a deliverable.</li>
      </ul>
    </section>
    <section>
      <h1>Quotes</h1>
      <notes-quote cite="EMPEX NYC" href="https://www.youtube.com/embed/6U7cLUygMeI" source="Dave Thomas">
        <p>The more things that are coupled the more they resist change.</p>
        <p>The more things are interdependent, the harder it is to change one of them; because dependencies ripple through the entire application.</p>
        <p>Well designed code is easier to change than badly designed code.</p>
      </notes-quote>
    </section>
    <section>
      <h1>Takeaways</h1>
      <p>Our mission is to create well <em>structured</em>, highly <em>decoupled</em> solutions to problems.</p>
      <p>Our hope is that this will lead to code that is easier to <em>change</em>, <em>deploy</em>, <em>maintain</em>, and <em>reuse</em>.</p>
    </section>
    <section>
      <h1>Objectives</h1>
      <ul>
        <li>clearly identify the application</li>
        <li>isolate configuration</li>
        <li>maximize component reuse</li>
        <li>maximize simplicity</li>
      </ul>
    </section>
    <section>
      <h1>The web server</h1>
      <p>The <em>web server</em>, in this case <a href="https://www.phoenixframework.org/" target="_blank">Phoneix</a>, should be a <em>component</em>; it is the <em>view layer</em> and should contain <i>no</i> business logic.</p>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesQuote from '../../components/NotesQuote'
  import NotesCitation from '../../components/NotesCitation'

  export default {
    components: {
      NotesPaper,
      NotesQuote,
      NotesCitation
    }
  }
</script>
