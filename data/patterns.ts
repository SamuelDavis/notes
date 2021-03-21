import { Dictionary, Pattern } from "../types";

const creational: Dictionary<Pattern> = {
  "abstract-factory": {
    name: "Abstract Factory",
    intent: "factory that delegates to platform-specific factory",
    problem: "platform dependency encapsulation",
    structure:
      "abstract factory delegates to one of any number of factories to instantiate classes implementing the requested interface",
  },
  builder: {
    name: "Builder",
    intent: "separate the construction object into multiple steps",
    problem:
      "some objects may be very complex, requiring dynamic construction, or many objects may be constructed from a base configuration",
    structure:
      "the reader parses common input, the builder polymorphically creates many peculiar targets",
  },
  "factory-method": {
    name: "Factory Method",
    intent: "encapsulate class construction",
    problem:
      "allow applications to define the construction of their own domain objects",
    structure:
      "any constructor method, eg: named constructors, service container",
  },
  "object-pool": {
    name: "Object Pool",
    intent:
      "avoid expensive instantiation by caching and re-using created objects",
    problem:
      "object instantiation can be expensive, object pools cache instantiated objects to avoid recreating them",
    structure:
      "client request object from pool which instantiates it if none are available, and caches it for reuse when the client is finished",
  },
  prototype: {
    name: " Prototype",
    intent: "create objects by copying others",
    problem:
      "limit configuration management by construct a class once, then create more instances by copying",
    structure:
      "a factory knows how to find a pure, virtual prototype which can then clone itself",
  },
  singleton: {
    name: "Singleton",
    intent: "ensure a class has only one instance",
    problem:
      "the application needs to guarantee only one instance of a class exists",
    structure:
      "the singleton class provides a single accessor function which instantiates and caches the instance on first invocation",
  },
};

const structural: Dictionary<Pattern> = {
  adapter: {
    name: "Adapter",
    intent: "wrap existing interface to a new interface",
    problem: "existing implementations might have awkward interfaces",
    structure:
      "the adapter exposes an api which simply invokes the wrapped class in a friendlier way",
  },
  bridge: {
    name: "Bridge",
    intent: "decouple abstraction from its implementation",
    problem:
      "support extending/composing the interface and the class independently",
    structure:
      "a class which implements all the necessary interfaces and delegates to the necessary implementations which don't adhere to those interfaces",
  },
  composite: {
    name: "Composite",
    intent: "treat individual objects or collections of objects uniformly",
    problem: "recursive, hierarchical structures may or may not terminate",
    structure:
      "the composite shares the APIs of both the object and collection",
  },
  decorator: {
    name: "Decorator",
    intent: "dynamically attach responsibilities to object",
    problem: "adding behavior/state to objects at runtime",
    structure:
      "when calling an interface method, actually call the wrapper's method, which calls the wrapped object's method and provides a side effect",
  },
  facade: {
    name: "Facade",
    intent: "unify multiple interfaces into a single interface",
    problem: "a complex collection of subsystems needs a simplified interface",
    structure: "a facade may call out to many subsystems with a single method",
  },
  flyweight: {
    name: "Flyweight",
    intent: "centralize/share uniform antiPatterns across multiple objects",
    problem:
      "when dealing with many similar objects, you may have redundantly allocated antiPatterns in memory",
    structure:
      "one object containing common state is stored in a factory's repository and shared among many objects which in themselves contain only unique state",
  },
  "private-class-data": {
    name: "Private Class Data",
    intent: "control write access to antiPatterns",
    problem:
      "antiPatterns may need to have strict controls over when and how it can be manipulated",
    structure:
      "instead of defining antiPatterns directly on the target object, the target object is passed a stateful object in is constructor which can provide access controls on the state",
  },
  proxy: {
    name: "Proxy",
    intent: "provide a surrogate/placeholder object in place of another",
    problem:
      "provide support for an object before lazily instantiating it, delegate to an object stored elsewhere, mutate access/execution of state/behavior",
    structure:
      "instead of operating on the target class, the client operates on the proxy which fulfills the same interface, allowing the proxy to implement side effects",
  },
};

const behavioral: Dictionary<Pattern> = {
  "chain-of-responsibility": {
    name: "Chain of Responsibility",
    intent:
      "decouple a request and its receiver by passing it through multiple handlers",
    problem:
      "potentially many processes may need to run on a request before it is transformed into a response",
    structure:
      "each handler in the chain can either return a response, execute a side effect and/or delegate to the next in the chain",
  },
  command: {
    name: "Command",
    intent: "decouple request invocation and handling",
    problem:
      "handling requests without knowing about the operation or the handler",
    structure:
      "commands define the antiPatterns to be manipulated, how to manipulate it, and what dependencies are required to manipulate it",
  },
  interpreter: {
    name: "Interpreter",
    intent: "parsing a language into a normalized antiPatterns structure",
    problem: "allowing the solving of problems using a defined, written schema",
    structure:
      "the interpreter recursively parses the language stream identifying compound and terminal expressions, organizing them into a antiPatterns structure",
  },
  iterator: {
    name: "Iterator",
    intent: "iterate without exposing the implementation of the collection",
    problem:
      "traversing a collection of very different antiPatterns in potentially configurable ways",
    structure:
      "the client interacts with the collection, but the  collection relies on an internal Iterator which handles any complicated logic",
  },
  mediator: {
    name: "Mediator",
    intent: "loosely couple objects",
    problem:
      "resolve complicated dependency hierarchies or many-to-many relationships",
    structure:
      "rather than talking to its peers, an object communicates with the mediator which disseminates the request",
  },
  memento: {
    name: "Memento",
    intent: "encapsulate and preserve state",
    problem: "restoring state",
    structure:
      "the originator is the domain object, the caretaker knows why/when to save/restore the originator, and the memento is the encapsulated state being restored",
  },
  "null-object": {
    name: "Null Object",
    intent: "satisfy an interface in the absence of a domain object",
    problem:
      "a reference may be optionally null, causing null checks to proliferate",
    structure:
      "the null object implements the api but produces no side effects and returns null objects",
  },
  observer: {
    name: "Observer",
    intent:
      "centralize side-effect generation from state changes in a one-to-many relationship",
    problem: "many objects may want to share the same side effect",
    structure:
      "when a subject changes, it broadcasts to any observers what its change was, and the observers can perform the necessary side effects",
  },
  state: {
    name: "State",
    intent: "object behavior alters with state changes",
    problem: "behavior may depend on state",
    structure:
      "a wrapper provides a common interface, the wrapper introspects the state and defers to an appropriate subclass which satisfies the wrappers interface with callbacks which can optionally return a new state",
  },
  strategy: {
    name: "Strategy",
    intent: "make different algorithms interchangeable",
    problem: "preserve the Open-Closed principle",
    structure:
      "conform different behaviors to the same interface which can be specified via configuration",
  },
  "template-method": {
    name: "Template Method",
    intent: "defer some steps of an algorithm to client-configured callbacks",
    problem:
      "an algorithm needs to behave slightly differently depending on configuration",
    structure:
      "write out the invariant aspects of the algorithm and then invoke callbacks for the dynamic aspects",
  },
  visitor: {
    name: "Visitor",
    intent: "define a class' behavior in another class",
    problem:
      "having a behavior which affects many classes which shouldn't be defined on a base class",
    structure:
      "all subjects define an accept method which takes the visitor as an argument and invokes the appropriate method on the visitor; every visitor defines the appropriate, unique methods to be called by those objects",
  },
};

export default {
  creational,
  structural,
  behavioral,
};
