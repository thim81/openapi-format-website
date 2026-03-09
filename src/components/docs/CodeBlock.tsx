import { useState, useEffect, useRef } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-typescript';

const PLAYGROUND_URL = 'https://openapi-format-playground.vercel.app';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  playground?: boolean;
}

function inferLanguage(title?: string, code?: string): string {
  if (title) {
    const t = title.toLowerCase();
    if (t === 'terminal' || t === 'cli' || t === 'sh' || t === 'shell') return 'bash';
    if (t.endsWith('.js')) return 'javascript';
    if (t.endsWith('.ts')) return 'typescript';
    if (t.endsWith('.json') || t === '.openapiformatrc') return 'json';
    if (t.endsWith('.yaml') || t.endsWith('.yml')) return 'yaml';
    if (t === 'npm' || t === 'yarn') return 'bash';
    if (t === 'file tree') return 'bash';
  }
  if (code) {
    if (code.trimStart().startsWith('{') || code.trimStart().startsWith('[')) return 'json';
    if (
      code.includes('openapi-format ') ||
      code.includes('npx ') ||
      code.includes('npm ') ||
      code.startsWith('$')
    )
      return 'bash';
  }
  return 'yaml';
}

const CodeBlock = ({ code, language, title, playground }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const langMap: Record<string, string> = {
    sh: 'bash',
    shell: 'bash',
    terminal: 'bash',
    js: 'javascript',
    ts: 'typescript',
  };

  const resolvedLang = language
    ? (langMap[language.toLowerCase()] ?? language.toLowerCase())
    : inferLanguage(title, code);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, resolvedLang]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='my-4'>
      <div className='rounded-lg border bg-muted/30 overflow-hidden'>
        {title && (
          <div className='flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground'>
            <span>{title}</span>
            <button
              onClick={copy}
              className='hover:text-foreground transition-colors'
              aria-label='Copy'
            >
              {copied ? <Check className='h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5' />}
            </button>
          </div>
        )}
        <div className='relative'>
          {!title && (
            <button
              onClick={copy}
              className='absolute right-3 top-3 z-10 text-muted-foreground hover:text-foreground transition-colors'
              aria-label='Copy'
            >
              {copied ? <Check className='h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5' />}
            </button>
          )}
          <pre className='p-4 text-sm overflow-x-auto font-mono leading-relaxed !bg-transparent !m-0'>
            <code ref={codeRef} className={`language-${resolvedLang}`}>
              {code}
            </code>
          </pre>
        </div>
      </div>
      {playground && (
        <a
          href={PLAYGROUND_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors'
        >
          <ExternalLink className='h-3.5 w-3.5' />
          Try this example in the Playground →
        </a>
      )}
    </div>
  );
};

export default CodeBlock;
