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

// Define an OpenAPI language derived from YAML so OpenAPI-specific tokens
// only apply to blocks explicitly marked as language-openapi.
Prism.languages.openapi = Prism.languages.extend('yaml', {});
Prism.languages.insertBefore('openapi', 'key', {
  'openapi-root-key': {
    pattern:
      /((?:^|[\r\n]))(?:openapi|info|servers|paths|components|security|tags|externalDocs|webhooks|jsonSchemaDialect)(?=\s*:)/,
    lookbehind: true,
    alias: ['key', 'atrule'],
  },
  'path-key': {
    pattern: /((?:^|[\r\n])[ \t]*)\/[^\r\n:]+(?=\s*:)/,
    lookbehind: true,
    alias: ['key', 'atrule'],
  },
  'openapi-method': {
    pattern: /((?:^|[\r\n])[ \t]{2,})(?:get|put|post|delete|options|head|patch|trace)(?=\s*:)/i,
    lookbehind: true,
    alias: ['keyword'],
  },
  'openapi-ref-value': {
    pattern:
      /((?:^|[\r\n])[ \t]*\$ref[ \t]*:[ \t]*)(?:"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'|[^\r\n#]+)/,
    lookbehind: true,
    greedy: true,
    alias: ['url'],
  },
});

export default Prism;
