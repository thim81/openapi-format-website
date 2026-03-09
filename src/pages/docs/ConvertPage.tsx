import DocsLayout from '@/components/docs/DocsLayout';
import CodeBlock from '@/components/docs/CodeBlock';
import PlaygroundLink from '@/components/docs/PlaygroundLink';

const ConvertPage = () => (
  <DocsLayout>
    <h1 className='text-3xl font-bold mb-2'>Convert</h1>
    <p className='text-muted-foreground mb-4'>
      Upgrade your OpenAPI 3.0 document to OpenAPI 3.1 or 3.2.
    </p>
    <PlaygroundLink label='Try converting in the Playground' />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>CLI Usage</h2>
    <CodeBlock
      code={`# Convert to OpenAPI 3.1
npx openapi-format openapi.json -o openapi-3.1.json --convertTo "3.1"

# Convert to OpenAPI 3.2
npx openapi-format openapi.json -o openapi-3.2.json --convertTo "3.2"

# Convert without sorting
npx openapi-format openapi.yaml -o openapi-3.1.yaml --no-sort --convertTo "3.1"`}
      title='Terminal'
    />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Example: 3.0 → 3.1</h2>
    <div className='grid gap-4 md:grid-cols-2'>
      <CodeBlock
        code={`openapi: 3.0.2
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List pets
      responses:
        '200':
          description: A list of pets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type: object
      nullable: true
      properties:
        name:
          type: string
        tag:
          type: string
          nullable: true`}
        title='Before (OpenAPI 3.0)'
        playground
      />
      <CodeBlock
        code={`openapi: 3.1.0
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List pets
      responses:
        '200':
          description: A list of pets
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pet'
components:
  schemas:
    Pet:
      type:
        - object
        - 'null'
      properties:
        name:
          type: string
        tag:
          type:
            - string
            - 'null'`}
        title='After (OpenAPI 3.1)'
      />
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Example: 3.0 → 3.2</h2>
    <div className='grid gap-4 md:grid-cols-2'>
      <CodeBlock
        code={`{
  "openapi": "3.0.2",
  "info": {
    "title": "Petstore API",
    "version": "1.0.0"
  }
}`}
        title='Before'
        playground
      />
      <CodeBlock
        code={`{
  "openapi": "3.2.0",
  "info": {
    "title": "Petstore API",
    "version": "1.0.0"
  }
}`}
        title='After (--convertTo 3.2)'
      />
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>What Changes</h2>
    <div className='space-y-3 text-muted-foreground text-sm'>
      <p>
        <strong className='text-foreground'>3.0 → 3.1:</strong> Key transformations include:
      </p>
      <ul className='list-disc list-inside space-y-1 ml-4'>
        <li>
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>nullable: true</code> →{' '}
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>
            type: [original, 'null']
          </code>
        </li>
        <li>
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>
            exclusiveMinimum: true
          </code>{' '}
          →{' '}
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>
            exclusiveMinimum: value
          </code>
        </li>
        <li>
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>example</code> →{' '}
          <code className='rounded bg-muted px-1 py-0.5 font-mono text-xs'>examples</code> (array
          format)
        </li>
      </ul>
      <p className='mt-2'>
        Based on the{' '}
        <a
          href='https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0'
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:text-foreground'
        >
          migration guide from Phil Sturgeon
        </a>
        .
      </p>
      <p className='mt-2'>
        <strong className='text-foreground'>3.x → 3.2:</strong> Prepares the document for features
        like hierarchical tags, the QUERY HTTP method, and reusable media types introduced in the{' '}
        <a
          href='https://quobix.com/articles/openapi-3.2/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline hover:text-foreground'
        >
          3.2 release
        </a>
        .
      </p>
    </div>
  </DocsLayout>
);

export default ConvertPage;
