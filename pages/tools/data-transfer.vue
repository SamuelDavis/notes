<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Data Transfer</h1>
    </template>
    <section>
      <h1><notes-citation href="https://linux.die.net/man/1/curl">curl</notes-citation></h1>
      <notes-outline label="curl --limit-rate=100k -Lko output.txt https://example.com">
        <ul>
          <li><em>--limit-rate</em> is optional and allows you to cap the data-transfer rate.</li>
          <li><em>-L</em> is optional and follows redirects.</li>
          <li><em>-k</em> is optional and skips SSL checks.</li>
          <li><em>-o</em> is optional and specifies an <i>output file</i> to store the response in, ex: <em>output.txt</em>.</li>
          <li><em>https://example.com</em> specifies the url you're requesting.</li>
        </ul>
      </notes-outline>
    </section>
    <section>
      <h1><notes-citation href="https://linux.die.net/man/1/rsync">rSync</notes-citation></h1>
      <notes-outline label='rsync -ravPe "ssh -p port -i ssh_key" src target'>
        <ul>
          <li><em>-r</em> is optional and specifies that the rsync command should <em>recurse</em> into subdirectories.</li>
          <li><em>-a</em> is optional and specifies <em>archive mode</em>, meaning <em>ACLs</em>, <em>extended attributes</em>, and <em>hard links</em> should be preserved.</li>
          <li><em>-P</em> is optional and specifies that <em>permissions</em> should be preserved.</li>
          <li><em>-e</em> is optional and specifies a <i>remote shell</i>, in this example -- an SSH context for the rsync command.</li>
          <li><em>src</em> specifies where to read from.</li>
          <li><em>target</em> specifies where to copy to.</li>
        </ul>
        <p><em>src</em> and <em>target</em> may be remote filesystems, in which case they would take the format <code>user@ip:/remote/path</code>. A trailing slash will ensure the <em>content</em> of the directory will be copied from/to, rather than the directory itself.</p>
      </notes-outline>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesOutline from '../../components/NotesOutline'
  import NotesCitation from '../../components/NotesCitation'

  export default {
    components: {
      NotesPaper,
      NotesOutline,
      NotesCitation
    }
  }
</script>
