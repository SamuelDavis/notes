<template>
  <notes-paper>
    <template v-slot:header>
      <h1>
        <notes-citation href="https://www.youtube.com/embed/Nsjsiz2A9mg">Clean Architecture and Design</notes-citation>
      </h1>
    </template>
    <section>
      <h1>Model-View-Presenter</h1>
      <img alt="architecture-diagram" src="/ndc-architecture-diagram.png">
    </section>
    <section>
      <h1>vocabulary</h1>
      <ul>
        <li>An <em>interactor</em> is an object, potentailly a <em>command</em> when using the <a href="https://sourcemaking.com/design_patterns/command" target="_blank">Command Pattern</a>, which implements a use case. <em>Interactors</em> have application-specific business rules.</li>
        <li>An <em>entity</em>, or <em>business model</em>, contains application-agnostic rules.</li>
        <li>A <em>boundary</em>, typically an <em>interface</em>, is the API through which <em>request/response models</em> flow in or out of an <em>interactor</em>.</li>
        <li><em>Request/response model</em>s are delivery mechanism-independent representations of the inputs/outputs of your application.</li>
        <li>A <em>presenter</em> takes a response model from a <em>boundary</em> and converts it into a <em>view model</em>.</li>
        <li>A <em>view model</em> encapsulates any data required by your <em>delivery mechanism</em> (eg. the web).</li>
        <li>A <em>component boundary</em> defines a boundary with unidirectional dependencies; everything on one side is a plugin to the other.</li>
        <li>A <em>delivery mechanism</em> is how the end user interacts with the system, eg: <a href="https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol">HTTP</a>.</li>
      </ul>
      <i>An <em>interactor</em> depends on many things; nothing depends on an interactor.</i>
    </section>
    <section>
      <h1>Quotes</h1>
      <notes-quote cite="NDC 2013" href="https://www.youtube.com/embed/Nsjsiz2A9mg" source="Robert C. Martin">
        <p>Architecture is about <i>intent</i>.</p>
        <p>The web is a delivery mechanism!</p>
        <p>The web should be a plugin to your application.</p>
        <p>Why would the IO channel dictate the structure at the highest level of our application?</p>
        <p>The database is a detail.</p>
        <p>A good architect maximizes the number of decisions <i>not</i> made.</p>
      </notes-quote>
    </section>
    <section>
      <h1>Takeaways</h1>
      <p>Your source code, right down to the file structure, should be expressive of the intent of your application. You should be able to immediately infer what your application does just by looking at the filesystem.</p>
      <p>The web is your UI layer; it should not <i>define</i> your application. Your application should run as readily on the command line as through a web server.</p>
      <p>Your framework should be treated as a UI plugin and abstracted away from your application. Your framework may rely on the application, but the application must not rely on the framework.</p>
      <p>Your database should be treated as a persistence plugin and abstracted away from your application. <em>Boundaries</em> can be concerned with the minutia of translating your application between different persistence implementations.</p>
      <p>Think of the application as a group in use cases which describe intent, and then a group of plugins which give those use cases access to the outside world.</p>
    </section>
    <section>
      <h1>
        <notes-citation href="https://www.amazon.com/Object-Oriented-Software-Engineering-Approach/dp/0201544350">Object-Oriented Software Engineering</notes-citation>
      </h1>
      <div>
        <h2>use cases</h2>
        <notes-quote source="Robert C. Martin">
          <p>A use case is a description of an action a user will perform on the system.</p>
        </notes-quote>
        <ul>
          <li><em>Data</em> describes any data being manipulated by the use case.</li>
          <li><em>Primary course</em> describes the step-by-step process taken to instantiate, process, and resolve the use case.</li>
          <li><em>Exception course</em> describes how to recover from expected fail states from the use case.</li>
        </ul>
        <p>Use cases should be implementation-agnostic. <i>Perhaps</i> the <em>data</em> is collected in a web-form and the <em>primary course</em> resolves to a database-generated id, but those details will not be included in the use case documentation. These are <i>details</i> and subject to regular, potentially radical change.</p>
      </div>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesCitation from '../../components/NotesCitation'
  import NotesQuote from '../../components/NotesQuote'

  export default {
    name: 'clean-architecture-and-deign',
    components: {
      NotesPaper,
      NotesCitation,
      NotesQuote
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    img {
      height: 36rem;
      object-fit: contain;

      @media (max-width: 800px) {
        height: 18rem;
      }

      @media (max-width: 400px) {
        height: 9rem;
      }
    }
  }
</style>
