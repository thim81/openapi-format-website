import DocsLayout from '@/components/docs/DocsLayout';
import CodeBlock from '@/components/docs/CodeBlock';
import PlaygroundLink from '@/components/docs/PlaygroundLink';

const OverlaysPage = () => (
  <DocsLayout>
    <h1 className='text-3xl font-bold mb-2'>Overlays</h1>
    <p className='text-muted-foreground mb-8'>
      Apply structured update and remove actions to your OpenAPI document using the{' '}
      <a
        href='https://spec.openapis.org/overlay/v1.0.0.html'
        target='_blank'
        rel='noopener noreferrer'
        className='underline hover:text-foreground'
      >
        OpenAPI Overlay Specification
      </a>
      .
    </p>
    <PlaygroundLink label='Try overlays in the Playground' />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>CLI Usage</h2>
    <CodeBlock
      code={`npx openapi-format openapi.yaml --overlayFile overlay.yaml -o openapi-updated.yaml`}
      title='Terminal'
    />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Overlay Structure</h2>
    <p className='mb-4 text-muted-foreground'>
      An overlay document defines actions with JSONPath targets:
    </p>
    <CodeBlock
      code={`overlay: 1.0.0
info:
  title: Example Overlay
  version: 1.0.0
actions:
  - target: "$"
    update:
      info:
        description: "Updated API description."
  - target: "$.paths['/example']"
    update:
      get:
        description: "Updated GET description."
  - target: "$.paths['/example'].get.parameters"
    remove: true`}
      title='overlay.yaml'
    />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Example: Update Description</h2>
    <CodeBlock
      code={`overlay: 1.0.0
info:
  title: Update API info
  version: 1.0.0
actions:
  - target: "$"
    update:
      info:
        description: "The official Pet Store API — production ready."`}
      title='overlay.yaml'
    />
    <div className='grid gap-4 md:grid-cols-2 mt-4'>
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
  description: A sample API
paths:
  /pets:
    get:
      summary: List all pets`}
        title='Before'
        playground
      />
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
  description: "The official Pet Store API — production ready."
paths:
  /pets:
    get:
      summary: List all pets`}
        title='After — description updated'
      />
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Example: Add Server &amp; Update Endpoint</h2>
    <CodeBlock
      code={`overlay: 1.0.0
info:
  title: Production overlay
  version: 1.0.0
actions:
  - target: "$"
    update:
      servers:
        - url: https://api.example.com/v1
          description: Production server
  - target: "$.paths['/pets'].get"
    update:
      summary: "List all pets (paginated)"
      description: "Returns a paginated list of pets."
      parameters:
        - name: limit
          in: query
          schema:
            type: integer`}
      title='overlay.yaml'
    />
    <div className='grid gap-4 md:grid-cols-2 mt-4'>
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets`}
        title='Before'
        playground
      />
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
    description: Production server
paths:
  /pets:
    get:
      summary: "List all pets (paginated)"
      description: "Returns a paginated list of pets."
      parameters:
        - name: limit
          in: query
          schema:
            type: integer`}
        title='After — server & parameter added'
      />
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Example: Remove Fields</h2>
    <CodeBlock
      code={`overlay: 1.0.0
info:
  title: Cleanup overlay
  version: 1.0.0
actions:
  - target: "$.paths['/internal/debug']"
    remove: true
  - target: "$.paths['/pets'].get.x-internal"
    remove: true`}
      title='overlay.yaml'
    />
    <div className='grid gap-4 md:grid-cols-2 mt-4'>
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      x-internal: true
      summary: List all pets
  /internal/debug:
    get:
      summary: Debug endpoint`}
        title='Before'
        playground
      />
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets`}
        title='After — debug path & flag removed'
      />
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Using extends</h2>
    <p className='mb-4 text-muted-foreground'>
      The overlay can declare a base OpenAPI document with{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>extends</code>, making the
      input file optional:
    </p>
    <CodeBlock
      code={`overlay: 1.0.0
info:
  title: Overlay for Tic Tac Toe
  version: 1.0.0
extends: 'https://raw.githubusercontent.com/.../tictactoe.yaml'
actions:
  - target: "$"
    update:
      info:
        description: "Modified description"`}
      title='overlay.yaml'
    />
    <CodeBlock
      code={`# No input file needed when extends is set
npx openapi-format --overlayFile overlay.yaml -o openapi-updated.yaml`}
      title='Terminal'
    />

    <div className='mt-6 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground'>
      <p className='font-semibold text-foreground mb-1'>Notes</p>
      <ul className='list-disc list-inside space-y-1'>
        <li>
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>extends</code> supports
          both local paths and remote HTTP(S) URLs
        </li>
        <li>Local relative paths are resolved relative to the overlay file's location</li>
      </ul>
    </div>
  </DocsLayout>
);

export default OverlaysPage;
