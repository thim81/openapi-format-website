import DocsLayout from "@/components/docs/DocsLayout";
import CodeBlock from "@/components/docs/CodeBlock";

const GeneratePage = () => (
  <DocsLayout>
    <h1 className="text-3xl font-bold mb-2">Generate</h1>
    <p className="text-muted-foreground mb-8">
      Automatically generate OpenAPI elements like <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">operationId</code> using customizable templates.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">CLI Usage</h2>
    <CodeBlock code={`npx openapi-format openapi.json -o output.json --generateFile customGenerate.yaml`} title="Terminal" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Configuration</h2>
    <CodeBlock code={`operationIdTemplate: "<method>_<pathPart2>"
overwriteExisting: false`} title="customGenerate.yaml" />

    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Option</th>
            <th className="text-left py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs text-foreground">operationIdTemplate</td><td className="py-2">Template with dynamic placeholders for generating operationId</td></tr>
          <tr className="border-b"><td className="py-2 pr-4 font-mono text-xs text-foreground">overwriteExisting</td><td className="py-2">Whether to overwrite existing values (default: false)</td></tr>
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Template Placeholders</h2>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Placeholder</th>
            <th className="text-left py-2 pr-4 font-semibold">Description</th>
            <th className="text-left py-2 font-semibold">Example</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {[
            ["<operationId>", "Existing operationId", "leadsAll"],
            ["<method>", "HTTP method", "GET"],
            ["<path>", "Full path", "/crm/leads"],
            ["<pathRef>", "Method::path combination", "GET::/crm/leads"],
            ["<tag>", "First tag name", "Leads"],
            ["<tag1>", "First tag", "Leads"],
            ["<tag2>", "Second tag", "CRM"],
            ["<pathPart1>", "First path segment", "crm"],
            ["<pathPart2>", "Second path segment", "leads"],
            ["<pathPartN>", "Nth path segment", "..."],
          ].map(([placeholder, desc, example]) => (
            <tr key={placeholder} className="border-b">
              <td className="py-2 pr-4 font-mono text-xs text-foreground">{placeholder}</td>
              <td className="py-2 pr-4">{desc}</td>
              <td className="py-2 font-mono text-xs">{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example: Generate Missing operationIds</h2>
    <CodeBlock code={`operationIdTemplate: "<method>_<pathPart1>_<pathPart2>"
overwriteExisting: false`} title="customGenerate.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.3
paths:
  /crm/leads:
    get:
      summary: List all leads
    post:
      summary: Create a lead
  /crm/leads/{leadId}:
    get:
      summary: Get a lead
    put:
      operationId: updateLead
      summary: Update a lead`} title="Before — missing operationIds" playground />
      <CodeBlock code={`openapi: 3.0.3
paths:
  /crm/leads:
    get:
      operationId: GET_crm_leads
      summary: List all leads
    post:
      operationId: POST_crm_leads
      summary: Create a lead
  /crm/leads/{leadId}:
    get:
      operationId: GET_crm_leads
      summary: Get a lead
    put:
      operationId: updateLead
      summary: Update a lead`} title="After — generated (existing kept)" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Example: Overwrite All operationIds</h2>
    <CodeBlock code={`operationIdTemplate: "<method>-<pathPart1>-<pathPart2>"
overwriteExisting: true`} title="customGenerate.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.3
paths:
  /store/orders:
    get:
      operationId: listOrders
      summary: List orders
    post:
      operationId: createOrder
      summary: Create an order
  /store/inventory:
    get:
      operationId: getInventory
      summary: Get inventory`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.3
paths:
  /store/orders:
    get:
      operationId: GET-store-orders
      summary: List orders
    post:
      operationId: POST-store-orders
      summary: Create an order
  /store/inventory:
    get:
      operationId: GET-store-inventory
      summary: Get inventory`} title="After — all overwritten" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Advanced Template with Static Text</h2>
    <CodeBlock code={`operationIdTemplate: "Api_<method>_<pathPart2>_Handler"`} title="customGenerate.yaml" />
    <p className="text-sm text-muted-foreground mt-2">
      For <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">GET /crm/leads</code>, 
      this generates: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Api_GET_leads_Handler</code>
    </p>
    <p className="text-sm text-muted-foreground mt-1">
      For <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">POST /store/orders</code>, 
      this generates: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Api_POST_orders_Handler</code>
    </p>
  </DocsLayout>
);

export default GeneratePage;
