import { Dictionary, ShellCommand } from "../types";

const lexicon: Dictionary<string> = {
  container:
    "the runtime environment of an image, including the running application and its bound resources, including its volumes and ports",
  image: "an application composed of layers, packaged as a portable artifact",
  layer:
    "a cached application command, software dependency, or configuration which can be changed, distributed, and downloaded independently of the rest of the image",
  volume:
    "a virtual, persistent filesystem which is bound to either a host volume, an anonymous docker volume, or a named docker volume",
};

const usefulCommands: Dictionary<ShellCommand> = {
  "remove all docker containers & infrastructure": {
    longhand:
      "docker rm --force $(docker ps --all --quiet) && docker container prune --force && docker volume prune --force && docker network prune --force",
    shorthand:
      "docker rm -f $(docker ps -aq) && docker container prune -f && docker volume prune -f && docker network prune -f",
    explanation: "kill and remove all docker containers",
  },
  "remove running docker containers & infrastructure": {
    longhand: "docker rm --force --volumes $(docker ps --quiet)",
    shorthand: "docker rm -fv $(docker ps -aq)",
    explanation:
      "stop all running containers with SIGKILL, then remove them and their anonymous volumes",
  },
  "list all containers": {
    longhand: "docker ps --all",
    shorthand: "docker ps -a",
    explanation: "view all docker containers, including stopped containers",
  },
  "list all local images": {
    longhand: "docker image ls",
    explanation: "view all docker images, excluding intermediate images",
  },
  "run command in container": {
    longhand: "docker exec --interactive --tty $CONTAINER $COMMAND",
    shorthand: "docker exec -it $CONTAINER $COMMAND",
    explanation:
      "connect to running container $CONTAINER and execute $COMMAND in current shell",
  },
};

const notes: string[] = [
  "each command in a docker file will be cached as a separate layer",
  "COPY copies a local artifact into the container, ADD will copy a file, download from a URL, and/or extract a .tar archive into the container",
  "you could bundle the compiled code into an image to be deployed, or deploy the environment and code separately, binding the code as a volume to the container when it is started",
];

const deploymentFlow: string[] = [
  "application runtime environment is defined in dockerfile",
  "dockerfile is built into docker image",
  "image is pushed to repository",
  "image is pulled to server",
  "server runs image, binding necessary ports and volumes",
];

export default {
  lexicon,
  usefulCommands,
  notes,
};
