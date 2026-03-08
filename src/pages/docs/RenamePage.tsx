import DocsLayout from "@/components/docs/DocsLayout";
import CodeBlock from "@/components/docs/CodeBlock";
import PlaygroundLink from "@/components/docs/PlaygroundLink";

const RenamePage = () => (
  <DocsLayout>
    <h1 className="text-3xl font-bold mb-2">Rename</h1>
    <p className="text-muted-foreground mb-4">
      Change the title of your OpenAPI document — useful in CI/CD pipelines to create distinct output variants.
    </p>
    <PlaygroundLink label="Try renaming in the Playground" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">CLI Usage</h2>
    <CodeBlock code={`npx openapi-format openapi.json -o openapi.json --rename "OpenAPI Petstore - OpenAPI 3.0"`} title="Terminal" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <CodeBlock code={`{
  "openapi": "3.0.2",
  "info": {
    "title": "Petstore - OpenAPI 3.0"
  }
}`} title="Before" playground />
      <CodeBlock code={`{
  "openapi": "3.0.2",
  "info": {
    "title": "OpenAPI Petstore - OpenAPI 3.0"
  }
}`} title="After" />
    </div>
  </DocsLayout>
);

export default RenamePage;
