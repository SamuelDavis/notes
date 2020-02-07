<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Talks by <a href="https://www.sandimetz.com/" target="_blank">Sandi Metz</a></h1>
    </template>
    <article>
      <h1>
        <notes-citation href="https://www.youtube.com/watch?v=8bZh5LMaSmE">All the Little Things</notes-citation>
      </h1>
      <section>
        <h3>General Wisdom</h3>
        <notes-quote title="General Wisdom">
          <p>Changes in shape (indentation) mean you have nested conditionals (mixed scopes).</p>
          <p>Changing colors means your code is at differing levels of abstraction.</p>
          <p>Rush to green and then refactor.</p>
        </notes-quote>
        <article>
          <notes-quote>
            <span>Duplication is far cheaper than the wrong abstraction.</span>
          </notes-quote>
          <p>Abstractions add complexity, and increased complexity with the wrong abstraction is infinitely worse than simply duplicating a low-complexity solution.</p>
        </article>
        <article>
          <notes-quote>
            <span>Reach for open / closed.</span>
          </notes-quote>
          <p>The Open / Closed principle makes changes easy. If code never changes, then it won't break.</p>
        </article>
        <article>
          <notes-quote>
            <span>Refactor through complexity... Refactor to simplicity.</span>
          </notes-quote>
          <p>When refactoring, you should be trying to reduce the number of changes in the shape of your code (the depth, or indentation of your code) and the intermixing of colors in your code (interspersed abstractions). While refactoring, complexity may increase - but the goal is to ultimately reduce the complexity. This is done by taking large, nested, mixed blocks of code and breaking them into small methods on small objects which will be faster and easier to reason about / test.</p>
        </article>
      </section>
    </article>
    <article>
      <h1>
        <notes-citation href="https://www.youtube.com/watch?v=v-2yFMzxqwU">SOLID Object-Oriented Design</notes-citation>
      </h1>
      <section>
        <h3>Vocabulary</h3>
        <ul>
          <li>Every time <em>rigid</em> code changes, it causes a cascade of related changes.</li>
          <li><em>Fragile</em> code is unpredictably rigid.</li>
          <li><em>Immobile</em> code must be copied rather than imported to be reused.</li>
          <li><em>Viscous</em> code encourages you to adopt unintended patterns or otherwise misuse it.</li>
        </ul>
        <article id="solid">
          <notes-outline label="Single Responsibility">
            <em>There should never be more than one reason for a class to change.</em>
          </notes-outline>
          <notes-outline label="Open / Closed">
            <em>A module should be open for extension, but closed for modification.</em>
          </notes-outline>
          <notes-outline label="Liskov Substitution Principle">
            <em>Subclasses should be substitutable for their base classes.</em>
          </notes-outline>
          <notes-outline label="Interface Segregation">
            <em>Many client specific interfaces are better than one general purpose interface.</em>
          </notes-outline>
          <notes-outline label="Dependency Inversion">
            <em>Depend upon abstraction. Do not depend upon concretions.</em>
          </notes-outline>
        </article>
      </section>
      <section>
        <p>Code design, like testing, is initially expensive, but rewarding in the long term. Design reduces the cost of change over time.</p>
        <notes-outline label="Questions to Ask">
          <ul>
            <li>Is the class DRY?</li>
            <li>Does the class have one responsibility?</li>
            <li>Does everything in the class change at the same rate?</li>
            <li>Does the class depend on things that change less often than it does?</li>
          </ul>
        </notes-outline>
      </section>
    </article>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../../components/NotesPaper'
  import NotesCitation from '../../../components/NotesCitation'
  import NotesQuote from '../../../components/NotesQuote'
  import NotesOutline from '../../../components/NotesOutline'

  export default {
    components: {
      NotesPaper,
      NotesCitation,
      NotesQuote,
      NotesOutline
    }
  }
</script>

<style lang="scss">
  #solid .label::first-letter {
    font-weight: bold;
  }
</style>
