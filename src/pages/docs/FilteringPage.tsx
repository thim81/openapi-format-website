import DocsLayout from "@/components/docs/DocsLayout";
import CodeBlock from "@/components/docs/CodeBlock";
import PlaygroundLink from "@/components/docs/PlaygroundLink";

const FilteringPage = () => (
  <DocsLayout>
    <h1 className="text-3xl font-bold mb-2">Filtering</h1>
    <p className="text-muted-foreground mb-4">
      Strip matching items from your OpenAPI document based on methods, tags, flags, and more.
    </p>
    <PlaygroundLink label="Try filtering in the Playground" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">CLI Usage</h2>
    <CodeBlock code={`npx openapi-format openapi.json -o output.json --filterFile customFilter.yaml`} title="Terminal" />
    <CodeBlock code={`flags:
  - x-visibility
flagValues: []
tags: []
operationIds:
  - addPet
  - findPetsByStatus`} title="customFilter.yaml" />

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter Options Reference</h2>
    <div className="overflow-x-auto mb-8">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Type</th>
            <th className="text-left py-2 pr-4 font-semibold">Description</th>
            <th className="text-left py-2 font-semibold">Example</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {[
            ["methods", "Remove matching HTTP methods", "['get','post']"],
            ["inverseMethods", "Keep only these methods", "['get','post']"],
            ["tags", "Remove matching tags", "['pet','user']"],
            ["inverseTags", "Keep only these tags", "['pet','user']"],
            ["operationIds", "Remove matching operation IDs", "['findPets','updatePet']"],
            ["inverseOperationIds", "Keep only these operation IDs", "['findPets']"],
            ["operations", "Remove matching method::path combos", "['GET::/pets','PUT::/pets']"],
            ["flags", "Remove items with these custom flags", "['x-exclude','x-internal']"],
            ["inverseFlags", "Keep only items with these flags", "['x-public']"],
            ["flagValues", "Remove items matching flag + value", "['x-version: 1.0']"],
            ["inverseFlagValues", "Keep only matching flag + value", "['x-version: 2.0']"],
            ["responseContent", "Remove response content types", "['application/xml']"],
            ["inverseResponseContent", "Keep only these response types", "['application/json']"],
            ["requestContent", "Remove request body content types", "['application/xml']"],
            ["inverseRequestContent", "Keep only these request types", "['application/json']"],
            ["unusedComponents", "Remove unreferenced components", "['schemas','examples']"],
            ["stripFlags", "Strip flag properties (keep parent)", "['x-internal']"],
            ["preserveEmptyObjects", "Keep empty objects", "true or ['schema']"],
            ["textReplace", "Search & replace text values", "[{searchFor, replaceWith}]"],
          ].map(([type, desc, example]) => (
            <tr key={type} className="border-b">
              <td className="py-2 pr-4 font-mono text-xs text-foreground whitespace-nowrap">{type}</td>
              <td className="py-2 pr-4">{desc}</td>
              <td className="py-2 font-mono text-xs">{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by Methods</h2>
    <p className="mb-4 text-muted-foreground">
      Remove all operations matching specified HTTP methods. Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">inverseMethods</code> to keep only specified methods.
    </p>
    <CodeBlock code={`methods:
  - get
  - put`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: Finds Pets by status
    put:
      summary: Update an existing pet
    post:
      summary: Add a new pet`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    post:
      summary: Add a new pet`} title="After — GET and PUT removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by Tags</h2>
    <p className="mb-4 text-muted-foreground">
      Remove all operations tagged with specified values:
    </p>
    <CodeBlock code={`tags:
  - pet`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      tags:
        - pet
      summary: List all pets
    post:
      tags:
        - pet
      summary: Add a new pet
  /users:
    get:
      tags:
        - user
      summary: List all users`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /users:
    get:
      tags:
        - user
      summary: List all users`} title="After — 'pet' operations removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by operationIds</h2>
    <p className="mb-4 text-muted-foreground">
      Remove specific operations by their <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">operationId</code>:
    </p>
    <CodeBlock code={`operationIds:
  - findPetsByStatus`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      operationId: findPetsByStatus
      summary: Finds Pets by status
    post:
      operationId: addPet
      summary: Add a new pet`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    post:
      operationId: addPet
      summary: Add a new pet`} title="After — findPetsByStatus removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by Operations</h2>
    <p className="mb-4 text-muted-foreground">
      Target specific method + path combinations using the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">METHOD::path</code> format. Supports wildcards:
    </p>
    <CodeBlock code={`operations:
  # Exact match
  - "GET::/pets"
  # All methods on a path
  - "*::/pets"
  # All sub-paths
  - "GET::/pets/*"
  # Full wildcard
  - "*::/pets/*"`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: Finds Pets by status
    put:
      summary: Update an existing pet
  /users:
    get:
      summary: List all users`} title="Before (operations: ['PUT::/pets'])" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: Finds Pets by status
  /users:
    get:
      summary: List all users`} title="After — PUT /pets removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by Flags</h2>
    <p className="mb-4 text-muted-foreground">Remove items that have a specific custom property (e.g. <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">x-internal</code>):</p>
    <CodeBlock code={`flags:
  - x-internal`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets
  /internal/metrics:
    get:
      x-internal: true
      summary: Get metrics
  /internal/health:
    get:
      x-internal: true
      summary: Health check`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets`} title="After — internal endpoints removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter by Flag Values</h2>
    <p className="mb-4 text-muted-foreground">Match flag + value combinations, including array values:</p>
    <CodeBlock code={`flagValues:
  - x-version: 1.0
  - x-version: 3.0`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      x-version: 1.0
      summary: List pets (v1)
    post:
      x-version: 2.0
      summary: Add pet (v2)
  /users:
    get:
      x-version: 3.0
      summary: List users (v3)`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    post:
      x-version: 2.0
      summary: Add pet (v2)`} title="After — v1.0 and v3.0 removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Filter Response Content</h2>
    <p className="mb-4 text-muted-foreground">Remove specific content types from responses:</p>
    <CodeBlock code={`responseContent:
  - application/xml`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`paths:
  /pet:
    post:
      summary: Add a new pet
      responses:
        '200':
          description: Successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
            application/xml:
              schema:
                $ref: '#/components/schemas/Pet'`} title="Before" playground />
      <CodeBlock code={`paths:
  /pet:
    post:
      summary: Add a new pet
      responses:
        '200':
          description: Successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'`} title="After — XML content removed" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Remove Unused Components</h2>
    <p className="mb-4 text-muted-foreground">
      Strip unreferenced items from the components section. Recursively removes nested unused components (up to 10 levels).
    </p>
    <CodeBlock code={`unusedComponents:
  - schemas
  - parameters
  - examples`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`paths:
  /pets:
    get:
      summary: List all pets
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object
    Error:
      type: object
    Category:
      type: object`} title="Before" playground />
      <CodeBlock code={`paths:
  /pets:
    get:
      summary: List all pets
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object`} title="After — Error & Category removed (unused)" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Strip Flags</h2>
    <p className="mb-4 text-muted-foreground">
      Remove only the flag properties while keeping the parent operation intact:
    </p>
    <CodeBlock code={`stripFlags:
  - x-internal
  - x-beta`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`paths:
  /pets:
    get:
      x-internal: true
      x-beta: true
      summary: Finds Pets
      operationId: findPets`} title="Before" playground />
      <CodeBlock code={`paths:
  /pets:
    get:
      summary: Finds Pets
      operationId: findPets`} title="After — flags removed, operation kept" />
    </div>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Text Replace</h2>
    <p className="mb-4 text-muted-foreground">Search and replace text across descriptions, summaries, and URLs:</p>
    <CodeBlock code={`textReplace:
  - searchFor: 'Pets'
    replaceWith: 'Dogs'
  - searchFor: 'swagger.io'
    replaceWith: 'openapis.org'`} title="filter.yaml" />
    <div className="grid gap-4 md:grid-cols-2 mt-4">
      <CodeBlock code={`openapi: 3.0.0
info:
  title: Pets API
  description: Manage your Pets
paths:
  /pets:
    get:
      summary: Find Pets by status
      description: Returns Pets from swagger.io`} title="Before" playground />
      <CodeBlock code={`openapi: 3.0.0
info:
  title: Dogs API
  description: Manage your Dogs
paths:
  /pets:
    get:
      summary: Find Dogs by status
      description: Returns Dogs from openapis.org`} title="After — text replaced" />
    </div>
  </DocsLayout>
);

export default FilteringPage;
