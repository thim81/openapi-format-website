import DocsLayout from "@/components/docs/DocsLayout";
import CodeBlock from "@/components/docs/CodeBlock";

const ConfigurationPage = () => (
  <DocsLayout>
    <h1 className="text-3xl font-bold mb-2">Configuration File</h1>
    <p className="text-muted-foreground mb-8">
      Bundle all CLI options into a single config file for consistent, reproducible formatting.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Using --configFile</h2>
    <CodeBlock code={`npx openapi-format openapi.json --configFile openapi-format-options.json`} title="Terminal" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Inline Configuration</h2>
    <p className="mb-4 text-muted-foreground">Define sort, filter, casing, and generate options directly in the config:</p>
    <CodeBlock code={`{
  "sort": true,
  "output": "openapi-formatted.yaml",
  "casingSet": {
    "operationId": "camelCase",
    "properties": "snake_case"
  },
  "filterSet": {
    "tags": ["internal", "beta"]
  },
  "generateSet": {
    "operationIdTemplate": "<method>_<pathPart2>_Handler"
  }
}`} title="openapi-format-options.json" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">External File References</h2>
    <p className="mb-4 text-muted-foreground">Reference separate files for each configuration set:</p>
    <CodeBlock code={`{
  "sortFile": "customSort.json",
  "casingFile": "casing-rules.json",
  "filterFile": "filter-rules.json",
  "generateFile": "generate-rules.json"
}`} title="openapi-format-options.json" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Configuration Properties</h2>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Inline</th>
            <th className="text-left py-2 pr-4 font-semibold">File</th>
            <th className="text-left py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs text-foreground">sortSet</td><td className="py-2 pr-4 font-mono text-xs text-foreground">sortFile</td><td className="py-2">Custom field ordering rules</td></tr>
          <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs text-foreground">casingSet</td><td className="py-2 pr-4 font-mono text-xs text-foreground">casingFile</td><td className="py-2">Casing conventions for elements</td></tr>
          <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs text-foreground">filterSet</td><td className="py-2 pr-4 font-mono text-xs text-foreground">filterFile</td><td className="py-2">Filter rules for stripping items</td></tr>
          <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs text-foreground">generateSet</td><td className="py-2 pr-4 font-mono text-xs text-foreground">generateFile</td><td className="py-2">Auto-generation templates</td></tr>
        </tbody>
      </table>
    </div>
    <p className="text-sm text-muted-foreground">File references override inline configurations when both are present.</p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Using .openapiformatrc</h2>
    <p className="mb-4 text-muted-foreground">
      openapi-format automatically loads a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">.openapiformatrc</code> file 
      from the current directory. CLI options override these settings.
    </p>
    <CodeBlock code={`{
  "output": "openapi-final.yaml",
  "sort": true,
  "filterSet": {
    "tags": ["internal", "beta"]
  }
}`} title=".openapiformatrc" />
  </DocsLayout>
);

export default ConfigurationPage;
