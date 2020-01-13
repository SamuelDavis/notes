<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Docker</h1>
    </template>
    <section>
      <h1>FAQ</h1>
      <div>
        <h2>listening for HTTP requests in a docker container</h2>
        <p>If listening for requests using PHP or node, be sure to specify the host as <code>0.0.0.0</code> rather than <code>localhost</code>. Running a PHP or node server listening on <code>localhost:8080</code>, for example, will only accept requests originating from within the Docker container itself. <code>0.0.0.0:8080</code> would accept a request from anywhere on port <code>8080</code></p>
      </div>
      <div>
        <h2>reducing image size</h2>
        <p>Docker caches every command in a Dockerfile when building it into an image. To reduce the size of a docker image: combine as many commands into single lines as possible (usually by use of the <code>&&</code> bash operator.</p>
      </div>
      <div>
        <h2><code>COPY</code> vs <code>ADD</code></h2>
        <p>Prefer <code>COPY</code>. <code>COPY</code> simply copies a file from the build context/image to the container. Docker's <code>ADD</code> command is a more robust version of <code>COPY</code> in that it supports fetching from URLs and will automatically untar compressed archives.</p>
      </div>
      <div>
        <h2>mounting directories in the Windows Linux Subsystem</h2>
        <p>WLS mounts the Windows host to <code>/mnt</code>, eg: <code>C:\</code> is the equivalent of <code>/mnt/c/</code>. However, Docker Desktop (for Windows) expects mounts to originate with <code>/c</code>. The best solution is to leverage WLS' mount capabilities to just bind <code>/mnt/c</code> to <code>/c</code> with <code class="cmd">sudo mkdir /c && mount --bind /mnt/c /c</code>. Alternatively, you can manually, explicitly bind mount paths so that the host path begins at <code>/c</code> rather than using shortcuts like <code>pwd</code> which may originate with <code>/mnt</code>. This is caused by the fact Docker doesn't have access to the WLS filesystem, so any work you do should be in the Windows host file system available through <code>/mnt/c</code> and its sub-directories.</p>
      </div>
    </section>
    <section>
      <div>
        <h2>vocabulary</h2>
        <ul>
          <li><code>Docker</code> is containerization software: it allows developers to specify the necessary OPS to run their application(s) which can then be <code>virtualized</code> or <code>emulated</code> by the host.</li>
          <li><code>Virtualization</code> is the process of binding the underlying hosts' native capabilities to the expected interfaces specified by docker.</li>
          <li><code>Emulation</code> is the process of booting up a small instance of the necessary interfaces.</li>
          <li><code>image</code> is the cached and tagged set of instructions for booting some virtualized software.</li>
          <li><code>container</code> is the built and configured instance of an image.</li>
        </ul>
      </div>
    </section>
    <section>
      <h1>helpful</h1>
      <div>
        <h2>get Docker disk usage</h2>
        <code class="cmd">docker run --net=host --ipc=host --uts=host --pid=host -it --security-opt=seccomp=unconfined --privileged --rm -v /:/host alpine sh -c "chroot /host df -h | grep docker"</code>
        <ul>
          <li><code>chroot</code> sets the root directory to <code>/host</code> for the <code>df</code> command which prints disk usage in a <code>-h</code> human readable format.</li>
          <li>Because this command is actually introspecting the host (everything docker uses, rather than a single container), the <code>--net</code>, <code>--ipc</code>, and <code>--pid</code> all get set to <code>host</code>.</li>
          <li><code>--privileged</code> gives access to all docker devices on the host.</li>
        </ul>
      </div>
      <div>
        <h2>remove all stopped docker containers</h2>
        <code class="cmd">docker rm $(docker ps -qa)</code>
        <ul>
          <li><code>ps</code> lists containers and <code>rm</code> removes containers.</li>
          <li>Specifying the <code>-aq</code> options causes all stopped containers to be removed.</li>
        </ul>
      </div>
      <div>
        <h2>docker run --rm -i imega/jq -C path</h2>
        <code>docker run --rm -i imega/jq -C path</code>
        <ul>
          <li><code>jq</code> is a JSON parsing app.</li>
          <li>The output of <code>docker inspect</code> can be piped into the above for easy querying.</li>
          <li><code>path</code> is a dot-notation series of nested key paths to traverse the input JSON.</li>
        </ul>
      </div>
    </section>
    <section>
      <h1>inventory</h1>
      <div>
        <code class="cmd">docker ps -a -q</code>
        <ul>
          <li><code>ps</code> lists all running docker containers.</li>
          <li><code>-a</code> is optional and flag includes stopped containers.</li>
          <li><code>-q</code> is optional and limits the output to only the container ids.</li>
        </ul>
      </div>
      <div>
        <code class="cmd">docker images</code>
        <ul>
          <li><code>images</code> lists all locally available images.</li>
        </ul>
      </div>
      <div>
        <code class="cmd">docker volume ls</code>
        <ul>
          <li><code>volume ls</code> lists all locally created volumes.</li>
        </ul>
      </div>
    </section>
    <section>
      <h1>introspection</h1>
      <div>
        <code class="cmd">docker inspect container</code>
        <ul>
          <li><code>inspect</code> prints a JSON blob describing low-level information about the given container.</li>
          <li><code>container</code> may refer to either the container id or name (partial matches on id are accepted).</li>
        </ul>
      </div>
    </section>
    <section>
      <h1>cleanup</h1>
      <div>
        <code class="cmd">docker rm -v container</code>
        <ul>
          <li><code>rm</code> deletes stopped containers.</li>
          <li><code>-v</code> is optional and deletes any volumes associated with the container.</li>
          <li><code>container</code> can be one or more (space-delimited) container ids (partial matches are accepted).</li>
        </ul>
      </div>
      <div>
        <code>docker rmi image:tag</code>
        <ul>
          <li><code>rmi</code> deletes locally available images.</li>
          <li><code>tag</code> is optional and defaults to <code>latest</code>.</li>
        </ul>
      </div>
    </section>
    <section>
      <h1>interaction</h1>
      <div>
        <code class="cmd">docker run --name=name --rm -it --link=container:service --network=net -p hp:cp -v hd:cd image:tag cmd</code>
        <ul>
          <li><code>run</code> spawns a container running the given <code>image</code> with the specified <code>tag</code>, the <code>tag</code> defaults to <code>latest</code>.</li>
          <li><code>--name</code> is optional and allows you to specify a custom label for the container, the default being a randomly generated name.</li>
          <li><code>--rm</code> is optional and deletes the container when it stops.</li>
          <li><code>-it</code> are optional and make the container interactive via a tty connection.</li>
          <li><code>--link</code> is optional and allows you to bind a running <code>container</code> with the label <code>service</code> so this new container can interact with it.</li>
          <li><code>--network</code> is optional and attaches the container to the specified network, auto-linking any other containers running in that network.</li>
          <li><code>-p</code> is optional and binds a host port to a container port (specifying 0 will assign a random, available port).</li>
          <li><code>-v</code> is optional and binds a host directory (or docker volume) to a container directory.</li>
          <li><code>cmd</code> is optional (the image may specify a default) and will be run when the container boots.</li>
        </ul>
      </div>
      <div>
        <code class="cmd">docker commit -a author -m message container image:tag</code>
        <ul>
          <li><code>commit</code> creates an image from a run container.</li>
          <li><code>-a</code> is optional and allows you to specify the commit's <code>author</code> in the format <code>"First_Name Last_Name &lacute;email@host.tld&racute;"</code></li>
          <li><code>-m</code> is optional and allows you to specify a commit <code>message</code> describing what has changed.</li>
          <li><code>container</code> references a local container id or name.</li>
          <li><code>image</code> is the repository used to store the image and <code>tag</code> is optional, defaulting to <code>latest</code>.</li>
        </ul>
      </div>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../components/NotesPaper'

  export default {
    components: {
      NotesPaper
    }
  }
</script>

<style lang="scss" scoped>
  @import "assets/highlight";

  $border-size: 1px;
  $label-bg-color: rgba(255, 255, 255, 0.90);

  section {
    margin-bottom: 1rem;

    h1 {
      text-transform: capitalize;
      margin-bottom: 1rem;
    }

    div {
      border-radius: 5px;
      box-shadow: inset 0 0 1px 0 black, 0 0 1px 0 black;
      padding: 1rem;
      margin-bottom: 1rem;

      h2 {
        text-transform: capitalize;
        top: -1.5rem;
        position: relative;
        margin-bottom: -1rem;
        font-size: medium;
        background-color: $label-bg-color;
        box-shadow: 0 0 2px 2px $label-bg-color;
        width: fit-content;
      }

      code {
        @include highlight($code-highlight-a-color);

        &.cmd {
          @include highlight($code-highlight-b-color);
        }
      }
    }
  }
</style>
