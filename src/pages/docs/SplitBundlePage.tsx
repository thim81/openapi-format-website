import DocsLayout from '@/components/docs/DocsLayout';
import CodeBlock from '@/components/docs/CodeBlock';

const SplitBundlePage = () => (
  <DocsLayout>
    <h1 className='text-3xl font-bold mb-2'>Split &amp; Bundle</h1>
    <p className='text-muted-foreground mb-8'>
      Split large specs into modular multi-file structures, or bundle references into a single
      document.
    </p>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Splitting</h2>
    <p className='mb-4 text-muted-foreground'>
      The <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>--split</code> option
      creates a modular file structure with{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>$ref</code> references:
    </p>
    <CodeBlock
      code={`npx openapi-format openapi.json -o ./openapi-split/openapi.yaml --split`}
      title='Terminal'
    />

    <h3 className='text-xl font-semibold mt-6 mb-3'>Example</h3>
    <div className='grid gap-4 md:grid-cols-2'>
      <CodeBlock
        code={`openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets:
    get:
      summary: List all pets
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
  /pets/{petId}:
    get:
      summary: Get pet by ID
      parameters:
        - $ref: '#/components/parameters/petId'
components:
  schemas:
    Pet:
      type: object
      properties:
        name:
          type: string
    Error:
      type: object
  parameters:
    petId:
      name: petId
      in: path
      required: true
      schema:
        type: string`}
        title='Before — single file'
        playground
      />
      <CodeBlock
        code={`# openapi.yaml (root)
openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets:
    $ref: './paths/pets.yaml'
  /pets/{petId}:
    $ref: './paths/pets_{petId}.yaml'
components:
  schemas:
    Pet:
      $ref: './components/schemas/Pet.yaml'
    Error:
      $ref: './components/schemas/Error.yaml'
  parameters:
    petId:
      $ref: './components/parameters/petId.yaml'`}
        title='After — modular structure'
      />
    </div>

    <h3 className='text-lg font-semibold mt-6 mb-3'>Resulting File Tree</h3>
    <CodeBlock
      code={`./openapi-split/
├── openapi.yaml
├── paths/
│   ├── pets.yaml
│   └── pets_{petId}.yaml
├── components/
│   ├── schemas/
│   │   ├── Pet.yaml
│   │   └── Error.yaml
│   └── parameters/
│       └── petId.yaml`}
      title='File tree'
    />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Bundling</h2>
    <p className='mb-4 text-muted-foreground'>
      By default, all <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>$ref</code>{' '}
      references are resolved into a single file. Use{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>--no-bundle</code> to keep
      references intact:
    </p>
    <CodeBlock
      code={`# Default: bundle all $ref into one file
npx openapi-format openapi.json -o bundled.json

# Keep $ref references as-is
npx openapi-format openapi.json -o output.json --no-bundle`}
      title='Terminal'
    />

    <h3 className='text-xl font-semibold mt-6 mb-3'>Example: Bundling</h3>
    <div className='grid gap-4 md:grid-cols-2'>
      <CodeBlock
        code={`# openapi.yaml
openapi: 3.0.3
info:
  title: API
  version: 1.0.0
paths:
  /pets:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: './schemas/Pet.yaml'
# schemas/Pet.yaml (separate file)
# type: object
# properties:
#   name:
#     type: string`}
        title='Before — multi-file with $ref'
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
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  name:
                    type: string`}
        title='After — single self-contained file'
      />
    </div>
  </DocsLayout>
);

export default SplitBundlePage;
