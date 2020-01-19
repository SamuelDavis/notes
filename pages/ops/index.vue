<template>
  <notes-paper>
    <section>
      <h1>Vocabulary</h1>
      <ul>
        <li><em>tld</em> means <em>top-level domain</em> and is the highest level of the DNS hierarchy.</li>
      </ul>
    </section>
    <section>
      <h1>Local Development</h1>
      <notes-outline>
        <template v-slot:label>
          <em>.test</em> or <em>.local</em>, not <em>.dev</em>
        </template>
        <p><a href="https://icannwiki.org/.dev"><em>.dev</em></a> is a registered icann tld, <a href="https://en.wikipedia.org/wiki/.test"><em>.test</em></a> is reserved for development. <a href="https://en.wikipedia.org/wiki/.local"><em>.local</em> is also technically appropriate.</a></p>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <notes-citation href="https://gist.github.com/brablc/f48fef6336765212360ed3de66034b90">Dnsmasq for OSX</notes-citation>
        </template>
        <pre><notes-code syntax="bash">
brew install dnsmasq; #install dnsmasq
mkdir -pv $(brew --prefix)/etc/; #create config directory
echo 'address=/.test/127.0.0.1' >> $(brew --prefix)/etc/dnsmasq.conf; #route *.test to localhost
sudo brew services start dnsmasq; #autostart dnsmasq
sudo mkdir -v /etc/resolver; #create resolver dir
sudo bash -c 'echo "nameserver 127.0.0.1" > /etc/resolver/test'; #add nameserver to resolvers
</notes-code></pre>
      </notes-outline>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesCitation from '../../components/NotesCitation'
  import NotesCode from '../../components/NotesCode'
  import NotesOutline from '../../components/NotesOutline'

  export default {
    components: {
      NotesPaper,
      NotesOutline,
      NotesCitation,
      NotesCode
    }
  }
</script>
