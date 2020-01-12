<template>
  <notes-paper>
    <template v-slot:header>
      <h1>Docker</h1>
    </template>
    <section :key="label" v-for="(notes, label) in template">
      <h2 v-text="label"/>
      <notes-note :key="i" class="note" v-bind="note" v-for="(note, i) in notes"/>
    </section>
  </notes-paper>
</template>

<script>
  import NotesNote from '../components/NotesNote'
  import NotesPaper from '../components/NotesPaper'

  export default {
    name: 'docker',
    components: {
      NotesPaper,
      NotesNote
    },
    data () {
      return {
        template: {
          'Faq': [
            {
              'label': 'listening for HTTP requests in a docker container',
              'lines': [
                'If listening for requests using PHP or node, be sure to specify the host as `0.0.0.0` rather than `localhost`. Running a PHP or node server listening on `localhost:8080`, for example, will only accept requests originating from within the Docker container itself. `0.0.0.0:8080` would accept a request from anywhere on port `8080`.'
              ]
            },
            {
              'label': 'reducing image size',
              'lines': [
                'Docker caches every command in a Dockerfile when building it into an image. To reduce the size of a docker image: combine as many commands into single lines as possible (usually by use of the `&&` bash operator.'
              ]
            },
            {
              'label': '`COPY` vs `ADD`',
              'lines': [
                'Prefer `COPY`. `COPY` simply copies a file from the build context\/image to the container. Docker\'s `ADD` command is a more robust version of `COPY` in that it supports fetching from URLs and will automatically untar compressed archives.'
              ]
            },
            {
              'label': 'mounting directories in the Windows Linux Subsystem',
              'lines': [
                'WLS mounts the Windows host to `\/mnt`, eg: `C:\\` is the equivalent of `\/mnt\/c\/`. However, Docker Desktop (for Windows) expects mounts to originate with `\/c`. The best solution is to leverage WLS\' mount capabilities to just bind `\/mnt\/c` to `\/c` with `sudo mkdir \/c && mount --bind \/mnt\/c \/c`. Alternatively, you can manually, explicitly bind mount paths so that the host path begins at `\/c` rather than using shortcuts like `pwd` which may originate with `\/mnt`. This is caused by the fact Docker doesn\'t have access to the WLS filesystem, so any work you do should be in the Windows host file system available through `\/mnt\/c` and its sub-directories.'
              ]
            }
          ],
          'vocabulary': [
            {
              'label': undefined,
              'cmd': undefined,
              'lines': [
                '`Docker` is containerization software: it allows developers to specify the necessary OPS to run their application(s) which can then be `virtualized` or `emulated` by the host.',
                '`Virtualization` is the process of binding the underlying hosts\' native capabilities to the expected interfaces specified by docker.',
                '`Emulation` is the process of booting up a small instance of the necessary interfaces.',
                '`image` is the cached and tagged set of instructions for booting some virtualized software.',
                '`container` is the built and configured instance of an image.'
              ]
            }
          ],
          'helpful': [
            {
              'label': 'get Docker disk usage',
              'cmd': 'docker run --net=host --ipc=host --uts=host --pid=host -it --security-opt=seccomp=unconfined --privileged --rm -v \/:\/host alpine sh -c "chroot \/host df -h | grep docker"',
              'lines': [
                '`chroot` sets the root directory to \/host for the `df` command which prints disk usage in a `-h` human readable format.',
                'Because this command is actually introspecting the host (everything docker uses, rather than a single container), the `--net`, `--ipc`, and `--pid` all get set to `host`.',
                '`--privileged` gives access to all docker devices on the host.'
              ]
            },
            {
              'label': 'remove all stopped docker containers',
              'cmd': 'docker rm $(docker ps -qa)',
              'lines': [
                '`ps` lists containers and `rm` removes containers.',
                'Specifying the `-aq` options causes all stopped containers to be removed.'
              ]
            },
            {
              'label': 'parse some JSON',
              'cmd': 'docker run --rm -i imega\/jq -C path',
              'lines': [
                '`jq` is a JSON parsing app.',
                'The output of `docker inspect` can be piped into the above for easy querying.',
                '`path` is a dot-notation series of nested key paths to traverse the input JSON.'
              ]
            },
            {
              'label': 'install laravel via composer',
              'cmd': 'NEW_UUID==$(docker run --rm alpine sh -c "cat \/dev\/urandom | tr -dc \'a-zA-Z0-9\' | fold -w 32 | head -n 1;") && docker run -it --rm -v $(pwd):\/${NEW_UUID} -w \/${NEW_UUID} --network=net composer:latest composer create-project laravel\/laravel .',
              'lines': [
                '`NEW_UUID` is just a random 32 character string (only available on UNIX systems with a \/dev\/urandom).',
                '`pwd` should be the empty directory you want laravel installed into.',
                '`net` is the network on which you have all your other services running (eg. nginx, php, mysql, redis).'
              ]
            }
          ],
          'inventory': [
            {
              'cmd': 'docker ps -a -q',
              'lines': [
                '`ps` lists all running docker containers.',
                '`-a` is optional and flag includes stopped containers.',
                '`-q` is optional and limits the output to only the container ids.'
              ]
            },
            {
              'cmd': 'docker images',
              'lines': [
                '`images` lists all locally available images.'
              ]
            },
            {
              'cmd': 'docker volume ls',
              'lines': [
                '`volume ls` lists all locally created volumes.'
              ]
            }
          ],
          'introspection': [
            {
              'cmd': 'docker inspect container',
              'lines': [
                '`inspect` prints a JSON blob describing low-level information about the given container.',
                '`container` may refer to either the container id or name (partial matches on id are accepted).'
              ]
            }
          ],
          'cleanup': [
            {
              'cmd': 'docker rm -v container',
              'lines': [
                '`rm` deletes stopped containers.',
                '`-v` is optional and deletes any volumes associated with the container.',
                '`container` can be one or more (space-delimited) container ids (partial matches are accepted).'
              ]
            },
            {
              'cmd': 'docker rmi image:tag',
              'lines': [
                '`rmi` deletes locally available images.',
                '`tag` is optional and defaults to \'latest\'.'
              ]
            }
          ],
          'interaction': [
            {
              'cmd': 'docker run --name=name --rm -it --link=container:service --network=net -p hp:cp -v hd:cd image:tag cmd',
              'lines': [
                '`run` boots spawns a container running the given `image` with the specified `tag`, the `tag` defaults to \'latest\'.',
                '`--name` is optional and allows you to specify a custom label for the container, the default being a randomly generated name.',
                '`--rm` is optional and deletes the container when it stops.',
                '`-it` are optional and make the container interactive via a tty connection.',
                '`--link` is optional and allows you to bind a running `container` with the label `service` so this new container can interact with it.',
                '`--network` is optional and attaches the container to the specified network, auto-linking any other containers running in that network.',
                '`-p` is optional and binds a host port to a container port (specifying 0 will assign a random, available port).',
                '`-v` is optional and binds a host directory (or docker volume) to a container directory.',
                '`cmd` is optional (the image may specify a default) and will be run when the container boots.'
              ]
            },
            {
              'cmd': 'docker commit -a author -m message container image:tag',
              'lines': [
                '`commit` creates an image from a run container.',
                '`-a` is optional and allows you to specify the commit\'s `author` in the format \'"First_Name Last_Name <email@host.tld>"\'',
                '`-m` is optional and allows you to specify a commit `message` describing what has changed.',
                '`container` references a local container id or name.',
                '`image` is the repository used to store the image and `tag` is optional, defaulting to \'latest\'.',
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    text-transform: capitalize;
  }

  section {
    margin-top: 1rem;
  }

  .note {
    margin-top: 1rem;
  }
</style>
