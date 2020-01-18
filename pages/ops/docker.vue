<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Docker</h1>
    </template>
    <section>
      <h1>FAQ</h1>
      <notes-outline>
        <template v-slot:label>
          <em>ps</em> vs <em>ls</em>
        </template>
        <p><em>ps</em> stands for <i>process status</i> and <em>ls</em> is just the commonplace, Unix <i>list</i>. This is why it suddenly makes sense for
          <notes-code syntax="bash">docker network ls</notes-code>
          , but not <i>ps</i> - the networks aren't processes that need statuses; they're just labels.
        </p>
      </notes-outline>
      <notes-outline label="listening for HTTP requests in a docker container">
        <p>If listening for requests using PHP or node, be sure to specify the host as <em>0.0.0.0</em> rather than <em>localhost</em>. Running a PHP or node server listening on <em>localhost:8080</em>, for example, will only accept requests originating from within the Docker container itself. <em>0.0.0.0:8080</em> would accept a request from anywhere on port <em>8080</em></p>
      </notes-outline>
      <notes-outline label="reducing image size">
        <p>Docker caches every command in a Dockerfile when building it into an image. To reduce the size of a docker image: combine as many commands into single lines as possible (usually by use of the <em>&&</em> bash operator.</p>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <em>COPY</em> vs <em>ADD</em>
        </template>
        <p>Prefer <em>COPY</em>. <em>COPY</em> simply copies a file from the build context/image to the container. Docker's <em>ADD</em> command is a more robust version of <em>COPY</em> in that it supports fetching from URLs and will automatically untar compressed archives.</p>
      </notes-outline>
      <notes-outline label="mounting directories in the Windows Linux Subsystem">
        <p>WLS mounts the Windows host to <em>/mnt</em>, eg: <em>C:\</em> is the equivalent of <em>/mnt/c/</em>. However, Docker Desktop (for Windows) expects mounts to originate with <em>/c</em>. The best solution is to leverage WLS' mount capabilities to just bind <em>/mnt/c</em> to <em>/c</em> with
          <notes-code syntax="bash">sudo mkdir /c && mount --bind /mnt/c /c</notes-code>
          . Alternatively, you can manually, explicitly bind mount paths so that the host path begins at <em>/c</em> rather than using shortcuts like <em>pwd</em> which may originate with <em>/mnt</em>. This is caused by the fact Docker doesn't have access to the WLS filesystem, so any work you do should be in the Windows host file system available through <em>/mnt/c</em> and its sub-directories.
        </p>
      </notes-outline>
    </section>
    <section>
      <notes-outline label="vocabulary">
        <ul>
          <li><em>Docker</em> is containerization software: it allows developers to specify the necessary OPS to run their application(s) which can then be <em>virtualized</em> or <em>emulated</em> by the host.</li>
          <li><em>Virtualization</em> is the process of binding the underlying hosts' native capabilities to the expected interfaces specified by docker.</li>
          <li><em>Emulation</em> is the process of booting up a small instance of the necessary interfaces.</li>
          <li><em>image</em> is the cached and tagged set of instructions for booting some virtualized software.</li>
          <li><em>container</em> is the built and configured instance of an image.</li>
        </ul>
      </notes-outline>
    </section>
    <section>
      <h1>helpful</h1>
      <notes-outline label="get Docker disk usage">
        <notes-code syntax="bash">docker run --net=host --ipc=host --uts=host --pid=host -it --security-opt=seccomp=unconfined --privileged --rm -v /:/host alpine sh -c "chroot /host df -h | grep docker"</notes-code>
        <ul>
          <li><em>chroot</em> sets the root directory to <em>/host</em> for the <em>df</em> command which prints disk usage in a <em>-h</em> human readable format.</li>
          <li>Because this command is actually introspecting the host (everything docker uses, rather than a single container), the <em>--net</em>, <em>--ipc</em>, and <em>--pid</em> all get set to <em>host</em>.</li>
          <li><em>--privileged</em> gives access to all docker devices on the host.</li>
        </ul>
      </notes-outline>
      <notes-outline label="remove all stopped docker containers">
        <notes-code syntax="bash">docker rm $(docker ps -qa)</notes-code>
        <ul>
          <li><em>ps</em> lists containers and <em>rm</em> removes containers.</li>
          <li>Specifying the <em>-aq</em> options causes all stopped containers to be removed.</li>
        </ul>
      </notes-outline>
      <notes-outline label="parse json">
        <notes-code syntax="bash">docker run --rm -i imega/jq -C path</notes-code>
        <ul>
          <li><em>jq</em> is a JSON parsing app.</li>
          <li>The output of <em>docker inspect</em> can be piped into the above for easy querying.</li>
          <li><em>path</em> is a dot-notation series of nested key paths to traverse the input JSON.</li>
        </ul>
      </notes-outline>
    </section>
    <section>
      <h1>inventory</h1>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker ps -a -q</notes-code>
        </template>
        <ul>
          <li><em>ps</em> lists all running docker containers.</li>
          <li><em>-a</em> is optional and flag includes stopped containers.</li>
          <li><em>-q</em> is optional and limits the output to only the container ids.</li>
        </ul>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker images</notes-code>
        </template>
        <ul>
          <li><em>images</em> lists all locally available images.</li>
        </ul>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker volume ls</notes-code>
        </template>
        <ul>
          <li><em>volume ls</em> lists all locally created volumes.</li>
        </ul>
      </notes-outline>
    </section>
    <section>
      <h1>introspection</h1>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker inspect container</notes-code>
        </template>
        <ul>
          <li><em>inspect</em> prints a JSON blob describing low-level information about the given container.</li>
          <li><em>container</em> may refer to either the container id or name (partial matches on id are accepted).</li>
        </ul>
      </notes-outline>
    </section>
    <section>
      <h1>cleanup</h1>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker rm -v container</notes-code>
        </template>
        <ul>
          <li><em>rm</em> deletes stopped containers.</li>
          <li><em>-v</em> is optional and deletes any volumes associated with the container.</li>
          <li><em>container</em> can be one or more (space-delimited) container ids (partial matches are accepted).</li>
        </ul>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker rmi image:tag</notes-code>
        </template>
        <ul>
          <li><em>rmi</em> deletes locally available images.</li>
          <li><em>tag</em> is optional and defaults to <em>latest</em>.</li>
        </ul>
      </notes-outline>
    </section>
    <section>
      <h1>interaction</h1>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker run --name=name --rm -it --link=container:service --network=net -p hp:cp -v hd:cd image:tag cmd</notes-code>
        </template>
        <ul>
          <li><em>run</em> spawns a container running the given <em>image</em> with the specified <em>tag</em>, the <em>tag</em> defaults to <em>latest</em>.</li>
          <li><em>--name</em> is optional and allows you to specify a custom label for the container, the default being a randomly generated name.</li>
          <li><em>--rm</em> is optional and deletes the container when it stops.</li>
          <li><em>-it</em> are optional and make the container interactive via a tty connection.</li>
          <li><em>--link</em> is optional and allows you to bind a running <em>container</em> with the label <em>service</em> so this new container can interact with it.</li>
          <li><em>--network</em> is optional and attaches the container to the specified network, auto-linking any other containers running in that network.</li>
          <li><em>-p</em> is optional and binds a host port to a container port (specifying 0 will assign a random, available port).</li>
          <li><em>-v</em> is optional and binds a host directory (or docker volume) to a container directory.</li>
          <li><em>cmd</em> is optional (the image may specify a default) and will be run when the container boots.</li>
        </ul>
      </notes-outline>
      <notes-outline>
        <template v-slot:label>
          <notes-code syntax="bash">docker commit -a author -m message container image:tag</notes-code>
        </template>
        <ul>
          <li><em>commit</em> creates an image from a run container.</li>
          <li><em>-a</em> is optional and allows you to specify the commit's <em>author</em> in the format <em>"First_Name Last_Name &lt;email@host.tld&gt;"</em></li>
          <li><em>-m</em> is optional and allows you to specify a commit <em>message</em> describing what has changed.</li>
          <li><em>container</em> references a local container id or name.</li>
          <li><em>image</em> is the repository used to store the image and <em>tag</em> is optional, defaulting to <em>latest</em>.</li>
        </ul>
      </notes-outline>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesOutline from '../../components/NotesOutline'
  import NotesCode from '../../components/NotesCode'

  export default {
    components: {
      NotesPaper,
      NotesOutline,
      NotesCode
    }
  }
</script>
