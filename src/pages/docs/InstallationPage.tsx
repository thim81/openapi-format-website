import DocsLayout from '@/components/docs/DocsLayout';
import CodeBlock from '@/components/docs/CodeBlock';

const InstallationPage = () => (
  <DocsLayout>
    <h1 className='text-3xl font-bold mb-2'>Installation</h1>
    <p className='text-muted-foreground mb-8'>
      Get started with openapi-format in your project or globally.
    </p>

    <h2 className='text-2xl font-semibold mt-8 mb-4' id='npx'>
      NPX Usage (recommended)
    </h2>
    <p className='mb-4 text-muted-foreground'>
      Run openapi-format without a global install — works out of the box:
    </p>
    <CodeBlock code='npx openapi-format your-openapi-file.yaml' />

    <h2 className='text-2xl font-semibold mt-8 mb-4' id='local'>
      Local Installation
    </h2>
    <p className='mb-4 text-muted-foreground'>
      Add openapi-format to your project's{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 text-sm font-mono'>node_modules</code>:
    </p>
    <CodeBlock code='npm install --save openapi-format' title='npm' />
    <CodeBlock code='yarn add openapi-format' title='yarn' />
    <p className='text-sm text-muted-foreground mb-4'>
      Then run with{' '}
      <code className='rounded bg-muted px-1.5 py-0.5 font-mono'>
        npx openapi-format your-openapi-file.yaml
      </code>
    </p>

    <h2 className='text-2xl font-semibold mt-8 mb-4' id='global'>
      Global Installation
    </h2>
    <CodeBlock code='npm install -g openapi-format' />
  </DocsLayout>
);

export default InstallationPage;
