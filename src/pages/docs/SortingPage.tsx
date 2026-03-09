import DocsLayout from '@/components/docs/DocsLayout';
import CodeBlock from '@/components/docs/CodeBlock';
import PlaygroundLink from '@/components/docs/PlaygroundLink';

const SortingPage = () => (
  <DocsLayout>
    <h1 className='text-3xl font-bold mb-2'>Sorting</h1>
    <p className='text-muted-foreground mb-4'>
      Sort OpenAPI fields in a defined order. Fields not specified keep their original order.
    </p>
    <PlaygroundLink label='Try sorting in the Playground' />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>CLI Usage</h2>
    <CodeBlock
      code={`# Sort with defaults\nnpx openapi-format openapi.json -o openapi-sorted.json\n\n# Sort with custom ordering\nnpx openapi-format openapi.json -o openapi-sorted.json --sortFile customSort.json\n\n# Skip sorting entirely\nnpx openapi-format openapi.json -o output.json --no-sort`}
      title='Terminal'
    />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Default Sort Fields</h2>
    <p className='mb-4 text-muted-foreground'>
      The default sort order is stored in{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>defaultSort.json</code>.
      You can override it by providing a custom sort file.
    </p>

    <div className='overflow-x-auto mb-8'>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2 pr-4 font-semibold'>Key</th>
            <th className='text-left py-2 pr-4 font-semibold'>Ordered by</th>
          </tr>
        </thead>
        <tbody className='text-muted-foreground'>
          {[
            [
              'root',
              'openapi → info → servers → paths → components → tags → x-tagGroups → externalDocs',
            ],
            [
              'get / post / put / patch / delete',
              'operationId → summary → description → parameters → requestBody → responses',
            ],
            ['parameters', 'name → in → description → required → schema'],
            ['requestBody', 'description → headers → content → links'],
            ['responses', 'description → headers → content → links'],
            ['content', 'By alphabet'],
            ['components', 'parameters → schemas'],
            [
              'schema / schemas',
              'description → type → items → properties → format → example → default',
            ],
            ['properties', 'description → type → items → format → example → default → enum'],
          ].map(([key, order]) => (
            <tr key={key} className='border-b'>
              <td className='py-2 pr-4 font-mono text-xs text-foreground whitespace-nowrap'>
                {key}
              </td>
              <td className='py-2 pr-4'>{order}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Custom Sort File</h2>
    <p className='mb-4 text-muted-foreground'>
      Create a JSON or YAML file specifying your preferred field order per key:
    </p>
    <CodeBlock
      code={`{
  "root": ["openapi", "info", "servers", "paths", "components"],
  "get": ["summary", "description", "operationId", "parameters", "responses"],
  "schema": ["type", "description", "properties", "required"]
}`}
      title='customSort.json'
    />

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Sort Paths</h2>
    <p className='mb-4 text-muted-foreground'>
      Control the order of paths in your OpenAPI document using{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-sm'>sortPathsBy</code>:
    </p>

    <div className='overflow-x-auto mb-6'>
      <table className='w-full text-sm border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2 pr-4 font-semibold'>Option</th>
            <th className='text-left py-2 pr-4 font-semibold'>Description</th>
          </tr>
        </thead>
        <tbody className='text-muted-foreground'>
          <tr className='border-b'>
            <td className='py-2 pr-4 font-mono text-xs text-foreground'>original</td>
            <td className='py-2'>Keep the original order (default)</td>
          </tr>
          <tr className='border-b'>
            <td className='py-2 pr-4 font-mono text-xs text-foreground'>path</td>
            <td className='py-2'>Order alphabetically by path</td>
          </tr>
          <tr className='border-b'>
            <td className='py-2 pr-4 font-mono text-xs text-foreground'>tags</td>
            <td className='py-2'>Order by the first tag of the first method</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Sort Components</h2>
    <p className='mb-4 text-muted-foreground'>
      Sort items within the components section alphabetically:
    </p>
    <CodeBlock
      code={`npx openapi-format openapi.json -o output.json --sortComponentsFile sortComponents.json`}
      title='Terminal'
    />
    <CodeBlock
      code={`["schemas", "parameters", "headers", "requestBodies", "responses", "securitySchemes"]`}
      title='sortComponents.json'
    />

    <h3 className='text-xl font-semibold mt-6 mb-3'>Example</h3>
    <div className='grid gap-4 md:grid-cols-2'>
      <CodeBlock
        code={`components:
  schemas:
    Order:
      type: object
    Customer:
      type: object
    Address:
      type: object`}
        title='Before'
        playground
      />
      <CodeBlock
        code={`components:
  schemas:
    Address:
      type: object
    Customer:
      type: object
    Order:
      type: object`}
        title='After'
      />
    </div>

    <h2 className='text-2xl font-semibold mt-8 mb-4'>Sort Component Properties</h2>
    <p className='mb-4 text-muted-foreground'>
      Sort properties within schema components alphabetically:
    </p>
    <CodeBlock
      code={`npx openapi-format openapi.json -o output.json --sortComponentsProps`}
      title='Terminal'
    />

    <div className='grid gap-4 md:grid-cols-2'>
      <CodeBlock
        code={`schemas:
  UserDto:
    type: object
    properties:
      lastName:
        type: string
      firstName:
        type: string`}
        title='Before'
        playground
      />
      <CodeBlock
        code={`schemas:
  UserDto:
    type: object
    properties:
      firstName:
        type: string
      lastName:
        type: string`}
        title='After'
      />
    </div>
  </DocsLayout>
);

export default SortingPage;
