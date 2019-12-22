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
    <sup>sup</sup>
    <sub>sub</sub>
    <label>Label</label>
    <small>small</small>
    <pre>Here is some pre content</pre>
    <code>Here is some code content</code>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur autem commodi dicta impedit incidunt laboriosam mollitia quis quo tempore totam?</p>
    <ul>
      <li :key="i" v-for="i in 3" v-text="`ul item ${i}`"/>
    </ul>
    <ol>
      <li :key="i" v-for="i in 3" v-text="`ol item ${i}`"/>
    </ol>
    <br>
    <button>button</button>
    <hr>
    <form action="">
      <fieldset>
        <label>
          Text:
          <input placeholder="text..." type="text">
        </label>
      </fieldset>
      <fieldset>
        <label>
          Select:
          <select>
            <option :key="i" :value="`val-${i}`" v-for="i in 3" v-text="`option ${i + 1}`"/>
          </select>
        </label>
      </fieldset>
      <input type="submit">
    </form>
  </notes-paper>
</template>

<script>
  export default {
    name: 'style-guide'
  }
</script>
