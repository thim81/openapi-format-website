import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';

// Extend bash grammar to highlight npx like other shell commands
const fn = Prism.languages.bash?.function;
if (fn && !Array.isArray(fn) && 'pattern' in fn && fn.pattern instanceof RegExp) {
  fn.pattern = new RegExp(fn.pattern.source.replace('|npm|', '|npm|npx|'), fn.pattern.flags);
}

export default Prism;
