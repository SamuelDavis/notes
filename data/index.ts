import lexicon from "./architecture/lexicon";
import antiPatterns from "./architecture/anti-patterns";
import patterns from "./architecture/patterns";
import docker from "./ops/docker";

export default {
  architecture: {
    lexicon,
    antiPatterns,
    patterns,
  },
  ops: {
    docker,
  },
};
