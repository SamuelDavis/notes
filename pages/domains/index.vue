<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Domain Driven Design</h1>
      <h5>or</h5>
      <h2>[Framework] is not your Application</h2>
    </template>

    <section>
      <h1>Vocabulary</h1>
      <ul>
        <li>An <em>application</em> is a module or group of modules which implement a specific piece of functionality.</li>
        <li>A <em>module</em> is a collection of one or more functions which can be exported and utilized as a group. Depending on the language context, a module may or may not be stateless; some languages might refer to a module as a <i>class</i>.</li>
        <li>A <em>monolith</em> is a singular repository or application which implements behaviors across a wide range of domains.</li>
        <li>An <em>interface</em> is one or more applications which mediates a communication protocol for another application.</li>
      </ul>
    </section>
    <section>
      <h1>The Problem</h1>
      <p>Modern web frameworks invite you to install the framework first and <i>then</i> start developing your application. They encourage you to think about your app in the context of the framework rather than the context of the objectives you are trying to meet. As a result, you may end up smearing your concerns and logic around your filesystem in accordance with the framework's requirements. You also inherit a lot of boilerplate which isn't necessarily relevant to your objectives.</p>
    </section>
    <section>
      <h1>Who's context is it, Anyway?</h1>
      <p>
        <a href="https://www.youtube.com/watch?v=6U7cLUygMeI" target="_blank">Dave Thomas</a> and <a href="https://www.youtube.com/watch?v=Nsjsiz2A9mg" target="_blank">Robert Martin</a> make very compelling arguments that frameworks should be thought of as <i>plugins</i> to your application or <i>interfaces</i> to the Internet. It <i>isn't</i> a <i><a href="https://laravel.com/" target="_blank">Laravel</a></i> app. It isn't a <i><a href="https://www.phoenixframework.org/" target="_blank">Phoenix</a></i> app or a <i><a href="https://rubyonrails.org/" target="_blank">Rails</a></i> app. It's a: blogging app, banking app, search engine, content aggregator, etc. Your code <em>right down to the filesystem</em>, should express your intent. Starting with a framework is an invitation to write a monolith because frameworks are, by their very nature, monolithic: they pre-package as many domains as possible to ease your integration (with the web, in this case).
      </p>

      <notes-quote cite="Build your own SaaS" href="https://overcast.fm/+MBmWqe1VQ" source="Taylor Otwell">
        <p>Code you don't invoke won't impact performance.</p>
      </notes-quote>
      <i>...but it can certainly muddy the waters.</i>
    </section>
    <section>
      <h1>Don't use patterns, discover them</h1>
      <p>Instead of smearing your code around a frameworks' prepared file-structure, why not just put all of your code as a single, gigantic block of procedural code in a single place? <i>And then</i>, as it gets unwieldy, or patterns/consistencies begin to appear, break that code up into functions and classes?</p>
    </section>
    <section>
      <h1>The magic of Interfaces</h1>
      <p>If you have a <i>cross-cutting concern</i>, eg: if you need to rely on some domain outside the one you're working on, then why not use an interface? If you code to an interface, you can then use dependency-injection to fulfill that interfaces' requirements from your framework.</p>
    </section>
    <section>
      <h1>Instead of <code class="cmd">composer create-project laravel/laravel my-app</code>...</h1>
      <ol>
        <li>Create a brand new, empty composer project.</li>
        <li>Create a <code>src/</code> directory at the top-level which is auto-loaded with <code>psr-4</code> into some meaningful namespace.</li>
        <li>Create an <code>index.php</code> file in the project root where I write all the functionality of my app with as few dependencies as possible.</li>
        <li>As chunks of code begin to have meaning, wrap them up into classes and move those classes into the <code>src/</code> directory, replacing the code in <code>index.php</code> with those classes and methods.</li>
        <li>Create a README which either references that <code>index.php</code> file, or copy-pastes meaningful chunks from it to demonstrate how the application operates.</li>
      </ol>
      <p>Finally, create a new laravel app and require my app as a dependency of that laravel app. I then wire up whatever models, views, controllers, commands, jobs, etc. which alias to my app as much as possible. Using the above method, each domain can be its own little app and, if you want a monolith then you can compose them all into a single Laravel instance. Or, if you'd prefer a microservices approach, you could wrap each of them up into its own laravel app and deploy them separately.</p>
    </section>
    <section>
      <h1>References</h1>
      <div>
        <iframe :key="i" :src="src" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-for="(src, i) in references"></iframe>
      </div>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesQuote from '../../components/NotesQuote'

  export default {
    name: 'domains',
    components: {
      NotesPaper,
      NotesQuote
    },
    data () {
      return {
        references: [
          'https://www.youtube.com/embed/6U7cLUygMeI',
          'https://www.youtube.com/embed/Nsjsiz2A9mg',
          'https://www.youtube.com/embed/yCBUsd52a3s',
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "assets/highlight";

  .content {
    code {
      @include highlight($code-highlight-a-color);

      &.cmd {
        @include highlight($code-highlight-b-color);
      }
    }
  }
</style>
