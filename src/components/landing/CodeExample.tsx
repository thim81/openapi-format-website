import { useEffect, useRef } from 'react';
import Prism from '@/lib/prism-setup';

const before = `openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  /pets/{petId}:
    get:
      summary: Get pet by ID
  /pets:
    post:
      summary: Create a pet
    get:
      summary: List all pets
components:
  schemas:
    Pet:
      type: object
    Error:
      type: object`;

const after = `openapi: 3.0.3
info:
  title: Pet Store API
  version: 1.0.0
paths:
  '/pets':
    get:
      summary: List all pets
    post:
      summary: Create a pet
  '/pets/{petId}':
    get:
      summary: Get pet by ID
components:
  schemas:
    Error:
      type: object
    Pet:
      type: object`;

const HighlightedCode = ({ code }: { code: string }) => {
  const ref = useRef<HTMLPreElement>(null);
  useEffect(() => {
    if (ref.current) {
      const codeEl = ref.current.querySelector('code');
      if (codeEl) Prism.highlightElement(codeEl);
    }
  }, [code]);
  return (
    <pre
      ref={ref}
      className='rounded-lg border bg-card p-4 text-sm overflow-x-auto font-mono leading-relaxed'
    >
      <code className='language-yaml'>{code}</code>
    </pre>
  );
};

const CodeExample = () => (
  <section id='example' className='py-20 bg-muted/30'>
    <div className='container max-w-5xl'>
      <h2 className='text-3xl font-bold text-center mb-12'>Before &amp; After</h2>
      <div className='grid gap-6 md:grid-cols-2'>
        {[
          { label: 'Before', code: before },
          { label: 'After', code: after },
        ].map((b) => (
          <div key={b.label}>
            <p className='text-sm font-semibold text-muted-foreground mb-2'>{b.label}</p>
            <HighlightedCode code={b.code} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CodeExample;
