import { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';

const blocks = [
  { label: 'Format a spec', code: 'npx openapi-format openapi.yaml -o formatted.yaml' },
  { label: 'Sort & filter', code: 'npx openapi-format openapi.yaml --sortFile sort.json --filterFile filter.json' },
  { label: 'Convert to JSON', code: 'npx openapi-format openapi.yaml -o openapi.json' },
  { label: 'Install', code: 'npm install --save openapi-format' },
];

const CopyBtn = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className='text-muted-foreground hover:text-foreground transition-colors' aria-label='Copy'>
      {copied ? <Check className='h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5' />}
    </button>
  );
};

const HighlightedInline = ({ code }: { code: string }) => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current);
  }, [code]);
  return (
    <code ref={ref} className='language-bash'>
      {code}
    </code>
  );
};

const QuickStart = () => (
  <section id='quick-start' className='py-20'>
    <div className='container max-w-3xl'>
      <h2 className='text-3xl font-bold text-center mb-12'>Quick Start</h2>
      <div className='flex flex-col gap-4'>
        {blocks.map((b) => (
          <div key={b.label}>
            <p className='text-sm font-semibold text-muted-foreground mb-1.5'>{b.label}</p>
            <div className='flex items-center justify-between rounded-lg border bg-card px-4 py-3 font-mono text-sm'>
              <HighlightedInline code={b.code} />
              <CopyBtn text={b.code} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickStart;
