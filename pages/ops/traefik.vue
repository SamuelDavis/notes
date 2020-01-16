<template>
  <notes-paper>
    <template v-slot:header>
      <h1><a href="https://docs.traefik.io/" target="_blank">Traefik</a><small>(v2)</small></h1>
      <h3>An HTTP Reverse-Proxy</h3>
    </template>
    <section>
      <h1>Pieces of the Request Lifecycle</h1>
      <div>
        <h3>Entry Points</h3>
        <p>The <em>entry point</em> defines what <em>port</em> and <em>protocol</em> a <em>request</em> must match for Traefik to handle it.</p>
      </div>
      <div>
        <h3>Routers</h3>
        <p>A <em>router</em> checks to see if a <em>request</em> matches a given set of <em>rules</em> and, if so, applies a given set of <em>middleware</em> to the <em>request</em> (potentially changing it) before forwarding the <em>request</em> to a <em>service</em>.</p>
      </div>
      <div>
        <h3>Services</h3>
        <p>A <em>service</em> is a <em>server</em> which will handle the <em>request</em> (ex. load balancing, mirroring).</p>
      </div>
    </section>
    <section>
      <h1>Configuration</h1>
      <div>
        <h3>Static</h3>
        <p>When Traefik starts it will load a <em>static configuration</em> which cannot change until Traefik is restarted. This configuration consists of the <em>entry points</em> Traefik should handle as well as any <em>provider connection info</em> (eg. how to access the <em>Docker</em> host.)</p>
      </div>
      <div>
        <h3>Dynamic</h3>
        <p>Traefik has various events that it listens for which allows you to <em>dynamically configure</em> its <em>routers</em>,<em>middlewares</em>, <em>services</em>, and <em>certificates</em> while it is running.</p>
      </div>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'

  export default {
    components: {
      NotesPaper
    }
  }
</script>
