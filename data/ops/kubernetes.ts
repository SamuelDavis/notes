import { Dictionary, ShellCommand } from "../../types";

const lexicon: Dictionary<string> = {
  deployment: "a blueprint of node compositions",
  node:
    '(aka "worker node") a collection of pods, configMaps, secrets, and statefulSets which actually run the deployed container',
  pod: "an abstraction around a container",
  service:
    "a container running on a pod, accessible via a static ip, may be internal-only or externally accessible",
  ingress: "a networking tool which forwards traffic to services",
  configMap:
    "an insecure configuration store to provide pods' environment variables",
  secret:
    "a secure configuration store to provide pods' secure environment variables",
  statefulSet: "an abstraction for reading/writing state to/from volumes",
  volume: "a storage abstraction for a local or remote filesystem",
};

const architecture: Dictionary<string> = {
  context: "connection info for a cluster: the username/api server host",
  namespace:
    "a logical partition inside a cluster, managing resources/access control",
  "master node":
    "a node which the sysadmin can interact with to manage worker nodes",
  "api server": "software which manages the master node API",
  scheduler:
    "software which forwards management commands from the master node to the workers",
  "controller manager": "listener which responds to events in the worker nodes",
  etcd: "key-value store which manages the state of the master node",
  ingress: "a public-facing router which can expose services with pretty urls",
  "container runtime": "software which interacts with the container",
  kubelet: "manages the pod, starting and stopping services",
  "kube proxy":
    "a networking tool which manages communication between services",
};

const architectureSummary: string[] = [
  "Deployment manages a...",
  "ReplicaSet manages a...",
  "Pod is an abstraction of...",
  "Container",
];

const namespacesSummary: string[] = [
  "namespaces create groups within the cluster",
  "services can be referenced between namespaces",
  "configMaps and secrets cannot be referenced between namespaces",
];

const applications: Dictionary<string> = {
  minikube:
    "a 1-node kubernetes cluster consisting of a single master process and a single worker process, used for testing",
  kubectl: "CLI for kubernetes cluster",
  kubens:
    "(brew install kubens) can change the default namespace to make kubectl friendlier",
  helm: "the default package manager & yaml templating engine for kubernetes",
};

const helmSummary: Dictionary<string> = {
  "Helm Charts":
    "a collection of yaml files describing the necessary cluster configuration to support a 3rd party application",
  "Chart.yaml":
    "a yaml template with custom syntax for injecting data from a values.yaml file",
};

const basicCommands: Dictionary<ShellCommand> = {
  "start minikube": {
    longhand: "minikube start --vm=true",
    explanation: "start minikube with support for ingress",
  },
  "create deployment": {
    longhand: "kubectl create deployment $NAME",
    explanation: "generate a new deployment",
  },
  "edit deployment": {
    longhand: "kubectl edit deployment $NAME",
    explanation: "edit an existing deployment",
  },
  "delete deployment": {
    longhand: "kubectl delete deployment $NAME",
    explanation: "delete an existing deployment",
  },
  "list components": {
    longhand: "kubectl get $COMPONENT $NAME? --output wide",
    shorthand: "kubectl get $COMPONENT $NAME? -o wide",
    explanation:
      "list components of type $COMPONENT, where $COMPONENT = [nodes | pod | services | replicaset | deployment], optionally filtering to $NAME, using output = 'wide' for more information, or 'json' for the most",
  },
  "describe component": {
    longhand: "kubectl describe $COMPONENT $NAME?",
    explanation:
      "describe all components of type $COMPONENT, optionally filtering to $NAME",
  },
  "log to console": {
    longhand: "kubectl logs $POD_NAME",
    explanation: "write the kubectl logs to stdout",
  },
  "run command in node": {
    longhand: "kubectl exec --interactive --tty $POD_NAME -- $COMMAND",
    explanation: `interactively run $COMMAND on the specified pod's container, $POD_NAME, etc. "/bin/bash"`,
  },
  "apply a config file": {
    longhand: "kubectl apply --filename $FILE",
    shorthand: "kubectl apply -f $FILE",
    explanation:
      "use a kubernetes config file to orchestrate the cluster, providing one or more --filename options",
  },
};

const ingressSupportOnMac: string[] = [
  "minikube config set vm-driver hyperkit",
  "minikube delete",
  "minikube start",
  "minikube addons enable ingress",
];

const volumesComponents: Dictionary<string> = {
  "persistent volume":
    "an un-namespaced, globally-accessible cluster resource which interfaces with an external storage system",
  "persistent volume claim":
    "a namespaced cluster resource which identify volume criteria which kubernetes can use to select a persistent volume which will then be mapped to a pod",
  "storage class":
    "a resource which dynamically allocates persistent volumes when persistent volume claims are made",
};

const servicesComponents: Dictionary<string> = {
  ClusterIP:
    "provides a static ip which can forward requests to one or more nodes (randomly) based on its selectors and their labels",
  Headless:
    "makes its IP discoverable via a DNS lookup so that a single, specific pod can be interacted with",
  NodePort:
    "exposes a specific port in the node to traffic external to the cluster",
  LoadBalancer: "exposes itself to traffic external to the cluster",
};

export default {
  lexicon,
  applications,
  ingressSupportOnMac,
  architectureSummary,
  architecture,
  namespacesSummary,
  basicCommands,
  helmSummary,
  volumesComponents,
  servicesComponents,
};
