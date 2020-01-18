<template>
  <notes-paper>
    <template v-slot:header>
      <h1><a href="https://docs.traefik.io/" target="_blank">Traefik</a> <small>(v2)</small></h1>
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
        <pre><notes-code syntax="bash">
docker run --rm \
--net=reverse-proxy \
--name=reverse-proxy \
-p 80:80 -p 8080:8080 \
-v /var/run/docker.sock:/var/run/docker.sock \
traefik:v2.0 \
--log.level=DEBUG \
--api.insecure=true \
--providers.docker
</notes-code></pre>
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
        <pre><notes-code syntax="bash">
docker run --rm \
--expose=3000 \
--network=reverse-proxy \
--label="traefik.http.routers.nuxt.rule=Host(\"nuxt.test\")" \
-v $(pwd):/code -w /code \
samueldavis/vue:latest \
npm run dev
</notes-code></pre>
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
    <section>
      <h1>
        <a href="https://gist.github.com/SamuelDavis/706cb22355ff92ff10cf5817ca1dcc57" target="_blank">WordPress with HTTPS Example</a>
      </h1>
      <pre><notes-code syntax="yaml">
version: '3'

networks:
  reverse-proxy: {}
  wp-test: {}

volumes:
  wp-test-db: {}

services:
  reverse-proxy:
    image: traefik:v2.0
    restart: always
    ports:
      - "8080:8080"
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./certs:/certs # directory to store letsEncrypt certs
    networks:
      - reverse-proxy
    command:
      # API SETTINGS
      - --api.insecure=true # enable the (insecure) API
      - --api.dashboard=true # enable the dashboard
      # LOG SETTINGS
      - --log.level=DEBUG # most extensive logging
      # PROVIDER SETTINGS
      - --providers.docker # use docker (as opposed to kubernetes, etc.)
      - --providers.docker.exposedByDefault=false # ignore containers unless they're specially labled
      - --providers.docker.network=reverse-proxy # docker network to look for containers in
      # ENTRYPOINTS
      - --entrypoints.insecure.address=:80 # listen on port 80
      - --entrypoints.secure.address=:443 # listen on port 443
      # AUTOMAGICALLY GENERATE LETSENCRYPT CERTIFICATES
      # WARNING: LETS ENCRYPT CAN ONLY VALIDATE ICANN TLDS, THUS *.test WILL ERROR & BE INVALID
      # - --certificatesResolvers.le.acme.email=example@gmail.com
      # - --certificatesResolvers.le.acme.storage=/certs/acme.json
      # - --certificatesResolvers.le.acme.httpChallenge.entryPoint=insecure
    labels:
      # PRETTY URL FOR TRAEFIK DASHBOARD
      - "traefik.enable=true" # enable host routing for dashboard
      - "traefik.http.routers.traefik.rule=Host(\"traefik.test\")" # set url for dashboard
      - "traefik.http.routers.traefik.service=api@internal" # point the router at the dashboard backend, not frontend
      # HTTP > HTTPS REDIRECT MIDDLEWARE
      - "traefik.http.middlewares.secure-redirect.redirectscheme.scheme=https"
      # PROVIDED OWN CERTIFICATES
      # - "traefik.https.routers.secure.tls.certificates.certFile=\"/certs/test.crt\"" # specify own cert
      # - "traefik.https.routers.secure.tls.certificates.keyFile=\"/certs/test.key\"" #specify own key
  wp-test:
    image: wordpress:latest
    restart: always
    depends_on:
      - wp-test-db
    volumes:
      - ./src:/var/www/html
    networks:
      - reverse-proxy # traefik needs to be able to send requests to this container
      - wp-test # this container, but not traefik, needs to be able to talk to the db
    environment:
      WORDPRESS_DB_HOST: wp-test-db
      WORDPRESS_DB_USER: wp-test-user
      WORDPRESS_DB_PASSWORD: wp-test-pass
      WORDPRESS_DB_NAME: wp-test-db
    labels:
      - "traefik.enable=true" # traefik should handle this container
      - "traefik.http.routers.insecure.rule=Host(\"wp.test\", \"www.wp.test\")" # traefik should handle this container
      - "traefik.http.routers.insecure.entrypoints=insecure" # listen for HTTP
      - "traefik.http.routers.insecure.middlewares=secure-redirect" # redirect to https
      - "traefik.https.routers.secure.rule=Host(\"wp.test\", \"www.wp.test\")" # traefik should handle this container
      - "traefik.https.routers.secure.entrypoints=secure" # listen for HTTPS
      # - "traefik.https.routers.secure.tls.certResolver=le" # use letsEncrypt to certify
  wp-test-db:
    image: mysql:5.7
    restart: always
    networks:
      - wp-test # this container can talk to the wp-test container, but is secure from traefik traffic
    volumes:
      - wp-test-db:/var/lib/mysql
    environment:
      MYSQL_DATABASE: wp-test-db
      MYSQL_USER: wp-test-user
      MYSQL_PASSWORD: wp-test-pass
      MYSQL_ROOT_PASSWORD: root
</notes-code></pre>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesOutline from '../../components/NotesOutline'
  import NotesCitation from '../../components/NotesCitation'
  import NotesCode from '../../components/NotesCode'

  export default {
    components: {
      NotesPaper,
      NotesOutline,
      NotesCitation,
      NotesCode
    }
  }
</script>
