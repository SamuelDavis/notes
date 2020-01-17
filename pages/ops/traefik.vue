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
        <p>Traefik can be statically configured by specifying flags at the commandline when starting it, or providing <em>.TOML</em> or <em>.YAML</em> files. Certain configuration options can be specified in other formats as well (eg. Docker labels &amp; Kubernetes resources).</p>
      </div>
      <div>
        <h3>Dynamic</h3>
        <p>Traefik has various events that it listens for which allows you to <em>dynamically configure</em> its <em>routers</em>, <em>middlewares</em>, <em>services</em>, and <em>certificates</em> while it is running.</p>
        <p>It does not matter if traefik is started <em>before or after</em> the containers its meant to route to. When it starts it will canvas all containers <em>it has access to</em> and compile their provided configuration. This does mean, however, that traefik's container and the containers it's meant to interact with <em>must be on the same network</em>; traefik can neither read the configuration of nor route requests to containers it's virtually or physically isolated from.</p>
      </div>
    </section>
    <section>
      <h1>Quick &amp; Dirty Nuxt-Development Example</h1>
      <notes-outline label="Boot Traefik">
        <pre><code class="lang-bash">docker run --rm \
--net=reverse-proxy \
--name=reverse-proxy \
-p 80:80 -p 8080:8080 \
-v /var/run/docker.sock:/var/run/docker.sock \
traefik:v2.0 \
--log.level=DEBUG \
--api.insecure=true \
--providers.docker</code></pre>
        <ul>
          <li><em>--net=reverse-proxy</em> specifies that docker should add the traefik container to the network named <em>reverse-proxy</em>. All the containers traefik should be routing to will also be placed in this network.</li>
          <li><em>--name=reverse-proxy</em> just specifies that the traefik container should be accessible via the custom name <em>reverse-proxy</em>.</li>
          <li><em>-p 80:80</em> and <em>-p 8080:8080</em> enable docker (and thus traefik) to handle requests on those ports. <em>8080</em> is the default port for the optional traefik dashboard.</li>
          <li><em>-v *.sock:*.sock</em> mounts our host's docker socket to the traefik container so that traefik can listen to and manipulate our docker instance.</li>
          <li><em>traefik:2.0</em> is just the traefik docker image used for this example.</li>
          <li><em>--log.level=DEBUG</em> specifies what types of messages traefik should log, with <em>DEBUG</em> being the most permissive and <em>INFO</em> being the most restrictive.</li>
          <li><em>--api.insecure=true</em> is a flag telling traefik, when it starts, to enable the dashboard (listening on port 8080 by default).</li>
          <li><em>--providers.docker</em> is a flag telling traefik, when it starts, that it should be using docker to orchestrate the various servers; traefik supports multiple providers including <a href="https://aws.amazon.com/ecs/" target="_blank">Amazon ECS</a> and <a href="https://kubernetes.io/" target="_blank">Kubernetes</a>.</li>
        </ul>
      </notes-outline>
      <notes-outline label="Boot Nuxt">
        <pre><code class="lang-bash">docker run --rm \
--expose=3000 \
--network=reverse-proxy \
--label="traefik.http.routers.nuxt.rule=Host(\"nuxt.test\")" \
-v $(pwd):/code -w /code \
samueldavis/vue:latest \
npm run dev</code></pre>
        <ul>
          <li><em>--expose=3000</em> the Nuxt development server listens on port 3000 by default and by explicitly exposing only one port traefik can dynamically infer it should be forwarding its <em>port 80</em> traffic to <em>port 3000</em> on the nuxt container.</li>
          <li><em>--network=reverse-proxy</em> tells docker to put the nuxt container in the same network as traefik so that traefik can listen to events and configuration provided by the nuxt container.</li>
          <li><em>--label="traefik.http.routers.nuxt.rule=Host(\"nuxt.test\")"</em> is a label which traefik is looking for when containers boot up which informs traefik it should set up a router which forwards requests matching the <em>nuxt.test</em> domain to the nuxt container.</li>
          <li><em>-v $(pwd):/code</em> and <em>-w /code</em> just mount the current working directory on the host to the <em>/code</em> directory in the nuxt container and set t as the default working directory. This allows the <em>npm run</em> command not to have to specify the project root to run.</li>
          <li><em>samueldavis/vue:latest</em> is just a node docker container with vue-cli &amp; nuxt pre-installed.</li>
          <li><em>npm run dev</em> just invokes the default nuxt (development) server to start listening for incoming requests (by default on port 3000) and serving the nuxt app.</li>
        </ul>
      </notes-outline>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesOutline from '../../components/NotesOutline'

  export default {
    components: {
      NotesPaper,
      NotesOutline
    }
  }
</script>
