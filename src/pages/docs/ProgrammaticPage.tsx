import DocsLayout from "@/components/docs/DocsLayout";
import CodeBlock from "@/components/docs/CodeBlock";

const ProgrammaticPage = () => (
  <DocsLayout>
    <h1 className="text-3xl font-bold mb-2">Programmatic Usage</h1>
    <p className="text-muted-foreground mb-8">
      Use openapi-format as a Node.js module in your own scripts and tools.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Sorting with Minimal Setup</h2>
    <CodeBlock code={`const {
  parseFile,
  stringify,
  writeFile,
  openapiSort
} = require('openapi-format');

const input = await parseFile('spec.json'); // local path or remote URL
const { data } = await openapiSort(input, { sort: true });

const output = await stringify(data, { format: 'json' });
await writeFile('spec.sorted.json', output, { format: 'json' });`} title="sort.js" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Custom Sort Configuration</h2>
    <CodeBlock code={`const {
  parseFile,
  stringify,
  writeFile,
  openapiSort,
  getDefaultSortSet
} = require('openapi-format');

const document = await parseFile('spec.json');

const sortSet = await getDefaultSortSet();
sortSet.get = ['summary', 'description', 'responses']; // override GET priority

const { data } = await openapiSort(document, {
  sort: true,
  sortSet,
  sortComponentsSet: ['schemas', 'responses']
});

const output = await stringify(data, { format: 'json' });
await writeFile('spec.sorted.json', output, { format: 'json' });`} title="custom-sort.js" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filtering &amp; Generating</h2>
    <CodeBlock code={`const {
  parseFile,
  openapiFilter,
  openapiGenerate
} = require('openapi-format');

let draft = await parseFile('spec.json');

// Filter by tags
draft = (await openapiFilter(draft, {
  filterSet: { tags: ['public'] }
})).data;

// Generate operationIds
draft = (await openapiGenerate(draft, {
  generateSet: {
    operationIdTemplate: '<method>_<pathPart1>_<pathPart2>'
  }
})).data;`} title="filter-generate.js" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">File Helpers</h2>
    <p className="mb-4 text-muted-foreground">
      The module exports smart parsing and writing helpers with support for large numbers, YAML comments, and remote loading:
    </p>
    <CodeBlock code={`const {
  parseFile,   // Parse local or remote JSON/YAML files
  stringify,   // Convert to JSON or YAML string
  writeFile,   // Write output to disk
  openapiSort
} = require('openapi-format');

const input = await parseFile('openapi.yaml');
const { data } = await openapiSort(input, { sort: true });

const output = await stringify(data, { format: 'yaml', lineWidth: -1 });
await writeFile('openapi.sorted.yaml', output, { format: 'yaml' });`} title="helpers.js" />

    <div className="mt-6 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
      <p className="font-semibold text-foreground mb-1">Note</p>
      <p>
        Both <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">sortSet</code> and{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">sortComponentsSet</code> are optional. 
        When omitted, openapi-format automatically applies built-in defaults.
      </p>
    </div>
  </DocsLayout>
);

export default ProgrammaticPage;
